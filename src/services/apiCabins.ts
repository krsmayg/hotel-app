import supabase, { supabaseUrl } from "./supabase";
import { Cabin, CabinInsert, CabinUpdateInput } from "../types/models";
import { PostgrestError } from "@supabase/supabase-js";

export async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  console.log(cabins);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  if (!cabins) {
    throw new Error("No cabins found");
  }

  return cabins;
}

export async function deleteCabin(id: string) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin: CabinUpdateInput, id: string) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  // Формируем правильное имя изображения, чтобы в Supabase не создавался новый bucket
  const imageName =
    newCabin.image instanceof File
      ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
      : "";

  // Проверяем, есть ли путь уже (для Edit) или формируем путь для будущей картинки
  const imagePath = hasImagePath
    ? newCabin.image.toString()
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Создаем/редактируем кабину
  let queryResult;

  // A) CREATE
  if (!id) {
    const cabinData: CabinInsert = {
      ...newCabin,
      image: imagePath,
    };

    queryResult = await supabase.from("cabins").insert([cabinData]);
  } else {
    // B) EDIT
    queryResult = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = queryResult;

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or updated");
  }


  if (!data) {
    throw new Error("No cabin data was returned");
  }

  // 2. Загрузка изображения
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Удаляем кабину, если была ошибка загрузки изображения
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

