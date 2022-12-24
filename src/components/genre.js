import React from "react";

const Genre = ({ props }) => {
  const { genre, genreList, setGenreList, num, setPage } = props;
  return (
    <button
      className={`${
        genreList.includes(num)
          ? "bg-white text-black font-normal"
          : "font-white hover:underline hover:underline-offset-2"
      } rounded-3xl px-3`}
      onClick={() =>
        setGenreList((old) => {
          setPage(1);
          if (!old.includes(num)) {
            return [...old, num];
          } else {
            return old.filter((item) => item !== num);
          }
        })
      }
    >
      {genre}
    </button>
  );
};

export default Genre;
