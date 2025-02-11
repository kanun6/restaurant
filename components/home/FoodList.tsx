import FoodCard from "../card/FoodCard"
import { FoodCardProps } from "@/utils/types"

const FoodList = ({foods}:{foods:FoodCardProps[]}) => {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">
      {
        foods.map((food)=>{
          return <FoodCard key={food.id} food={food}/>
        })
      }
    </section>
  )
}

export default FoodList
