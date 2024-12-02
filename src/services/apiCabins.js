import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(error);
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}


export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // формируем правильный image name чтобы в supabase не создавлся новый bucket
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //Проверяем или путь уже есть(для EDit ) или формируем путь к будщей картинки
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}


// неправильный код: 

// export async function createEditCabin(newCabin, id) {
//   console.log(newCabin);
//   console.log("ID: ", id)

//   // проверяем или картинка уже загружена в supabase или єто будет File type
//   const hasIamgePath = newCabin.image?.startsWith?.(supabaseUrl);
//   // формируем правильный image name чтобы в supabase не создавлся новый bucket
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   //Проверяем или путь уже есть(для EDit ) или формируем путь к будщей картинки
//   const imagePath = hasIamgePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   //https://gzfhhbqgacncvkaryxwd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

//   let query = supabase.from("cabins");

//   //1. Create/edit cabin

//   //A) CREATE
//   if (!id) await query.insert([{ ...newCabin, image: imagePath }]).select();

//   //B) EDIT

//   if (id) await query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin cannot be added");
//   }

//   //upload img
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   //delete cabin if there was an error uploading corresponding image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabin image could not be uploaded and the cabin was not created"
//     );
//   }
// }
