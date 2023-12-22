import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { NavLink } from "react-router-dom";
export const NowPlaying = () => {
  const [data, setdata] = useState();
  const [index, setindex] = useState(0);

  useEffect(() => {
    const NowPlaying = async () => {
      const res = await fetch(
        " https://api.themoviedb.org/3/movie/now_playing?api_key=d61bb76e6a93a1216c49cf70a0fe5355"
      );
      const data = await res.json();
      setdata(data.results);
    };
    NowPlaying();
  }, []);
  // console.log(data);

  const onHandleNext = (item) => {
    setindex((prev) => (prev + 1) % item.length);
  };

  const onHandlePrev=(item)=>{
    setindex((prev)=>(prev-1+item.length)%item.length)
  }
  return (
    <>
      <div className="mb-[55px] flex flex-col gap-[55px]">
        <h1 className="text-[24px] text-white  ml-[20px]">Now Playing</h1>

        <div className="flex gap-5 overflow-hidden ml-[20px] relative">
          {data &&
            data.map((item) => (
              <div key={item.id} className="max-w-[15rem] "style={{transform:`translateX(-${index*260}px)`}}>
                <NavLink to={"/details"}>
                  <div className="bg-white rounded-lg h-[345px] overflow-hidden shadow-md transition-transform transform hover:scale-105 w-[234px]">
                    <img
                      className="w-full h-full  object-cover object-center rounded-t-lg"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    />
                  </div>
                </NavLink>
                <div className="text-white flex flex-col mt-[15px]">
                  <span className="text-[20px] truncate">{item.title}</span>
                  {/* substring(0,20)+'...' */}

                  <span className="text-[14px] opacity-50">
                    {item.release_date}
                  </span>
                </div>
              </div>
            ))}

{index>=1&&(
          <div className="absolute left-[30px] top-[144px] rounded-[50%]   hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px] " onClick={()=>onHandlePrev(data)}>
            <SlArrowLeft className="text-white text-[25px] mt-[2px] hover:text-[#ffffff99]" />
          </div>
)}
          
          <div
            className="absolute right-[30px] top-[140px] rounded-[50%] hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px]"
            onClick={() => onHandleNext(data)}
          >
            <SlArrowRight className="text-white text-[25px] hover:text-[#ffffff99] mt-[2px] ml-[4px]" />
          </div>
        </div>
      </div>
    </>
  );
};
