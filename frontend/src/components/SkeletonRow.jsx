const SkeletonRow = () => {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-subtle animate-pulse">
      <div className="h-4 bg-muted rounded w-[20%]"></div>
      <div className="h-4 bg-muted rounded w-[15%] ml-auto"></div>
      <div className="h-4 bg-muted rounded w-[15%] ml-auto"></div>
      <div className="h-4 bg-muted rounded w-[15%] ml-auto"></div>
      <div className="h-4 bg-muted rounded w-[10%] ml-auto"></div>
    </div>
  );
};

export default SkeletonRow;
