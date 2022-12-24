import React from "react";
import Genre from "./genre";
const Genres = ({ props }) => {
  const { genres, setPage, nums, genreList, setGenreList } = props;

  return (
    <div className="font-roboto font-light text-center xs:text-xs xs:pb-2">
      {genres.map((genre, index) => {
        return (
          <Genre
            key={index}
            props={{
              setGenreList,
              genre,
              num: nums[index],
              genreList,
              setPage,
            }}
          />
        );
      })}
    </div>
  );
};

export default Genres;
