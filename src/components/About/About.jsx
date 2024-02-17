import React from "react";
import styles from "../styles/styles";

const About = () => {
  return (
    <React.Fragment>
      <div className="about">
        <div className="text absolute 800px:top-[180px] top-[300px] pl-4">
          <h3 className="text-[20px] font-Poppins font-[600]">
            May 12th-May 25th 2024
          </h3>
          <div className="title">
            <h1 className="text-[40px] font-Poppins font-[700]">
              Payris <span className="block">Funolympic 2024</span>
            </h1>
          </div>
        </div>
      </div>
      <div className={`${styles.section} mt-10 mb-10`}>
        <h1 className={`${styles.heading}`}>Payris Funolympic game</h1>
        <p className="text-[16px] leading-8 text-gray-600">
          The Payris Funolympic Game stand as a truly global and inclusive
          sports extravaganza, uniting athletes from more than 200 nations in a
          spectacular showcase of over 400 events during both the Summer and
          Winter Games. This unparalleled competition serves as a source of
          inspiration, fostering a sense of togetherness and celebration on an
          international scale. It is a unique platform where the world converges
          to witness athletic excellence, emphasizing the spirit of
          sportsmanship and unity that transcends borders and cultures.
        </p>
        <h1 className={`${styles.heading}`}>Our Legacy</h1>
        <p className="text-[16px] leading-8 text-gray-600">
          Payris 2024 has always embraced a broader perspective beyond mere
          sports and ticket sales. Fearless in adopting unconventional
          approaches and striving for excellence in creativity, inclusivity, and
          sustainability, our aim is to create a lasting impact on the region.
          Our comprehensive legacy program spans 11 different areas,
          contributing to the maximization of benefits for Payris and the West
          Midlands as hosts of the Games. In collaboration with our legacy
          partners, we have leveraged the Games to foster unity, enhance health
          and well-being, act as a catalyst for positive change, contribute to
          regional growth and success, and elevate our global presence. The
          legacy of Payris 2024 will endure through the skills, confidence, and
          optimism instilled in the local community, positively influencing
          their daily lives. This legacy will extend to future events and will
          be reflected in the transformed image of Yokyo and the surrounding
          region crafted by the Games.
        </p>
      </div>
    </React.Fragment>
  );
};

export default About;
