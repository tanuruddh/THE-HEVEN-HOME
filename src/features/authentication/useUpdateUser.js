import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentData } from "../../services/apiAuth";
import toast from "react-hot-toast";


export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate, isFetching } = useMutation({
        mutationFn: ({ fullName, password, avatar }) => updateCurrentData({ fullName, password, avatar }),
        onSuccess: () => {
            toast.success("User has update successfully");
            queryClient.invalidateQueries(['user'])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        updateUser: mutate,
        isUpdating: isFetching
    }
}