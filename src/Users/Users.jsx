/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
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

  const handleAddAsAdmin = async (id) => {
    console.log(id.uid);
    try {
      if (id.role === "user") {
        // Update the role to 'admin'
        id.role = "admin";
        // Update the user's data in Firestore
        await setDoc(doc(db, "users", id.id), id);
        toast.success("User role updated to admin successfully.");
      } else {
        // User is already an admin
        toast.info("User is already an admin.");
      }
      console.log(id);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role. Please try again.");
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
      field: "role",
      headerName: "Role",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " Add as admin",
      flex: 1,
      minWidth: 100,
      headerName: "Add as admin",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddAsAdmin(params.row)}
            >
              Add
            </Button>
          </>
        );
      },
    },

    {
      field: " ",
      flex: 1,
      minWidth: 100,
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
    role: item?.role,
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
