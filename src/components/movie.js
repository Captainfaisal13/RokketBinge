import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const loadingImage =
  "https://static.vecteezy.com/system/resources/thumbnails/008/174/698/original/animation-loading-circle-icon-loading-gif-loading-screen-gif-loading-spinner-gif-loading-animation-loading-on-black-background-free-video.jpg";

const url = "https://image.tmdb.org/t/p/w185/";

const getString = (title) => {
  if (title.length > 25) {
    return title.substr(0, 25) + "...";
  } else {
    return title;
  }
};

const Movie = ({
  type,
  id,
  name,
  original_title,
  original_name,
  poster_path: imagepath,
  release_date,
  first_air_date,
}) => {
  const imgURL = `${url}${imagepath}`;
  const notFoundUrl =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAREBUQEBIWFRUVFhAXFhUWFRUQFxcVFxUWFxUXFRYYHSggGBolGxUXIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0OFQ8PFSsZFR0tKysrLTcrNzcrNysrKy0rLTcrKystKy0rLSstKy03LS0rKystKysrKysrKysrKysrK//AABEIAPYAzQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgMGB//EADgQAAIBAgQDBgMGBwADAAAAAAABAgMRBBIhMQVBURMiYXGBkQYy0VKhscHh8BQjM0JicpKCovH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/APqAANsgAAAAAAAAAAAAAAAAMZltcyAAAAAAAAAAAAAAAAAAAAAAAAAAAAG0YN7FTxjF16ekabivt/MvS23qFXFOk39SLxbh9acf5M7afL8rflLkecwnF69Pad091LvL9PQvsB8R05WVVZH13j9USjzOIw9Wm+/GUX1d9/B7MuOD8TcrU6m/KXXwZ6VOFSP9sovykih4xwzDU++punLdRXfu/CO697AWQIvD8S6lOMnu739HYlFQAAAAAAAAAAAAAAAAAAAA4wxlHPklUSf3eV9kB1lJJXeiXXQqcZxuMdKaUn1e36npIQi1pZp+Uk/qVeM+HqM9Y3g/8fl9n+ViVWvD/iCjLSa7N+OsX68vUuIyjJaNNPpZo8ZjeDVqWrWaP2o3fuuRFwuKqU3enJx62ej81swPVY3gFGo7pOD/AMbW9Y/SxQcR4NUopydpRX9y090TIfFEstnTTl1u1H1X6kKSr4l5py7vLkl/rECDh8ROEr024vbTd+FifS4bObzVZPXV85P6FjhMDGHyrXq9yZGmWDXDUlCKjFWSJBrsbNNWb57BAAAAAAAAAAAAAAANoQb2A1OlOi34FHxjF1oPLkcF9re/k1oQ8DxetS0Us0fsy1+/dBXpcdw11I5Y1JQfhqn58zy+O4TVpayjeP2lqvXp6noMH8QUp6TTg+r1j7/Ut4STV0011TuQeEweNqUnenJrw3T9C9wvxJF6VYNf5R1XtyJHGcNhbZqrUH1jpJ+i+Y8jJuUstO7XLSza8uQHssZxyhTjdSzt7KO/r0PMYqtUxM7qCXLRJJeb5nbB8I51P+V+bLilTSSSWnJIQV+D4VGOsu8/uX1LOMDhicbTp6SevRav9CZwefaw7RxsrtRu90t2/X8CjDsk3ySbb5JLe5WYnjkFpBOb/wCV95N+KcTkoqmt5u1v8Vq/vsvUo/h/B9pWjdd2Pefpsvf8CUewwtG0VmSzWWbz5pHnfiLiDVeCi/6er6Znuvay9T0uIrKEXOW0U2zwNSUpycpayk7vzYHrqVRSSktmro3OGFjCMYwi72ir9M3O3XU7lAABAAAAAAAAA71KuRKMY3fN3svU4Gmdtu+9166DVdf43lUgrdV3l6pojYvglGqs1N5X/jZx9Y8vQRnK9r3WuuXK14ePn4GcrTzQeV9Vs/NEFHjuE1aSzSScftJ3909SDS4lUp/05Sj66e2xYcWoYipO9Say8uUV6ClQoUdW05f9P0S2AiUcFVrPPUbV+b1b8lyLihh6dKOlorq+fm2W+GwMbJyu3ZO3TwPLcexPaVmovux7semm7Xrf2AuOH14VamSN3ZNtray/VlpiJxo05Tt8qb83yXuV/wAL4TJS7R7zf/qrpfm/U4/FeJ0jSXN5n5K6S97v0A83GEpytvKT923+p7/C0FThGnHaKS+rPK/D9KPa9pNpKC585PRW+/7i9xHEbpqmutpPS3ilu/uA87x7EdpXl0j3V6bv3uWXw/UhSpuTu5Sey1eVbX5LW/PoR6PD4R37z8dvYlRjYDrjq8q0XBrLF2vbVuzulfZaojUsPCO0V58/fc6gDMXZ3JqZBO+GqX06DB3ABUAAAAAAAADlPSSfXT1Wq/M6nPELu6brVemoVi4uauWl9fSyfpfmaxk923yteydursQbzlZXabXVWaXg1uQqvD4ZlOKSkmn4O2uqGIxtKLu7N9Ers6Um6kM03GEJJpJ6za20SAn4jiKWGdZaNppf7bfj+B5LDYdzmoLeT3/Fv8S74lDPGFKmstOHXdvZWXk3v1OVDAwjru+r+gF28bSppQh3sqslHVaeOxR4nCurUlUqPfaK5LkrkpIXA50qEY/Kkv31OhgWAzcxcGAM3NWYuYYG2Y2pzs7nMygLJMHHDTurdDsVAAAAAAAAAAAV2NU6cG4NNK1r/wBqvr5oq7163N2/5ieknG6sRCKrqPC0vmfotF7k2FNR2VjoYASlcwDAG0U27IsoUVFWjlvfVyt9xWRk001yLKpCD85q66X/ACA3dKLb/lqy2a3b9DhWpU4pZlKN/W3mQozsyZhYt2c3pfuxfN9QIuKpZJZfZ+BxsTse/lzfMlrYhtAagyANWjBsasDpRnZk8rES8BUcqcW+iKJAACAAAAAAAABGrKzJJyxC0uFcDVsyYZAMGGzGYDOYn4Ko3BxUknF3u+nMr0dKNRxd1/8AV0YEqrQj2l20ovvefgvUk16mVXaTd+4uisR3iYtJOG21nocak3J3YHNtt3YZtYwBo0anRnCvXjD5nbw5+wGxrJ21ZAq8Sk3anH1ev3Cnw2tV1qNpeP02QDE4rO+zp6t6OS5LnYvsPTyxUeiSI2B4dCltq+pNKAACAAAAAAAABiS0MgCF5ms2b4hWZxIrDZlGDKAyjZGqNgOsEGcZ14x+ZpEOpxK+lON31f0AsmyHX4jCOi7z8PqcI4KtV+d6dOXsT8NwyEeV2UVrq16ukVlXhp953w/BVvN3LiMUtjIHGjhYQ+VI7ABAAAAAAAAAAAAAAAAHDF7XIhYVIKScXsymrKrS0cc8eTv3vXr5hUgXK2XEZvSMLPxu/uNqeArVdZvT98tiDvV4hCO3efht7nJVq1T5VlX75ljhuEwjq9WToQS2RYKmhwhvWbuWNHCwjsjuAgAAAAAAAAAAAAAAAAAAAAAAAAYaMgDTsY9DcAAAAAAAAAAAAAAAAAAAAAAAAAAAABD4ljHSSaSd3bXTkTCr4/8ALH/b8guNp8Qqw1qUrR6p3LCnNSSktnqisxMsRVi4dmoJ2u2+jua1YNzhhlJqKiszWl9wLcFRVg6FSGWTcZOzTd+hjicv5qVRyVO2mXqBbzlZN9E2csJiFUjnimldrXwISw9OVF5JyaV3vrdLZ+Bz4NhU4qpmd05aX09gLcHn/wCIhUlJ1ZT37qjeyR1w9eTw9RNvu7N6OzBF2cMbX7ODmle1tPUicNwzajVlNt20XJLY68Y/oy/8fxQG/D8Yqsb7Nbr98jEcW+2dK2iV789k/wAyuyOkqdeOzjBTXojvRmpYpyWzgmv+UBagqZJ1q0oOTUIck7Xe31FJOnW7HM3GcXa71Wj+gE+nik6jpWd479OX1O5RUcEnXnDNKyW99dlu/UvIRskuiS9gMgAIAAAAAAAAEHiuFlUjFRto7u7sTgAZBxuEm5qrTtmWjT5onAKrY4arUnGdWyUdorXXc74mVe7UIxlHxfvdEsAQMBgnCElJq873tsjnw+jWp2g1Fwvq762LMAVkMNWpSl2VpRk72eljtUp1Z0pxmoqT2SfLTdk0AcMFScKcYvdLXma8QoudNxju7b6cySAONGj/ACowkv7UmvSzIOB4fOnVzaONpJO+uu2haACurYapGo6tKzzbxZnC4WbqdrVte1kly/f5lgAKythqsazqU0nmWzfgvoWNO9lm3sr268zYAAAEAAAAAAAAAAAIc+IRVXsrdFfld8iTWqqMXJ7JNnn8sXSlUcl2jlmSur2/bYV6MEKpUlUoZ4NqVr6dVuvxI88e/wCGUk+8+7fx5v2AtQQKqcaUc9Vwf90t278l++RDoYvLVio1XOMmk009Lu3MCyVSp2uXL3LfN4nPB4qU6lSLStF6W83v7Gka0v4pxu8uW9uWyOfDP61bz/NgWhwxtZwpykrXXXzKrEVEr2xMnJX0Sdr9OhIqV3PCuT3tZ+NnYCdg6rnCMnu0nocuJYl04Zo2vdLUg0sNU7FTjVaajdR5WXIxjMQ6mGUnvmSfmrgXFN3SfVJmxV8QxbiqcFLLmSvLey0Rxo4rJVio1XUjLR35MEXQACAAAAAAAAAAAAACDxanOcVCCvd6vol+v4G64bRtbIvPUlgKgcLozp5oSXdu3F9eX0IsOHz7WzX8tScltb98i5AKr+L4ecskorNlbbj12+hwqUqs6lOfZ5VGUeavZSTuy3AFfGhL+Jc7d3La/ojGEw01Os2rKV7P1ZYgClw9GrGEqXZK7v3na2v4nanhprDOGXva6afauWgAqU68aapKnyspJ6W8fEzicDJYdU4q7um7eN77lqAK3HYSbyTgk5RSvF8zahUm5JOgo9Xpp5FgAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z";
  return (
    <Link
      to={`/${type}/${id}`}
      target="_blank"
      className="p-5 xs:p-0 group hover:bg-gradient-to-r from-[#0678BC] to-[#3647DC] hover:p-0 hover:rounded-lg hover:pb-2 overflow-hidden ease-out duration-300"
    >
      <img
        className="w-full rounded-md group-hover:rounded-none"
        src={imagepath ? imgURL : notFoundUrl}
        alt={"poster"}
      />
      <div className="group-hover:ml-2">
        <h1 className="text-sm pt-4 pb-1 group-hover:pt-3 font-normal">
          {name
            ? getString(name)
            : original_title
            ? getString(original_title)
            : getString(original_name)}
        </h1>
        <p
          className="text-[#404049] group-hover:text-white font-light"
          style={{ fontSize: "10px" }}
        >
          {release_date
            ? moment(release_date).format("MMM Do YY")
            : moment(first_air_date).format("MMM Do YY")}
        </p>
      </div>
    </Link>
  );
};

export default Movie;
