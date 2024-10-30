import { Box, Card, CardMedia, Grid } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase/setup";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    try {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=6a1d86e89fa2dd60deb87337daad9873"
      )
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);


 const addMovie = async(movie)=>{
  const movieRef = doc(database,'Movies',`${movie.id}`)
  try {
    await setDoc(movieRef,{
      movieName:movie.original_title
    })
  } catch (err) {
    console.log(err)
  }
  
 }



  return (
    <div style={{ backgroundColor: "#181818" }}>
      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
      {movies.map((movie) => {
          addMovie(movie)
         return <Grid item xs={3}>
            <Box>
              <Link to="/MovieDetail" state={{movie:movie}}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  ></CardMedia>
                </Card>
              </Link>
            </Box>
          </Grid>
     })}
      </Grid>
    </div>
  );
};

export default Home;
