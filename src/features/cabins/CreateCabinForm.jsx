import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (error) => toast.error(error.message),
  })

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin Successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (error) => toast.error(error.message),

  })

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image['0'];
    // Use the data object to send the form data to your server
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId })
    } else {
      createCabin({ ...data, image });
    }
  }

  function onError(error) {
    console.log("error", error)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name', { required: "This field is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity"
          {...register('maxCapacity',
            {
              required: "This field is required",
              min: {
                value: 1,
                message: "The maximum capacity must be at least 1"
              }
            })} disabled={isWorking} />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', { required: "This field is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: "This field is required",
          validate: (value) => {
            return value <= getValues().regularPrice || "Discount should be less than regular price"
          }
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description', { required: "This field is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isWorking} {...register('image', { required: isEditSession ? false : "This field is required" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
