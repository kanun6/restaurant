export type actionFunction = (
    prevState: unknown,
    formData: FormData
)=>Promise<{message:string}>


export type FoodCardProps ={
    id:string;
    description:string;
    name:string;
    image:string;
    price:number;
}
