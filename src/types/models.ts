import { Database } from "database.types";

export type Cabin =  Database["public"]["Tables"]["cabins"]["Row"];
export type CabinInsert = Database['public']['Tables']['cabins']['Insert']; // Тип для вставки
export type CabinUpdate = Database['public']['Tables']['cabins']['Update']; 

export type CabinUpdateInput = Omit<CabinUpdate, "image"> & {
  image: File | string;
};

