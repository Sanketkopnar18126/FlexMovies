import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { NavLink } from "react-router-dom";
export const PopularMovies = () => {
  const [data, setdata] = useState();

  const [currentIndex, setIndex] = useState(0);

  useEffect(() => {
    const Popular = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=d61bb76e6a93a1216c49cf70a0fe5355"
        );
        const data = await res.json();
        setdata(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    Popular();
  }, []);
  console.log(data);

  const handleNext = (items) => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = (items) => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <>
      <div className="mb-[55px] flex flex-col gap-[55px]">
        <h1 className="text-[24px] text-white mt-[30px] ml-[20px]">
          Popular Movies
        </h1>
        <div className="flex gap-5  overflow-hidden ml-[20px] relative ">
          {data &&
            data.map((item) => (
              <div key={item.id}>
               
                <div className="max-w-[15rem] transition-transform transform hover:scale-105" style={{
          transform: `translateX(-${currentIndex * 260}px)`
        }} >
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

{/* These is imp carusel */}
{/* here check the index is 1or>1then show only */}

                { currentIndex > 0 && (
  <div className="absolute left-[30px] top-[144px] rounded-[50%] hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px] ">
    <SlArrowLeft className="text-white text-[25px] mt-[2px] hover:text-[#ffffff99]" onClick={() => handlePrev(data)} />
  </div>
)}


               


                <div className="absolute right-[30px] top-[140px] rounded-[50%] hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px]">
                  <SlArrowRight
                    className="text-white text-[25px] hover:text-[#ffffff99] mt-[2px] ml-[4px]"
                    onClick={() => {
                      handleNext(data)
                      
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
