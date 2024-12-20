import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from '../../services/apiAuth'
import toast from "react-hot-toast";

export function useSignup() {
    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            // console.log('User signed up successfully:', user);
            toast.success("Acccount successfully created! Please verify the new account from the user's email address")
        }
    })

    return { signup, isLoading: isPending }

}