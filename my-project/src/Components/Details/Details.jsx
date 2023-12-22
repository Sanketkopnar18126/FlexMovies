import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CgPlayButtonO } from "react-icons/cg";

export const Details = () => {
  const [data, setdata] = useState();
  const [castData, setCast] = useState();
  const [relatedData, setrelatedData] = useState();
  const [recomendedData, setrecomendedData] = useState();

  const [videoData,setVideoData]=useState()

  const[showvideo,setshowvideo]=useState()



  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    // console.log(id);

    const detailsApi = async () => {
      if (id) {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=d61bb76e6a93a1216c49cf70a0fe5355`
          );
          const data = await res.json();
          setdata(data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };

    detailsApi();
  }, []);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));

    const CastDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d61bb76e6a93a1216c49cf70a0fe5355`
      );
      const data = await res.json();
      setCast(data);
    };
    CastDetails();
  }, []);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    const RelatedMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d61bb76e6a93a1216c49cf70a0fe5355`
      );
      const data = await res.json();
      setrelatedData(data.results);
    };

    RelatedMovies();
  }, []);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    const RecomendationMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=d61bb76e6a93a1216c49cf70a0fe5355`
      );
      const data = await res.json();
      setrecomendedData(data.results);
    };

    RecomendationMovies();
  }, []);


  // get video

  useEffect(()=>{
    const id = JSON.parse(localStorage.getItem("id"));
    const MovieVideo=async ()=>{
      const res=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d61bb76e6a93a1216c49cf70a0fe5355`)   
      const data=await res.json()
      setVideoData(data)

    }
    MovieVideo()
  },[])


const onHandleVideo=()=>{

  setshowvideo(false)
}


  // console.log(videoData)
  // console.log(data);
  // console.log(castData?.cast);
  // console.log(relatedData)
  return (
    <>
      {data && (
        <div className="flex gap-[5.75rem] ml-[126px] mb-[60px] mt-[89px]">
          {/* Poster */}
          <div className="rounded-[12px]">
            <img
              className="max-w-[350px] rounded-xl"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt=""
            />
          </div>

          <div className="flex flex-col gap-[37px]">
            {/* Title */}
            <div>
              <h1 className="text-[34px] text-white">{data.title}</h1>
              <h2 className="text-[20px] opacity-50 italic text-white">
                {data.tagline}
              </h2>
            </div>

            <div className="flex gap-2">
              {data.genres.map((items) => (
                <div
                  className="bg-red-500 text-white rounded-[5px] p-[3px]"
                  key={items.id}
                >
                  {items.name}
                </div>
              ))}
            </div>

            {/* Rating */}

            <div className="flex items-center gap-[2rem]">
              <div
                className={`w-[71px] h-[68px] rounded-[50%] text-[20px] flex justify-center text-white  items-center font-semibold bg-gradient-to-b from-red-500 to-white`}
                style={{
                  backgroundSize: `${100 - data.vote_average * 10}% 100%`,
                }}
              >
                {data.vote_average}
              </div>

              <div className="flex items-center gap-2  cursor-pointer " onClick={()=>setshowvideo(true)} >
                <CgPlayButtonO className="text-[82px] text-white opacity-30 transition-all duration-300 transform hover:scale-110  hover:text-red-600" />
                <span className="text-white text-[23px] font-semibold opacity-70 transition-all duration-300 hover:opacity-100">
                  Watch trailer
                </span>
              </div>



{/* Show video */}

{ showvideo &&setVideoData && videoData?.results.slice(0,1).map((items)=>(
  <div  key={items.id} className="absolute top-[21.75rem] left-[42px] " >
  <iframe
 
  title="Trailer"
  width="560"
  height="315"
  src={`https://www.youtube.com/embed/${items.key}`}
  frameBorder="0"
  allowFullScreen
></iframe>

<div className="text-[34px] text-white absolute top-[-4px] right-0 cursor-pointer "  onClick={onHandleVideo}>
<IoMdClose/>
</div>
</div>
))


}



            </div>
            {/* Overview */}
            <div>
              <h1 className="mb-[10px] text-[24px] text-white">Overview</h1>
              <p className="text-white leading-5 w-[73%] text-[17px]">
                {data.overview}
              </p>
            </div>

            <div className="flex gap-[25px]">
              <div className="font-semibold text-white opacity-100 flex text-[18px]">
                Status:<p className="opacity-50 ml-[15px]"> {data.status}</p>
              </div>
              <div className="font-semibold text-white opacity-100 flex text-[18px]">
                Release Date:
                <p className="opacity-50 ml-[15px]">{data.release_date}</p>
              </div>
              <div className="font-semibold text-white opacity-100 flex text-[18px]">
                Duration:<p className="opacity-50 ml-[15px]">{data.runtime} </p>{" "}
                min
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="ml-[154px] mr-[22px] mb-[50px] h-[350px]">
        <h1 className=" text-white mb-6 text-2xl ml-[26px]">Top Cast</h1>
        <div className="grid grid-cols-7 ">
          {castData &&
            castData.cast.slice(0, 7).map((items) => (
              <div
                key={items.id}
                className="rounded-[50%] border-[2px] border-white h-[219px] w-[173px] flex items-center flex-col gap-3 "
              >
                <img
                  className="w-[169px] h-[216px] rounded-[50%] object-cover object-top"
                  src={`https://image.tmdb.org/t/p/w500${items.profile_path}`}
                  alt=""
                />

                <h1 className="text-[18px] text-white leading-6 font-semibold">
                  {items.name}
                </h1>
                <h1 className="text-[16px] leading-6 opacity-40 text-white">
                  {items.character}
                </h1>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-[55px] flex flex-col gap-[44px]">
        <h1 className="text-[24px] text-white mt-[30px] ml-[20px]">
          Related Movies
        </h1>
        <div className="flex gap-5  overflow-hidden ml-[20px] relative">
          {relatedData &&
            relatedData.map((item) => (
              <div key={item.id} className="max-w-[15rem]">
                <NavLink to={"/details"}>
                  <div
                    onClick={() =>
                      localStorage.setItem("id", JSON.stringify(item.id))
                    }
                    className="bg-white rounded-lg h-[345px] overflow-hidden shadow-md transition-transform transform hover:scale-105 w-[234px]"
                  >
                    <img
                      className="w-full h-full  object-cover object-center rounded-t-lg"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    />
                  </div>
                </NavLink>

                <div className="text-white flex flex-col mt-[15px]">
                  <span className="text-[20px]  truncate">{item.title}</span>
                  <span className="text-[14px] opacity-50">
                    {item.release_date}
                  </span>
                </div>
              </div>
            ))}

          <div className="absolute left-[30px] top-[144px] rounded-[50%]   hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px] ">
            <SlArrowLeft className="text-white text-[25px] mt-[2px] hover:text-[#ffffff99]" />
          </div>
          <div className="absolute right-[30px] top-[140px] rounded-[50%] hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px]">
            <SlArrowRight className="text-white text-[25px] hover:text-[#ffffff99] mt-[2px] ml-[4px]" />
          </div>
        </div>
      </div>

      {recomendedData && recomendedData.length>0 ? (
        <div className="mb-[55px] flex flex-col gap-[55px]">
          <h1 className="text-[24px] text-white mt-[30px] ml-[20px]">
            Recomended Movies
          </h1>
          <div className="flex gap-5  overflow-hidden ml-[20px] relative">
            {recomendedData &&
              recomendedData.map((item) => (
                <div key={item.id} className="max-w-[15rem]">
                  <NavLink to={"/details"}>
                    <div
                      onClick={() =>
                        localStorage.setItem("id", JSON.stringify(item.id))
                      }
                      className="bg-white rounded-lg h-[345px] overflow-hidden shadow-md transition-transform transform hover:scale-105 w-[234px]"
                    >
                      <img
                        className="w-full h-full  object-cover object-center rounded-t-lg"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      />
                    </div>
                  </NavLink>

                  <div className="text-white flex flex-col mt-[15px]">
                    <span className="text-[20px]  truncate">{item.title}</span>
                    <span className="text-[14px] opacity-50">
                      {item.release_date}
                    </span>
                  </div>
                </div>
              ))}

            <div className="absolute left-[30px] top-[144px] rounded-[50%]   hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px] ">
              <SlArrowLeft className="text-white text-[25px] mt-[2px] hover:text-[#ffffff99]" />
            </div>
            <div className="absolute right-[30px] top-[140px] rounded-[50%] hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px]">
              <SlArrowRight className="text-white text-[25px] hover:text-[#ffffff99] mt-[2px] ml-[4px]" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
