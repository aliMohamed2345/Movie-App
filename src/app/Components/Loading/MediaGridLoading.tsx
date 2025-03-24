const MediaGridLoading = ({
  numberOfLoadingElements = 10,
}: {
  numberOfLoadingElements?: number;
}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="container py-20 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center justify-center max-w-screen-lg">
        {Array.from({ length: numberOfLoadingElements }).map((_, index) => (
          <div
            className="w-full h-64 bg-background_hover rounded-lg animate-pulse min-h-[400px]"
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MediaGridLoading;
