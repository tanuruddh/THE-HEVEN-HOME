import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


export function useBooking() {

    const [searchParmas] = useSearchParams();

    const filterValue = searchParmas.get('status');
    const filter = !filterValue || filterValue === 'all'
        ? null
        : { field: 'status', value: filterValue };
    // : { field: 'status', value: filterValue, method: 'get' };

    const sortByRaw = searchParmas.get('sortBy') || 'startDate-dec';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    const { isLoading, data: bookings, error } = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy })
    });

    return { isLoading, bookings, error }

}