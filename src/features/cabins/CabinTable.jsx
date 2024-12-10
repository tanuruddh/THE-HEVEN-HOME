
import Spinner from "../../ui/Spinner.jsx"
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCaabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";


function CabinTable() {

  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

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

  if (isLoading) return <Spinner />
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
        <Table.Body data={filteredCabin} render={(cabin) => (<CabinRow cabin={cabin} key={cabin.id} />)} />
      </Table>
    </Menus>
  )
}

export default CabinTable
