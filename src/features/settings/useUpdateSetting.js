import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isLoading: isSettings } = useMutation({
        mutationFn: ({ newCabinData, id }) => updateSettingApi,
        onSuccess: () => {
            toast.success("Settings successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['settings']
            });
        },
        onError: (error) => toast.error(error.message),

    })
    return { isSettings, updateSetting }
}