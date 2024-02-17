/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { db } from "../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "../components/styles/styles";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

const Video = () => {
  const { userData } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userDocREf = query(
    collection(db, "videos"),
    orderBy("timestamp", "desc")
  );

  const getFunc = async () => {
    onSnapshot(userDocREf, (snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(true);
    });
  };

  const handleDelete = async (PostId) => {
    try {
      await deleteDoc(doc(db, "videos", PostId));
      const updatePost = post?.filter((post) => post.id !== PostId);
      setPost(updatePost);
      toast.success("Successfully deleted the Post");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFunc();
    if (userData?.role === "admin") {
      setAdmin(true);
    }
  }, [userData?.role]);

  return (
    <React.Fragment>
      <div className={`${styles.section} mb-10`}>
        <h2 className=" text-[25px] text-center font-[700] py-5 800px:mt-1 mt-12 font-Poppins">
          Payris Funolympic highlights
        </h2>
        {!loading && <Loader text={"Please wait, component is loading"} />}
        <div className="grid 800px:grid-cols-4 grid-cols-1 gap-4">
          {post?.map((item) => {
            return (
              <div className="bg-white shadow-lg p-1" key={item.id}>
                <div className="w-full">
                  <video width="540" height="330" controls>
                    <source
                      src={item?.videoUrl}
                      className="object-cover w-full h-[400px] rounded-[1px]"
                    />
                  </video>
                  <div className="bg-[#000000a6] flex justify-between items-center w-full p-4">
                    <h4 className="text-[13px] text-white">{item?.desc}</h4>
                    {admin && (
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(item.id)}
                        color="primary"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Video;
