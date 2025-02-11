import { fetchFoodsdetail } from "@/actions/actions";
import Breadcrumb from "@/components/food/Breadcrumb";
import { redirect } from "next/navigation";

const FoodDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await  params;
  const food = await fetchFoodsdetail({ id });
  if (!food) redirect("/");

  return (
    <section>
      <Breadcrumb name={food.name} />
      <header>
        <h1 className="text-4xl">{food.name}</h1>
      </header>
    </section>
  );
};
export default FoodDetail;
