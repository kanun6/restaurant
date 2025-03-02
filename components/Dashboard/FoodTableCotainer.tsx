import { fetchFoods } from "@/actions/actions"

import { FoodCardProps } from "@/utils/types"
import FoodTableList from "./FoodTableList"

const FoodTableCotainer = async ({search}:{search?:string}) => {
  const foods:FoodCardProps[] = await fetchFoods({search})
  console.log(foods)

  return (
    <div>
      <FoodTableList foods={foods}/>
    </div>
  )
}

export default FoodTableCotainer