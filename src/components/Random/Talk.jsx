import React from "react";
import { images } from "../Datas/banner";
import styles from "../styles/styles";
import Button from "@mui/material/Button";

const Talk = () => {
  return (
    <React.Fragment>
      <div className={`${styles.section} mt-10`}>
        <h1 className={`${styles.heading}`}>Quick Fact</h1>
        <div className="flex 800px:justify-between flex-col">
          <div className="mr-6 800px:mb-0 mb-2">
            <h6 className="text-[16px] leading-10 tracking-wider font-Poppins pb-2">
              FunOlympics Payris 2024 is set to be an extraordinary celebration
              of sportsmanship and inclusivity. The event will showcase 15
              diverse sports, bringing together over 2000 athletes of all
              levels. Mark your calendars for the exciting event, taking place
              from July 27th to 30th in the beautiful city of Payris. Beyond the
              thrilling tournaments, FunOlympics Payris will feature a plethora
              of side activities and events, creating an unforgettable
              experience for all. Payris is honored to host this prestigious
              event and looks forward to welcoming participants and spectators
              from around the world!
            </h6>
            <Button variant="outlined">Register Now</Button>
          </div>
          <div className="image grid grid-cols-2 gap-1">
            {images.map((item) => {
              return (
                <div key={item.id} className="relative">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={item.image}
                      alt=""
                      className="object-cover w-full h-full rounded-[4px]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Talk;
