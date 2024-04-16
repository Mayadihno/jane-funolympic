import React, { useState } from "react";
import Loader from "../components/Loader/Loader";
import { sportss } from "../components/Datas/banner";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const UploadFixtures = () => {
  const [fixtures, setFixtures] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sport, setSport] = useState("");
  const [odd, setOdd] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      id: `${Date.now()}`,
      matchFixtures: fixtures,
      date: date,
      time: time,
      timeStamp: serverTimestamp(),
      sport: sport, // Include the sport information
      odd,
    };
    try {
      await setDoc(doc(db, "fixtures", `${Date.now()}`), formData);
      setLoading(false); // Reset form fields after successful upload
      navigate("/fixtures", { replace: true });
      e.target.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div className=" bg-white shadow-md rounded-[5px] 800px:w-1/2 w-full">
        {loading && (
          <Loader text={"Fixture uploading don't refresh the page"} />
        )}
        <form onSubmit={handleSubmit} className="px-3 space-y-4">
          <h2 className=" text-[16px] font-[600] font-Poppins pt-4 text-center">
            Upload the Fixtures of the day
          </h2>
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Match Fixtures name
            </label>
            <div className="mt-1">
              <input
                type="text"
                required
                autoComplete="fixtures"
                value={fixtures}
                onChange={(e) => setFixtures(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Match Fixtures date
            </label>
            <div className="mt-1">
              <input
                type="date"
                required
                autoComplete="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Match Fixtures time
            </label>
            <div className="mt-1">
              <input
                type="time"
                required
                autoComplete="date"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Match Odd<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                required
                value={odd}
                placeholder="1.56(home)  ---  4.67(away)"
                onChange={(e) => setOdd(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full mt-1">
            <label htmlFor="" className="block">
              Preferred Sport
            </label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full border h-[40px] rounded-[5px]"
            >
              <option value="" className="block pb-2">
                Choose your sport fixture
              </option>
              {sportss &&
                sportss.map((item) => (
                  <option
                    className="block pb-2"
                    value={item.sport}
                    key={item.id}
                  >
                    {item.sport}
                  </option>
                ))}
            </select>
          </div>
          <div className="p-2">
            <input
              type="submit"
              value="Upload"
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer hover:bg-blue-700 hover:text-white"
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UploadFixtures;
