import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { SingInCardButton } from "../form/Buttons";

const FavoriteToggleButton = async ({ foodId }: { foodId: string }) => {
  const { userId } = await auth();
  console.log(userId);

  if(!userId) return <SingInCardButton />
 

  return (
    <Button size="icon" variant="outline">
      <Heart />
    </Button>
  );
};

export default FavoriteToggleButton;
