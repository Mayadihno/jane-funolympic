import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <div className=" bg-[#1774BB] w-full h-[100px] text-center">
        <div className=" flex items-center justify-center pt-6">
          <img
            src="https://cijm.org.gr/wp-content/uploads/2021/08/cijm-logo-symbol.png"
            alt=""
            className="w-[80px] h-80px] object-cover"
          />
        </div>
        <h4 className="text-white font-[600] 800px:text-[16px] text-[13px]">
          TM © 2024 – Payris Funolympic Committee – All Rights Reserved.
        </h4>
      </div>
    </React.Fragment>
  );
};

export default Footer;
