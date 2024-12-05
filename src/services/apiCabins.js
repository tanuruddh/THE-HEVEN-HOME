import supabase, { supabaseUrl } from "./superBase.js";

export async function getCabins() {


    let { data: cabins, error } = await supabase
        .from('cabins')
        .select('*')


    if (error) {
        console.error(error)
        throw new Error("Cabins could not be loaded")
    }

    return cabins;

}

export async function createEditCabin(newCabin, id) {

    console.log("newCabin: ", newCabin, id);
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/", "");
    //https://aomneokqfesxugopemru.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let data, error;
    if (!id) {

        ({ data, error } = await supabase
            .from('cabins')
            .insert({ ...newCabin, image: imagePath })
            .select())
    }



    if (id) {

        ({ data, error } = await supabase
            .from('cabins')
            .update({ ...newCabin, image: imagePath })
            .eq('id', id)
            .select())


    }
    if (error) {
        console.error(error)
        throw new Error("Cabins could not be loaded")
    }

    if (hasImagePath)
        return data;

    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
        console.error(storageError);
        throw new Error("Cabin Image could not be uploaded and cabin was not created");
    }

    return data;

}

export async function deleteCabin(id) {
    console.log("sccdmsknf")
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error)
        throw new Error("Cabin could not be deleted")
    }
    console.log(data);
    return data;

}