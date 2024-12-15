import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
        mutationKey: ['deleteBooking'],  // Add this
        mutationFn: (bookingId) => deleteBookingApi(bookingId),
        onSuccess: () => {
            toast.success("Booking deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ['bookings']
            })
        },
        onError: () => toast.error("Error in deleting bookings"),
    });

    return {
        isDeleting,
        deleteBooking
    };
}