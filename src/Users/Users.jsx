/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  const collectionRef = collection(db, "users");
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getDocs(collectionRef);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (PostId) => {
    try {
      await deleteDoc(doc(db, "users", PostId));
      const updatePost = post.filter((post) => post.id !== PostId);
      setPost(updatePost);
      toast.success("Successfully deleted the Post");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "fullName",
      headerName: "Full Name",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "country",
      headerName: "Country",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "sport",
      headerName: "Sport",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  const rows = data.map((item) => ({
    id: `${item.id}`, // Combine Firestore id with row index for uniqueness
    sport: item?.sport,
    email: item?.email,
    fullName: item?.fullName,
    phone: item?.phone || item?.phoneNumber,
    country: item?.country,
  }));
  return (
    <React.Fragment>
      <div className="w-full pt-1 bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </React.Fragment>
  );
};

export default Users;
