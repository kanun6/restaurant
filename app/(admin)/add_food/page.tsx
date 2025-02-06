import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function AdminAddFood() {
  // Protect the page from users who are not admins
  const isAdmin = await checkRole("marketing_admin");
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Food</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Food Name"
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}
