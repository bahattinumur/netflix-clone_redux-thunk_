import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgUrl, options } from "../redux/actions/constant";
import axios from "axios";
import millify from "millify";
import { SplideSlide, Splide } from "@splidejs/react-splide";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  //? URL den filmin id'sini al
  const { id } = useParams();

  //? Film verilerini al

  useEffect(() => {
    axios
      .get(
        `/movie/${id}?append_to_response=credits,videos&language=en-EN`,
        options
      )
      .then((res) => setMovie(res.data));
  }, []);

  console.log(movie);

  //? Filmin oyuncularının verilerini al
  return (
    <div className="row">
      {!movie ? (
        <div class="spinner-border text-primary" role="status"></div>
      ) : (
        <>
          {/* Banner */}
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImgUrl + movie.backdrop_path}
              alt=""
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>
          <div className="container p-5 ">
            {/* Left side */}
            <div className="col-md-6 mt-4 ">
              {/* Companies */}
              <h3 className="mt-4">Production Companies</h3>
              <div className="d-flex flex-wrap gap-4">
                {movie.production_companies.map((i) => (
                  <div className="bg-white rounded p-2 d-flex align-items-center">
                    {i.logo_path ? (
                      <img
                        className="object-fit-contain"
                        width={100}
                        height={50}
                        src={baseImgUrl + i.logo_path}
                        alt=""
                      />
                    ) : (
                      <span className="company">{i.name}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Languages */}
              <h3 className="mt-4">Languages</h3>
              <div className="d-flex flex-wrap gap-4">
                {movie.spoken_languages.map((i) => (
                  <div className="bg-white rounded p-2 d-flex align-items-center">
                    <span className="company">{i.name}</span>
                  </div>
                ))}
              </div>

              {/* Countries */}
              <h3 className="mt-4">Production Countries</h3>
              <div className="d-flex flex-wrap gap-4">
                {movie.production_countries.map((i) => (
                  <div className="bg-white rounded p-2 d-flex align-items-center">
                    <span className="company">{i.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right side */}
            <div className="col-md-6 mt-4 ">
              <p className="lead">{movie.overview}</p>

              <p className="fs-5">
                <span>Budget: </span>
                <span className="text-success">{millify(movie.budget)} $ </span>
              </p>

              <p className="fs-5">
                <span>Income: </span>
                <span className="text-success">
                  {millify(movie.revenue)} ${" "}
                </span>
              </p>
            </div>
            {/* Cast */}
            <div className="col-12 my-3">
              <h2>Cast</h2>
              <Splide
                options={{
                  height: "200px",
                  gap: "10px",
                  pagination: false,
                  autoWidth: true,
                }}
              >
                {movie.credits.cast.map((i) => (
                  <SplideSlide>
                    <div className="actor-card h-100">
                      <img
                        className="movie"
                        src={
                          i.profile_path
                            ? baseImgUrl + i.profile_path
                            : "/src/logo/default_img.png"
                        }
                      />
                      <p>
                        <span>{i.character}</span>
                        <span>{i.name}</span>
                      </p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>

            {/* Trailer */}
            <div className="my-5">
              <h1>Trailer</h1>
              <Splide
                options={{
                  height: "50vh",
                }}
              >
                {movie.videos.results.map((video) => (
                  <SplideSlide>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.key}`}
                    ></iframe>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
