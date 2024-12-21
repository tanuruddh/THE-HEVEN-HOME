import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadAll, uploadBookings } from "../../data/Uploader";


export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: async (user) => {
            // console.log(user, isLoading);
            queryClient.setQueryData(['user'], user.user)
            await uploadAll();
            await uploadBookings();
            navigate('/dashboard', { replace: true });
        },
        onError: (error) => {
            console.log(error);
            toast.error('Provided email or password are incorrect')
        }
    })
    // console.log(isLoading)
    return {
        login,
        isLoading
    }

}