import FormInput from "@/components/form/Forminput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createRestaurantAction } from "@/actions/actions";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import Maprestaurant from "@/components/map/Maprestaurant";
// import CategoryInput from "@/components/form/CategoryInput";

const createPage = async () => {
    // const user = await currentUser()
    // if(user?.privateMetadata.hasProfile) redirect('/')
    
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Create Restaurant
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createRestaurantAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              label="Restaurant Name"
              type="text"
              placeholder="Restaurant Name"
              defaultValue=""
            />
            <FormInput
              name="location"
              label="Location"
              type="text"
              placeholder="Enter restaurant location"
              defaultValue=""
            />
            <FormInput
              name="contact"
              label="Contact"
              type="text"
              placeholder="Enter contact number"
              defaultValue=""
            />
            {/* <CategoryInput /> */}
          </div>
          
          {/* <Maprestaurant /> */}
          <SubmitButton text="Create Restaurant" size="lg" className="" />
        </FormContainer>
      </div>
    </section>
  );
};
export default createPage;
