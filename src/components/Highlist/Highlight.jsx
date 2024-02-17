import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import Button from "@mui/material/Button";
import { partner } from "../Datas/banner";
import { db } from "../../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Highlight = () => {
  const { phoneUser } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const userDocREf = query(
    collection(db, "videos"),
    orderBy("timestamp", "desc")
  );

  const getFunc = async () => {
    onSnapshot(userDocREf, (snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    getFunc();
  }, []);

  const data = post?.slice(0, 3);

  return (
    <React.Fragment>
      <div className={`${styles.section} mt-10 mb-10`}>
        <h2 className={`${styles.heading} pb-3`}>Highlight</h2>
        <div className="grid grid-cols-1 800px:grid-cols-3 gap-6 800px:ml-0 ml-8">
          {data?.map((item) => {
            return (
              <div className="" key={item.id}>
                <video className="w-[300px] !h-64" controls>
                  <source
                    src={item?.videoUrl}
                    className="object-cover w-full rounded-[1px]"
                  />
                </video>
              </div>
            );
          })}
        </div>
        <div className="py-4">
          <Link to={`${phoneUser ? "/video" : "/login"}`}>
            <Button variant="outlined">Watch Highlight</Button>
          </Link>
        </div>

        <div className="partner mt-14">
          <h4 className={`${styles.heading} capitalize italic`}>
            Payris Funolympic partners
          </h4>
          <div className="flex justify-between items-center">
            {partner.map((data) => {
              return (
                <div className="" key={data.id}>
                  <img src={data.image} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Highlight;
