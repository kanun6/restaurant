import AddFooDpage from "@/components/Dashboard/AddFood";
import FoodTableCotainer from "@/components/Dashboard/FoodTableCotainer";
// // import FoodTable from "@/components/Dashboard/FoodTable";
// import FoodTableCotainer from "@/components/Dashboard/FoodTableCotainer";
// import FoodTableList from "@/components/Dashboard/FoodTableList";

const AddFoodPage = () => {
  return (
    <div className=" justify-center items-center w-full h-screen">
      <div className="w-full p-6 shadow-lg rounded-lg bg-white">
        <AddFooDpage />
        <FoodTableCotainer />
      </div>
    </div>
  );
};

export default AddFoodPage;
