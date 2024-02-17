/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "../components/styles/styles";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
const ForgetPassword = ({ setHide }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Password Link has been sent to Your Email");
      setHide(1);
      e.target.reset();
      console.log("reset");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User Not Found");
      }
    }
  };
  return (
    <React.Fragment>
      <h1 className={`${styles.heading} !text-center mt-5`}>
        Enter your registerd Email Here
      </h1>
      <div className={`${styles.section} mt-20 ml-[200px]`}>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="group relative w-1/2 h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ForgetPassword;
