import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins.js";
import CabinTable from "../features/cabins/CabinTable.jsx"
import Button from "../ui/Button.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";
function Cabins() {

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setShowForm(() => !showForm)}>
        {showForm ? 'Hide Form' : 'Add New Cabin'}
      </Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
