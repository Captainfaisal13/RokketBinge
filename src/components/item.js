import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CancelIcon from "@mui/icons-material/Cancel";

const videoUrl = "https://www.youtube.com/embed/";
const imageUrl = "https://image.tmdb.org/t/p/w1280/";
const Item = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showClose, setShowClose] = useState(false);

  const { id, type } = useParams();
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=videos&language=en-US`;

  const fetchItem = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem(url);
  }, []);
  if (loading) return <h1>Loading</h1>;

  const videos = data.videos.results;
  let key = "";
  if (videos.length > 0) {
    const trailerVideo = videos.find((video) => video.type === "Trailer");
    key = trailerVideo.key;
  } else {
    key = "nCUZKOt7HxE";
  }
  const {
    backdrop_path,
    genres,
    vote_average,
    vote_count,
    release_date,
    runtime,
    status,
    overview,
  } = data;

  return (
    <section className=" text-white font-poppins font-bold bg-gradient-to-r from-[#131212] to-[#283747] mt-16 pb-24">
      <div className="xl:max-w-6xl xl:mx-auto xl:pt-10 p-5">
        <div
          className="relative rounded-sm overflow-hidden"
          style={{ paddingBottom: "45%" }}
        >
          <img
            className="w-full xs-hidden absolute top-0 left-0 h-full"
            src={`${imageUrl}${backdrop_path}`}
            alt=""
          />
          <h1 className="text-[#2BC2E2] xl:text-5xl lg:text-3xl md:text-xl md:block sm:hidden s:hidden text-left absolute bottom-28 left-10 xs:hidden z-10 font-[600]">
            {data.name || data.original_name || data.original_title}
          </h1>
          <button
            onClick={() => {
              setShowTrailer(true);
              setShowClose(true);
            }}
            className="absolute font-[400] text-white bg- border hover:bg-[#2BC2E2] transition-all ease-in border-[#2BC2E2] h-10 px-5 sm:bottom-12 sm:left-10 s:left-2 s:bottom-2 xs:left-2 xs:bottom-2 rounded-sm z-10 flex gap-2"
          >
            <PlayArrowIcon className="mt-1.5" />{" "}
            <div className="mt-1.5">Watch Trailer</div>
          </button>
          <div
            className="w-full absolute left-0 top-0 z-1"
            style={{
              background:
                "linear-gradient(45deg,rgba(0,0,0,.9),rgba(0,0,0,.15))",
              height: "37rem",
            }}
          ></div>
          {showTrailer && (
            <iframe
              allowFullScreen
              className="w-full h-full absolute top-0 left-0 z-20"
              src={`${videoUrl}${key}`}
            ></iframe>
          )}
          {showClose && (
            <button
              onClick={() => {
                setShowTrailer(false);
                setShowClose(false);
              }}
              className="absolute z-40 top-1 right-2"
            >
              <CancelIcon />
            </button>
          )}
        </div>

        {genres && (
          <div className="flex flex-wrap gap-3 pt-5">
            {genres.map((genre, index) => {
              return (
                <span
                  key={index}
                  className="p-2 font-[600] text-sm bg-[#0a9cb9] rounded-md "
                >
                  {genre.name}
                </span>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap xs:gap-8 mt-7">
          <div className=" h-28 w-28 text-[#2BC2E2] border border-[#2BC2E2] rounded-lg relative text-center pt-8 inline-block mr-5">
            <h1 className=" font-poppins font-[400] text-3xl">
              {vote_average}
            </h1>
            <p
              className="font-poppins font-[200] text-[#92979D]"
              style={{ fontSize: ".7rem" }}
            >
              {vote_count}
            </p>
          </div>
          <div className="inline-block font-[400]">
            <p>
              <span className="text-[#2BC2E2]">Release Date: </span>
              {release_date}
            </p>
            <p>
              <span className="text-[#2BC2E2]">Duration: </span>
              {runtime} mins
            </p>
            <p>
              <span className="text-[#2BC2E2]">Status: </span>
              {status}
            </p>
          </div>
        </div>
        <p className="font-[400] mt-4">{overview}</p>
      </div>
    </section>
  );
};

export default Item;
