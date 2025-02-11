// import FoodConntainer from "@/components/home/FoodConntainer";

import FoodContainer from "@/components/home/FoodConntainer";
import FoodPromotion from "@/components/home/FoodPromotion";

const page = () => {


  return (
  <>
  {/* <FoodConntainer /> */}
  <FoodPromotion />
  <h1 className="gap-4 mt-4">รายการอาหาร</h1>
  <FoodContainer />

  </>
  );
};
export default page;
