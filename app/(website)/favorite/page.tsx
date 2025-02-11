import { fetchFavorite } from "@/actions/actions"
import FoodList from "@/components/home/FoodList"

const FavoritePage = async () => {
  const Favorites = await fetchFavorite()
  console.log(Favorites)



  return <FoodList foods={Favorites}/>
}

export default FavoritePage