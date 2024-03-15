import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPopular } from "../redux/actions/movieAction";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";

const MainPage = () => {
  const state = useSelector((store) => store.genre);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopular());

    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Hero />

      {/* 
    1- If the loading process is still ongoing, display the loader.
    2- If the loading has finished but there is an error, display the error.
    3- If the loading has finished and there is no error, display the list components.
    */}

      {state.isLoading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : state.isError ? (
        <p>Sorry, an unexpected error occurred. {state.isError}</p>
      ) : (
        state.genres.map((genre) => <MovieList key={genre.id} genre={genre} />)
      )}
    </div>
  );
};

export default MainPage;
