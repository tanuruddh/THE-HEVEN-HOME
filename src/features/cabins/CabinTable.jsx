
import Spinner from "../../ui/Spinner.jsx"
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCaabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty.jsx";


function CabinTable() {

  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  //Filterrrrr

  if (!cabins?.length) return <Empty resourceName="cabins" />
  if (isLoading) return <Spinner />

  const filterValues = searchParams.get('discount') || 'all';

  let filteredCabin = [];
  if (filterValues === 'all') {
    filteredCabin = cabins;
  }
  if (filterValues === 'no-discount') {
    filteredCabin = cabins?.filter(cabin => cabin.discount === 0);
  }
  if (filterValues === 'with-discount') {
    filteredCabin = cabins?.filter(cabin => cabin.discount > 0);
  }

  // sorttttt
  const sortBy = searchParams.get('sortBy') || "startDate-asc";
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabin = filteredCabin?.sort((a, b) => {
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;  // a must be equal to b
  });


  return (
    <Menus>

      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabin} render={(cabin) => (<CabinRow cabin={cabin} key={cabin.id} />)} />
      </Table>
    </Menus>
  )
}

export default CabinTable
