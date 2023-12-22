import { useEffect, useState } from "react";
import { FaSistrix } from "react-icons/fa";
export const Banner = () => {
  const [BannerData, setBannerData] = useState("");
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=d61bb76e6a93a1216c49cf70a0fe5355"
        );
        if (res.ok) {
          const Data = await res.json();
          setBannerData(Data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgIndex((prev) => {
        return prev === BannerData.length - 1 ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [BannerData]);

  return (
    <>
      <div>
        <div className="absolute text-white left-[400px] bottom-[300px] z-10">
          <span className="text-[100px] ml-[141px]">Welcome</span>
          <br />
          <span className="text-[25px]">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>

          <div className="mt-[45px] h-[57px] rounded-[30px] border bg-white/80 flex justify-center items-center">
            <input
              className="w-[87%] h-[50px] text-[20px] text-black rounded-[21px] bg-transparent p-1 outline-none"
              type="text"
              placeholder="Search now..."
            />
            <button className="text-[30px] text-black">
              <FaSistrix />
            </button>
          </div>
        </div>
        <div>
          {BannerData &&
            BannerData.map((items, index) => (
              <div key={items.id} className="relative bg-center opacity-20">
                <img
                  src={`https://image.tmdb.org/t/p/w500${items.backdrop_path}`}
                  alt=""
                  className=" inset-0 w-full h-[87vh] object-cover object-center opacity-50 "
                  style={{ display: index === imgIndex ? "block" : "none" }}
                />

              
              </div>
            ))}
        </div>
  
      </div>
    </>
  );
};














// import { useEffect, useState } from "react";

// export const Trending = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchMovieVideos = async () => {
//       try {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/movie/466420/videos?api_key=d61bb76e6a93a1216c49cf70a0fe5355`
//         );
//         if (res.ok) {
//           const data = await res.json();
//           setVideos(data.results);
//         }
//       } catch (error) {
//         console.error("Error fetching movie videos:", error);
//       }
//     };

//     fetchMovieVideos();
//   }, []);

//   return (
//     <div>
//       <h2>Movie Videos</h2>
//       <ul>
//         {videos.map((video) => (
//           <li key={video.id}>
//             <p>{video.name}</p>
//             <iframe
//               title={video.name}
//               width="560"
//               height="315"
//               src={`https://www.youtube.com/embed/${video.key}`}
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };



