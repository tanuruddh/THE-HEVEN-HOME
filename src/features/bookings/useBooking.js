import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";


export function useBooking() {

    const [searchParmas] = useSearchParams();
    const queryClient = useQueryClient();

    const filterValue = searchParmas.get('status');
    const filter = !filterValue || filterValue === 'all'
        ? null
        : { field: 'status', value: filterValue };
    // : { field: 'status', value: filterValue, method: 'get' };

    const sortByRaw = searchParmas.get('sortBy') || 'startDate-dec';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    const page = !searchParmas.get('page') ? 1 : Number(searchParmas.get('page'));

    const {
        isLoading,
        data: { data: bookings, count } = {},
        error
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page })
    });

    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        })

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        })
    return { isLoading, bookings, error, count }

}