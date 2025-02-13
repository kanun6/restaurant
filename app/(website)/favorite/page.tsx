import { fetchFavorite } from "@/actions/actions"
import FoodList from "@/components/home/FoodList"

const FavoritePage = async () => {
  const Favorites = await fetchFavorite()
  console.log(Favorites)



  return <div>
    <h1 className="text-4xl">รายการอาหารที่ชอบ</h1>
    <FoodList foods={Favorites}/>

    </div>
}

export default FavoritePage