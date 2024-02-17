import React, { useState } from "react";
import styles from "../components/styles/styles";
import Button from "@mui/material/Button";
import Local from "./Type/Local";
import International from "./Type/International";
import Admin from "./Type/Admin";

const Login = () => {
  const [active, setActive] = useState(false);

  return (
    <React.Fragment>
      <div className={`${styles.section} my-[139px] `}>
        <div className="flex justify-center items-center h-[60vh] 800px:h-[50vh] 800px:m-10">
          <div className="bg-white shadow-md 800px:w-1/2 w-full">
            <h2 className="text-[20px] font-[600] font-Poppins text-center p-3 mb-3">
              How do you want to signin?
            </h2>
            <div className="button flex 800px:justify-between flex-col space-y-5 800px:space-x-0 items-center px-3 pb-14">
              <Button onClick={() => setActive(1)} variant="outlined">
                Local User Login
              </Button>
              <Button onClick={() => setActive(2)} variant="outlined">
                International User Login
              </Button>
              <Button onClick={() => setActive(3)} variant="outlined">
                Admin Login
              </Button>
            </div>
          </div>
        </div>
        {active === 1 && <Local setActive={setActive} />}
        {active === 2 && <International setActive={setActive} />}
        {active === 3 && <Admin setActive={setActive} />}
      </div>
    </React.Fragment>
  );
};

export default Login;
