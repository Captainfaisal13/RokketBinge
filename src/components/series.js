import React, { useEffect, useState } from "react";
import Genres from "./genres";
import Movie from "./movie";
import Pagination from "./pagination";

const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

const genres = [
  "Action & Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Kids",
  "Mystery",
  "News",
  "Reality",
  "Sci-Fi & Fantasy",
  "Soap",
  "Talk",
  "War & Politics",
  "Western",
];
const nums = [
  "10759",
  "16",
  "35",
  "80",
  "99",
  "18",
  "10751",
  "10762",
  "9648",
  "10763",
  "10764",
  "10765",
  "10766",
  "10767",
  "10768",
  "37",
];

const Series = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setCount(data.total_pages);
      setLoading(false);
      // console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page <= 500) {
      fetchMovies(`${url}&with_genres=${genreList.toString()}&page=${page}`);
    }
  }, [genreList, page]);

  if (loading) {
    return <h1 className="text-3xl">LOADING......</h1>;
  }

  return (
    <section className=" text-white font-gudea font-bold bg-gradient-to-r from-[#000] to-[#283747] mt-16 pb-24">
      <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl mx-auto s:max-w-sm xs:max-w-l xs:px-10 xs:pt-5">
        <h1 className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl s:text-3xl xs:text-xl text-left pt-10 pl-5 pb-3 xs:pb-1 xs:pl-0 xs:pt-0">
          Series
        </h1>
        <Genres props={{ setGenreList, nums, genres, genreList, setPage }} />
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-0 sm:grid-cols-3 s:grid-cols-2 xs:grid-cols-2 xs:gap-10">
          {movies.map((movie) => {
            return <Movie key={movie.id} {...movie} type="tv" />;
          })}
        </div>
        <div className="pt-10">
          <Pagination page={page} setPage={setPage} count={count} />
        </div>
      </div>
    </section>
  );
};
export default Series;
