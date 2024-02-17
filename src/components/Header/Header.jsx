import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { clearUserData } from "../../redux/slice";
import { toast } from "react-toastify";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const { userData, phoneUser } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  const [actives, setActives] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //to make navbar stay at the top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActives(true);
    } else {
      setActives(false);
    }
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    dispatch(clearUserData());
    navigate("/", { replace: true });
    window.location.reload();
  };
  const handleEvent = (e) => {
    e.preventDefault();
    setActive(2);
    setMobile(false);
    if (phoneUser) {
      toast.warning("Sorry,no live event avaliable at this moment");
    } else {
      toast.error("Please login to watch live event");
    }
  };
  return (
    <React.Fragment>
      <div
        className={`${
          actives === true ? "shadow-sm fixed top-0 left-0 z-10 w-full" : null
        }`}
      >
        <div className="header hidden 800px:block 800px:bg-[#1774BB] p-4">
          <div className={`flex justify-between items-center text-white`}>
            <div className="flex flex-col items-center">
              <img
                src="https://cijm.org.gr/wp-content/uploads/2021/08/cijm-logo-symbol.png"
                alt=""
                className="w-[80px] h-80px] object-cover"
              />
              <span className=" text-[12px] italic pt-1">FunOlympics</span>
            </div>
            <div className="800px:flex justify-around hidden items-center gap-8">
              <NavLink
                to={"/"}
                className={`${
                  active === 1
                    ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                    : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                }`}
                onClick={() => setActive(1)}
              >
                Home
              </NavLink>
              <NavLink
                className={`${
                  active === 2
                    ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                    : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                }`}
                onClick={handleEvent}
              >
                Live Event
              </NavLink>
              <NavLink
                to={"/about"}
                className={`${
                  active === 3
                    ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                    : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                }`}
                onClick={() => setActive(3)}
              >
                About Event
              </NavLink>
              {phoneUser && (
                <>
                  <NavLink
                    to={"/fixtures"}
                    className={`${
                      active === 4
                        ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                        : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                    }`}
                    onClick={() => setActive(4)}
                  >
                    Fixtures
                  </NavLink>
                  <NavLink
                    to={"/gallery"}
                    className={`${
                      active === 5
                        ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                        : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                    }`}
                    onClick={() => setActive(5)}
                  >
                    Gallery
                  </NavLink>
                  <NavLink
                    to={"/video"}
                    className={`${
                      active === 6
                        ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                        : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                    }`}
                    onClick={() => setActive(6)}
                  >
                    Videos
                  </NavLink>
                </>
              )}
              {userData?.role === "admin" && (
                <NavLink
                  to={"/dashboard"}
                  className={`${
                    active === 7
                      ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                      : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                  }`}
                  onClick={() => setActive(7)}
                >
                  Dashboard
                </NavLink>
              )}
              {userData || phoneUser ? (
                <Button onClick={handleLogout} variant="contained">
                  Logout
                </Button>
              ) : (
                <Button onClick={() => navigate("/login")} variant="contained">
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
        {/* mobile navbar */}
        <div className="w-full h-[60px] fixed z-50 bg-blue-700 top-0 left-0 shadow-sm 800px:hidden">
          <div className="flex items-center w-full justify-between px-2">
            <div className="flex flex-col items-center pt-2">
              <img
                src="https://cijm.org.gr/wp-content/uploads/2021/08/cijm-logo-symbol.png"
                alt=""
                className="w-[80px] h-80px] object-cover"
              />
              <span className=" text-[10px] text-white italic">
                FunOlympics
              </span>
            </div>
            <div className="">
              <BiMenuAltLeft
                size={40}
                className="ml-1 mt-2"
                onClick={() => setMobile(true)}
                color="white"
              />
            </div>
          </div>
          {/* toggle hamburger menu */}
          {mobile && (
            <div
              className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
            >
              <div className="fixed w-[80%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-end flex pr-3">
                  <RxCross1
                    size={30}
                    className="ml-4 mt-5"
                    onClick={() => setMobile(false)}
                  />
                </div>
                <div className="flex flex-col 800px:hidden space-y-12 text-center mt-5 px-4">
                  <NavLink
                    to={"/"}
                    className={`${
                      active === 1
                        ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                        : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                    }`}
                    onClick={() => {
                      setActive(1);
                      setMobile(false);
                    }}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={`${
                      active === 2
                        ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                        : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                    }`}
                    onClick={handleEvent}
                  >
                    Live Event
                  </NavLink>
                  <NavLink
                    to={"/about"}
                    className={`${
                      active === 3
                        ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                        : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                    }`}
                    onClick={() => {
                      setActive(3);
                      setMobile(false);
                    }}
                  >
                    About Event
                  </NavLink>
                  {phoneUser && (
                    <>
                      <NavLink
                        to={"/fixtures"}
                        className={`${
                          active === 4
                            ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                            : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                        }`}
                        onClick={() => {
                          setActive(4);
                          setMobile(false);
                        }}
                      >
                        Fixtures
                      </NavLink>
                      <NavLink
                        to={"/gallery"}
                        className={`${
                          active === 5
                            ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                            : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                        }`}
                        onClick={() => {
                          setActive(5);
                          setMobile(false);
                        }}
                      >
                        Gallery
                      </NavLink>
                      <NavLink
                        to={"/video"}
                        className={`${
                          active === 6
                            ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                            : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                        }`}
                        onClick={() => {
                          setActive(6);
                          setMobile(false);
                        }}
                      >
                        Videos
                      </NavLink>
                    </>
                  )}
                  {userData?.role === "admin" && (
                    <NavLink
                      to={"/dashboard"}
                      className={`${
                        active === 7
                          ? "bg-gray-400 px-2 py-1 rounded-[4px] font-Roboto font-[700]"
                          : "font-Poppins font-[600] tracking-wide hover:border-b-2 hover:text-red-600"
                      }`}
                      onClick={() => {
                        setActive(7);
                        setMobile(false);
                      }}
                    >
                      Dashboard
                    </NavLink>
                  )}
                  {userData || phoneUser ? (
                    <Button onClick={handleLogout} variant="contained">
                      Logout
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate("/login");
                        setMobile(false);
                      }}
                      variant="contained"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
