// import { Heart } from "lucide-react";
// import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { SingInCardButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/actions/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ foodId }: { foodId: string }) => {
  const { userId } = await auth();
  // console.log(userId);

  if (!userId) return <SingInCardButton />;
  const favoriteId = await fetchFavoriteId({ foodId });
  console.log(foodId);

  return <FavoriteToggleForm 
  favoriteId={favoriteId} 
  foodId={foodId} />;
};

export default FavoriteToggleButton;
