/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../components/styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import ForgetPassword from "../ForgetPassword";
const International = ({ setActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [hide, setHide] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/fixtures", { replace: true });
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/wrong-password" || "auth/user-not-found") {
        toast.error("Incorrect Email or Password");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex justify-center items-center">
        <div className=" relative w-[98%] 800px:w-[60%] h-[60vh]  800px:h-[80vh] bg-white rounded-md p-4 shadow-sm">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50 cursor-pointer"
            onClick={() => setActive(false)}
          />
          {hide === 1 && (
            <div className="flex justify-center items-center mt-2">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Login as international user
                </h2>
                <div className="bg-white py-8 800px:px-4 px-1 sm:rounded-lg sm:px-10">
                  <form className="space-y-6" onSubmit={handleSubmit}>
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
                          placeholder="yourEmail@gmail.com"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          type={!visible ? "password" : "text"}
                          name="password"
                          id="password"
                          required
                          placeholder="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {visible ? (
                          <AiOutlineEye
                            className="absolute top-2 right-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(false)}
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            className="absolute top-2 right-2 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div className={`${styles.normalFlex} justify-between`}>
                      <div className={`${styles.normalFlex}`}>
                        <input
                          type="checkbox"
                          name="remember-me"
                          id="remember-me"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember Me
                        </label>
                      </div>
                      <div
                        onClick={() => setHide(2)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        <Link>Forgot password</Link>
                      </div>
                    </div>
                    <div className="">
                      <button
                        type="submit"
                        className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                      >
                        Submit
                      </button>
                    </div>
                    <div className={`${styles.normalFlex} w-full`}>
                      <h4>Not having account ?</h4>
                      <Link to={"/register"} className="text-blue-600 pl-2">
                        Sign up
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {hide === 2 && <ForgetPassword setHide={setHide} />}
        </div>
      </div>
    </React.Fragment>
  );
};

// {show && <ForgetPassword setShow={setShow} />}

export default International;
