import React from "react";
import { data } from "../Datas/banner";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {
  return (
    <React.Fragment>
      <div className="">
        <div className="headers"></div>
        <div className="800px:ml-8 ml-2">
          <div className=" 800px:mt-[-100px] mt-2">
            <Swiper
              modules={[Autoplay]}
              // slidesPerView={3}
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                // mobile landscape
                478: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                // When window width is <= 640px (mobile screens)
                640: {
                  slidesPerView: 1,
                },
                // When window width is <= 768px (tablet screens)
                768: {
                  slidesPerView: 2,
                },
                // When window width is <= 1024px (desktop screens)
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white shadow-md w-[400px]">
                    <div>
                      <img src={item.image} className="relative" alt="" />
                      <span className=" absolute mt-[-40px] 800px:right-[40px] right-[5px] text-white uppercase font-Poppins bg-[#000000fe] p-2">
                        {item.sport}
                      </span>
                    </div>
                    <div className="p-3">
                      <h2 className=" capitalize font-[600] text-[18px]">
                        {item.title}
                      </h2>
                      <div className="flex justify-between items-center pt-8">
                        <h6 className="capitalize font-[500] text-[15px]">
                          {item.sport}
                        </h6>
                        <h6 className="capitalize text-[13px]">{item.date}</h6>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Banner;
