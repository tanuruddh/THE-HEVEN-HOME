/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {

    const numBookings = bookings?.length;
    console.log(bookings, confirmedStays);

    const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

    const numConfirmedStays = confirmedStays?.length;

    const occupancy = confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount);
    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={sales}
            />
            <Stat
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={numConfirmedStays}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(occupancy * 100) + '%'}
            />
        </>
    )
}

export default Stats
