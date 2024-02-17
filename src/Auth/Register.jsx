import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../components/styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Country } from "country-state-city";
import { sports } from "../components/Datas/banner";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [sport, setSport] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userRole = "user";
    if (email === "mayadihno@gmail.com") {
      userRole = "admin";
    }
    try {
      if (password !== Cpassword) {
        toast.warning("password and confrim password did not match");
        return;
      }

      const formData = {
        email,
        password,
        fullName,
        country,
        sport,
        phone,
        role: userRole,
      };
      const users = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: fullName,
        PhoneNumber: phone,
        Email: email,
      });

      const usersData = users.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", usersData.uid), formDataCopy);
      toast.success("You have successfull create account");
      navigate("/fixtures", { replace: true });
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email have already been used");
        console.log(error);
      } else if (error.code === "auth/weak-password") {
        toast.warning("Password should be more than 6 letters");
      } else {
        toast.error("Something went wrong");
        // console.log(error.message);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50 flex flex-col py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Register as international user
          </h2>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md overflow-y-scroll h-[80vh]">
            <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      autoComplete="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      autoComplete="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-full mt-1">
                  <label htmlFor="" className="block pb-2">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border h-[40px] rounded-[5px]"
                  >
                    <option value="" className="block ">
                      Choose your country
                    </option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option
                          className="block pb-2"
                          value={item.isoCode}
                          key={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
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
                      Choose your prefered sport
                    </option>
                    {sports &&
                      sports.map((item) => (
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
                <div className="">
                  <label
                    htmlFor="Cpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={!visible ? "password" : "text"}
                      name="Cpassword"
                      id="Cpassword"
                      required
                      autoComplete="current-password"
                      value={Cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
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
                <div className="">
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                  >
                    Submit
                  </button>
                </div>
                <div className={`${styles.normalFlex} w-full`}>
                  <h4>Already have an account ?</h4>
                  <Link to={"/login"} className="text-blue-600 pl-2">
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
