import React, { useEffect, useState } from "react";
import Movie from "./movie";
import Pagination from "./pagination";

const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`;

const SearchSeries = ({ query, page, setPage }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(1);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setCount(data.total_pages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page <= 500) {
      fetchMovies(`${url}&page=${page}&query=${query}`);
    }
  }, [page, query]);

  if (loading) {
    return <h1 className="text-3xl">LOADING......</h1>;
  }

  return (
    <section className=" text-white font-gudea font-bold">
      <div>
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

export default SearchSeries;
