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

export async function createCabin(newCabin) {

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    //https://aomneokqfesxugopemru.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.error(error)
        throw new Error("Cabins could not be loaded")
    }

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