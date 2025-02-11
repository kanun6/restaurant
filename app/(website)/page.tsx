// import FoodConntainer from "@/components/home/FoodConntainer";

import LoadingCard from "@/components/card/LoadingCard";
import FoodContainer from "@/components/home/FoodConntainer";
import FoodPromotion from "@/components/home/FoodPromotion";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const { search } = await searchParams;

  return (
    <section>
      <Suspense fallback={<LoadingCard />}>
        {/* <FoodConntainer /> */}
        <FoodPromotion />
        <div className="gap-4 mt-4">
          <h1 className="text-3xl">รายการอาหาร</h1>
        </div>
        <FoodContainer search={search}/>
      </Suspense>
    </section>
  );
};
export default page;
