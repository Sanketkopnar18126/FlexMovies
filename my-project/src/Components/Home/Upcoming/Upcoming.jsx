import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
export const Upcoming = () => {
  const [data, setdata] = useState();

  const [index, setindex] = useState(0);

  const onHandleNext = (item) => {
    setindex((prev) => (prev + 1) % item.length);
  };
  const onHandlePrev = (item) => {
    setindex((prev) => (prev - 1 + item.length) % item.length);
  };

  useEffect(() => {
    const Upcoming = async () => {
      const res = await fetch(
        " https://api.themoviedb.org/3/movie/upcoming?api_key=d61bb76e6a93a1216c49cf70a0fe5355"
      );

      const data = await res.json();
      setdata(data.results);
    };
    Upcoming();
  }, []);

  return (
    <>
      <div className="mb-[55px] flex flex-col gap-[55px]">
        <h1 className="text-[24px] text-white ml-[20px]">Upcoming Movies</h1>

        <div className="flex gap-5  overflow-hidden ml-[20px] relative">
          {data &&
            data.map((item) => (
              <div
                key={item.id}
                className="max-w-[15rem] "
                style={{ transform: `translateX(-${index * 260}px)` }}
              >
                <div className="bg-white rounded-lg h-[345px] overflow-hidden shadow-md transition-transform transform hover:scale-105 w-[234px]">
                  <img
                    className="w-full h-full  object-cover object-center rounded-t-lg"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  />
                </div>

                <div className="text-white flex flex-col mt-[15px] ">
                  <span className="text-[20px] truncate">{item.title}</span>
                  <span className="text-[14px] opacity-50">
                    {item.release_date}
                  </span>
                </div>
              </div>
            ))}
{index>=1&&(
          <div
            onClick={() => onHandlePrev(data)}
            className="absolute left-[30px] top-[144px] rounded-[50%]   hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px] "
          >
            <SlArrowLeft className="text-white text-[25px] mt-[2px] hover:text-[#ffffff99]" />
          </div>
)}


          <div
            onClick={() => onHandleNext(data)}
            className="absolute right-[30px] top-[140px] rounded-[50%] hover:bg-[#0000003d] w-[43px] h-[43px] p-[7px]"
          >
            <SlArrowRight className="text-white text-[25px] hover:text-[#ffffff99] mt-[2px] ml-[4px]" />
          </div>
        </div>
      </div>
    </>
  );
};
