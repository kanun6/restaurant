import { fetchFoodsdetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrumb from "@/components/food/Breadcrumb";
import Description from "@/components/food/Description";
import ImageContainer from "@/components/food/ImageContainer";
import Price from "@/components/food/Price";
import { redirect } from "next/navigation";

const FoodDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const food = await fetchFoodsdetail({ id });
  if (!food) redirect("/");

  return (
    <section>
      <Breadcrumb name={food.name} />
      <header className="flex justify-between mt-4 items-center">
        <h1 className="text-4xl">{food.name}</h1>
        <div className="flex items-center gap-x-4">
          <Price price={food.price}/>
          <FavoriteToggleButton foodId={food.id} />
        </div>
      </header>
      <section className="flex mt-6 gap-6 items-stretch">
        {/* รูปภาพอยู่ฝั่งซ้าย */}
        <div className="w-1/2">
          <ImageContainer mainImage={food.image} name={food.name} />
        </div>

        {/* Description อยู่ฝั่งขวา */}
        <div className="w-1/2 p-4 flex items-center h-full">
          <Description description={food.description} />
        </div>
      </section>
    </section>
  );
};
export default FoodDetail;
