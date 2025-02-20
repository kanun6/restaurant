import { auth } from "@clerk/nextjs/server";
import { SingInOrderButton } from "../form/Buttons";
import OrderForm from "./OrderForm";

const OrderToggleButton = async ({ foodId }: { foodId: string }) => {
  const { userId } = await auth();

  // ถ้ายังไม่ได้ล็อกอิน ให้แสดงปุ่มให้ไปล็อกอินก่อน
  if (!userId) return <SingInOrderButton />;

  // ถ้าล็อกอินแล้ว ให้แสดงแบบฟอร์มสั่งอาหาร
  return <OrderForm foodId={foodId} />;
};

export default OrderToggleButton;
