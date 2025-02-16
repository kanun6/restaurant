import { FoodCardProps } from "@/utils/types";
import FoodTable from "./FoodTable";

const FoodTableList = ({ foods }: { foods: FoodCardProps[] }) => {
  return (
    <section className="">
      {/* ✅ เรียก `<FoodTable />` ครั้งเดียว ไม่ต้อง `.map()` */}
      <FoodTable foods={foods} />
    </section>
  );
};

export default FoodTableList;
