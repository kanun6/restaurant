import FormInput from "@/components/form/Forminput";
import { SubmitButton } from "@/components/form/Buttons";

const createProfileAction = async (formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName") as string;
  console.log("miumiu!!!!", firstName);
};

const createPage = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">New User</h1>
      <div className="border p-8 rounded-md">
        <form action={createProfileAction}>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <FormInput name="firstName" label="First Name" type="text" placeholder="First Name" defaultValue=""/>
          <FormInput name="lastname" label="Last Name" type="text" placeholder="Last Name" defaultValue=""/>
          <FormInput name="userName" label="Username" type="text" placeholder="Username" defaultValue=""/>
        </div>
         <SubmitButton text="Create Profile" size='lg'/>
        </form>
      </div>
    </section>
  );
};
export default createPage;
