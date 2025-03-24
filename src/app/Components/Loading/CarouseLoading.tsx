const CarouseLoading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-full bg-background_hover animate-pulse">
        <div className="absolute inset-0 bg-black/60 rounded-sm"></div>
        <div className="absolute hidden sm:block bottom-40 left-42 bg-secondary px-5 py-3 w-[370px] h-[200px] rounded-lg overflow-hidden">
          <div className="h-6 w-40 bg-primary rounded-md animate-pulse mb-3"></div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-primary rounded-md animate-pulse"></div>
            <div className="h-8 w-20 bg-primary rounded-md animate-pulse"></div>
          </div>
          <div className="mt-3 h-12 bg-primary rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CarouseLoading;
