const MediaGridLoading = ({
  numberOfLoadingElements = 10,
}: {
  numberOfLoadingElements?: number;
}) => {
  return (
    <div className="container pt-20 pb-20 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-center justify-center">
      {Array.from({ length: numberOfLoadingElements }).map((_, index) => (
        <div
          className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse min-h-[400px]"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default MediaGridLoading;
