import styled from "styled-components";
import { useRecentBookings } from "../authentication/useRecentBooking";
import { useRecentStays } from "../authentication/useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCaabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) {
    return <Spinner />
  }

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins?.length} />
      <div>Statistics</div>

      <SalesChart bookings={bookings} numDays={numDays} />
      <div>Statistics</div>

    </StyledDashboardLayout>
  )
}

export default DashboardLayout
