import Image from "next/image";

const FoodCard = ({ food }) => {
  console.log(food);

  const { name, image } = food;

  return (
    <article className="relative shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-[300px]">
        <Image
          src={image}
          alt={name}
          width={200} 
          height={250} 
          className="object-cover"
        />
      </div>
    </article>
  );
};

export default FoodCard;
