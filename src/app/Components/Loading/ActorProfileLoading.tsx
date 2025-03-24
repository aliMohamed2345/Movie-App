const ActorProfileLoading = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
      {/* Image Skeleton */}
      <div className="relative">
        <div className="w-60 h-80 bg-secondary rounded-lg animate-pulse" />
      </div>

      {/* Text Skeleton */}
      <div className="flex flex-col text-center sm:text-left gap-5 w-full">
        {/* Name Skeleton */}
        <div className="w-48 h-8 bg-primary rounded-md animate-pulse" />

        {/* Biography Skeleton (90% width) */}
        <div className="w-[90%] space-y-3">
          <div className="w-full h-4 bg-primary rounded animate-pulse"></div>
          <div className="w-11/12 h-4 bg-primary rounded animate-pulse"></div>
          <div className="w-10/12 h-4 bg-primary rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ActorProfileLoading;
