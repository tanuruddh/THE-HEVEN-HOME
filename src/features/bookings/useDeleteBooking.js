import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryclinet = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (bookingId) => deleteBookingApi(bookingId),
        onSuccess: () => {
            toast.success("Booking deleted successfully");
            queryclinet.invalidateQueries({
                queryKey: ['bookings']
            })
        },
        onError: () => toast.error("Error in deleting bookings"),
    });

    return { isDeleting, deleteBooking }
}