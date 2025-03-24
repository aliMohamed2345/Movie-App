import { movieCategories, tvCategories } from "@/app/data/movieCategories";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      {/* don't forget to handle the height in the footer */}
      <footer className="bg-secondary max-h-[900px] mt-10 text-text_color text-center sm:text-left">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="text-movie_color ">
                <Link
                  href="/movie"
                  className="text-2xl text-movie_color hover:text-movie_color_hover font-extrabold  rounded-full transition-all hover:scale-105"
                >
                  <span className="tracking-wide">Movie-App</span>
                </Link>
              </div>

              <p className="mt-4 text-center sm:text-left">
                platform for movies, TV shows, and actors
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              <div>
                <Link
                  href={`/movie`}
                  className="text-xl font-bold text-movie_color hover:text-movie_color_hover"
                >
                  Movies
                </Link>

                <ul className="mt-6 space-y-4 text-sm text-center sm:text-left">
                  {movieCategories.map((category, i) => {
                    const categoryFormat =
                      category.split(" ").length > 1
                        ? category.split(" ").join("_").toLowerCase()
                        : category.toLowerCase();
                    return (
                      <li key={i}>
                        <Link
                          href={{
                            pathname: `/movie/${categoryFormat}`,
                            query: { category: categoryFormat, media: `tv` },
                          }}
                          className="transition hover:opacity-75 font-bold"
                        >
                          {category}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <Link
                  href={`/tv`}
                  className="text-xl font-bold text-movie_color"
                >
                  TV Shows
                </Link>

                <ul className="mt-6 space-y-4 text-sm">
                  {tvCategories.map((category, i) => {
                    const categoryFormat =
                      category.split(" ").length > 1
                        ? category.split(" ").join("_").toLowerCase()
                        : category.toLowerCase();
                    return (
                      <li key={i}>
                        <Link
                          href={{
                            pathname: `/movie/${categoryFormat}`,
                            query: { category: categoryFormat, media: `movie` },
                          }}
                          className="transition hover:opacity-75 font-bold"
                        >
                          {category}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <Link
                  href={`/actors`}
                  className="text-xl font-bold text-movie_color text-center"
                >
                  Actors
                </Link>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      href={`/actors`}
                      className="transition hover:opacity-75 font-bold"
                    >
                      Popular Actors
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-sm  font-bold text-center">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
