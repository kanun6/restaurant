import { Skeleton } from "../ui/skeleton"

const LoadingCard = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
    </div>
  )
}

export const SkeletonCard = ()=>{
    return <>
    <Skeleton className="h-[300px] rounded-mb mb-2 "/>
    <Skeleton className="h-4 w-3/4 rounded-mb mb-2 "/>
    <Skeleton className="h-4 w-1/2 rounded-mb  "/>
    <Skeleton className="h-4 w-1/4 rounded-mb  "/>
    </>
}


export default LoadingCard