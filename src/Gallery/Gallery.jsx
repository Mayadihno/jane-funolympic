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
const Gallery = () => {
  const { userData } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userDocREf = query(
    collection(db, "images"),
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
      await deleteDoc(doc(db, "images", PostId));
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
        <h3 className=" text-[25px] text-center font-[700] py-5 font-Poppins 800px:mt-1 mt-12">
          Payris Funolympic images
        </h3>
        {!loading && <Loader text={"Please wait, component is loading"} />}
        <div className="grid 800px:grid-cols-4 grid-cols-1 gap-4">
          {post?.map((item) => {
            return (
              <div className="bg-white shadow-md" key={item.id}>
                <div className="aspect-w-1 aspect-h-1 relative">
                  <img
                    src={item?.imageUrl}
                    alt=""
                    className="object-cover w-full h-[400px] rounded-[1px]"
                  />
                  <div className="absolute bg-[#000000a6] flex justify-between items-center bottom-0 w-full p-4">
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

export default Gallery;
