import Image from "next/image";
import { FoodCardProps } from "@/utils/types";
import FavoriteToggleButton from "./FavoriteToggleButton";
import Link from "next/link";
import OrderToggleButton from "./OrderToggleButton";

const FoodCard = ({ food }: { food: FoodCardProps }) => {
  const { name, id, image, price, description } = food;

  return (
    <article className="group relative ">
      <Link href={`/food/detail/${id}`}>
        {/* ส่วนของรูปภาพ */}
        <div className="relative h-[300px] rounded-mb mb-2 ">
          <Image
            src={image}
            alt={name}
            layout="fill"
            className="objectFit-cover rounded-mb group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* ส่วนของข้อความ */}
        <div className=" flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
        <div className="mt-1">
          <span className="font-semibold text-sm">{price} บาท</span>
        </div>

        <p className="text-sm mt-1 text-muted-foreground ">
          {description.substring(0, 40)}
        </p>
      </Link>

      <div className="absolute top-2 right-2">
        <FavoriteToggleButton foodId={id} />
      </div>
      <div>
        <OrderToggleButton foodId={food.id} />
      </div>
    </article>
  );
};

export default FoodCard;
