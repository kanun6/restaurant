import FormInput from "@/components/form/Forminput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { AddFoodAction } from "@/actions/actions";
import TextAreainput from "@/components/form/TextAreainput";
import ImageInput from "@/components/form/ImageInput";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

const AddFooDpage = async () => {
  return (
    <section className="bg-white mt-8">
      <h1 className="text-2xl font-semibold mb-8 capitalize">Add Food</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={AddFoodAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              label="Food Name"
              type="text"
              placeholder="Food Name"
              defaultValue=""
            />
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
              defaultValue=""
            />
          </div>
          <ImageInput />
          <TextAreainput
            name="description"
            labelText="Description"
            defaultValue=""
          />

          <SubmitButton text="Add Food" size="lg" className="" />
        </FormContainer>
      </div>
    </section>
  );
};
export default AddFooDpage;
