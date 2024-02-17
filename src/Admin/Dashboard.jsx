/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "../components/styles/styles";
import { FaUsers } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { MdOutlineOndemandVideo, MdOutlineScoreboard } from "react-icons/md";
import Users from "../Users/Users";
import UploadIamge from "../Gallery/UploadIamge";
import UploadVideo from "../Videos/UploadVideo";
import UploadFixtures from "../Fixtures/UploadFixtures";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [active, setActive] = useState(1);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const collectionRef = collection(db, "users");
  const imageRef = collection(db, "images");
  const videoRef = collection(db, "videos");
  const FixturesRef = collection(db, "fixtures");
  const getData = async () => {
    const data = await getDocs(collectionRef);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getImages = async () => {
    const data = await getDocs(imageRef);
    setImages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getVideos = async () => {
    const data = await getDocs(videoRef);
    setVideos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getFixtures = async () => {
    const data = await getDocs(FixturesRef);
    setFixtures(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getData();
    getImages();
    getVideos();
    getFixtures();
  }, []);

  return (
    <React.Fragment>
      <div className={`${styles.section} 800px:mt-6 mt-[70px]`}>
        <div className="grid 800px:grid-cols-4 grid-cols-2 gap-4 text-black 800px:ml-0 ml-5">
          <div className="800px:w-[200px] w-[160px] bg-gray-300 shadow-lg rounded-[4px] p-2">
            <div className="flex">
              <h4 className="text-[18px] font-Roboto font-[600]">Total User</h4>
              <FaUsers size={25} className="ml-2" />
            </div>
            <h4 className="text-[16px] pt-1 font-[600] font-Poppins">
              {data?.length}
            </h4>
          </div>
          <div className="800px:w-[200px] w-[160px] bg-gray-300 shadow-lg rounded-[4px] p-2">
            <div className="flex">
              <h4 className="text-[18px] font-Roboto font-[600]">
                Total Images
              </h4>
              <GrGallery size={25} className="ml-2" />
            </div>
            <h4 className="text-[18px] font-Roboto font-[600]">
              {images?.length}
            </h4>
          </div>
          <div className="800px:w-[200px] w-[160px] bg-gray-300 shadow-lg rounded-[4px] p-2">
            <div className="flex">
              <h4 className="text-[18px] font-Roboto font-[600]">
                Total Vidoes
              </h4>
              <MdOutlineOndemandVideo size={25} className="ml-2" />
            </div>
            <h4 className="text-[18px] font-Roboto font-[600]">
              {videos?.length}
            </h4>
          </div>
          <div className="800px:w-[200px] w-[160px] bg-gray-300 shadow-lg rounded-[4px] p-2">
            <div className="flex">
              <h4 className="text-[18px] font-Roboto font-[600]">
                Total Fixtures
              </h4>
              <MdOutlineScoreboard size={25} className="ml-2" />
            </div>
            <h4 className="text-[18px] font-Roboto font-[600]">
              {fixtures?.length}
            </h4>
          </div>
        </div>
        <div className="my-10">
          <div className="flex 800px:justify-between space-x-2 800px:space-x-0">
            <div className="800px:w-[16%] w-[15%] bg-blue-100 shadow-md rounded-[5px] 800px:h-[60vh] h-[50vh] p-2">
              <div className="flex flex-col px-1">
                <div
                  onClick={() => setActive(1)}
                  className={`flex py-5 cursor-pointer ${
                    active === 1
                      ? " text-red-500 font-[600] font-Poppins "
                      : " font-[500]"
                  }`}
                >
                  <FaUsers className="mr-2" size={25} />
                  <h2 className="800px:block hidden">Users</h2>
                </div>
                <div
                  onClick={() => setActive(2)}
                  className={`flex py-5 cursor-pointer ${
                    active === 2
                      ? " text-red-500 font-[600] font-Poppins "
                      : " font-[500]"
                  }`}
                >
                  <GrGallery size={25} className="mr-2" />
                  <h2 className="800px:block hidden">Upload Image</h2>
                </div>
                <div
                  onClick={() => setActive(3)}
                  className={`flex py-5 cursor-pointer ${
                    active === 3
                      ? " text-red-500 font-[600] font-Poppins "
                      : " font-[500]"
                  }`}
                >
                  <MdOutlineOndemandVideo size={25} className="mr-2" />
                  <h2 className="800px:block hidden">Upload Video</h2>
                </div>
                <div
                  onClick={() => setActive(4)}
                  className={`flex cursor-pointer py-5 ${
                    active === 4
                      ? " text-red-500 font-[600] font-Poppins "
                      : " font-[500]"
                  }`}
                >
                  <MdOutlineScoreboard size={25} className="mr-2" />
                  <h2 className="800px:block hidden">Upload Fixtures</h2>
                </div>
              </div>
            </div>
            <div className=" 800px:w-[74%] w-[85%] bg-blue-100 shadow-md rounded-[5px] p-2 flex items-center justify-center">
              {active === 1 && <Users />}
              {active === 2 && <UploadIamge />}
              {active === 3 && <UploadVideo />}
              {active === 4 && <UploadFixtures />}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
