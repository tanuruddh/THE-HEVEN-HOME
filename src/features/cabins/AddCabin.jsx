import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {


    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <div>
            <Button onClick={() => setIsOpenModal((show) => !show)}>
                {/* {showForm ? 'Hide Form' : 'Add New Cabin'} */}
                Add new cabin
            </Button>
            {isOpenModal &&
                <Modal onClose={() => setIsOpenModal(false)} ><CreateCabinForm onCloseModel={() => setIsOpenModal(false)} /></Modal>}
        </div>
    )
}

export default AddCabin
