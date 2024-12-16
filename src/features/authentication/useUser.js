import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";


export function useUser() {
    const { data, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    })

    return {
        user: data,
        isFetching,
        isAuthenticated: data?.role === 'authenticated'
    }
}