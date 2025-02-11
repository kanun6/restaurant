import { fetchFoods } from "@/actions/actions"
import FoodList from "./FoodList"
import { FoodCardProps } from "@/utils/types"

const FoodConntainer = async () => {
  const foods:FoodCardProps[] = await fetchFoods()
  console.log(foods)



  return (
    <div>
      <FoodList foods={foods}/>
    </div>
  )
}

export default FoodConntainer