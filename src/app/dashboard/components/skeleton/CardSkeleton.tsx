
export function CardSkeleton() {
  return (
    <div
      className={`skeleton rounded-2xl w-[100px] bg-white grow shadow-2xl h-[100px]`}
    >
    </div>
  );
}

export const CardsSkeleton = () => {
  return <>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </>
}