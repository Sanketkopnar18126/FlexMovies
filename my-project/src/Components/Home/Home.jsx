import { Banner } from "../Banner/Banner";
import { NowPlaying } from "./NowPlaying/NowPlaying";
import { PopularMovies } from "./PopularMovies/PopularMovies";
import { TopRated } from "./TopRatedMovies/TopRated";
import { Upcoming } from "./Upcoming/Upcoming";


export const Home = () => {
return(
  <>
  
<Banner/>
<PopularMovies/>
<TopRated/>
<Upcoming/>
<NowPlaying/>
  </>
)
};



