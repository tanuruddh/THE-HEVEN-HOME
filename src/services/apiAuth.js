import supabase from "./superBase";


export async function login({ email, password }) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw new Error(error.message);
    console.log(data);
    return data;

}

export async function register({ email, password, username }) { };