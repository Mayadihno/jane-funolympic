/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sportss } from "../components/Datas/banner";
const Fixture = () => {
  const { userData } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [sport, setSport] = useState("");
  const [admin, setAdmin] = useState(false);
  const [categories, setCategories] = useState("");
  const [bookedGames, setBookedGames] = useState(
    JSON.parse(localStorage.getItem("bookedGames")) || []
  );
  const navigate = useNavigate();

  const userDocREf = query(collection(db, "fixtures"), orderBy("time", "asc"));
  const getFunc = async () => {
    onSnapshot(userDocREf, (snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ ...doc?.data(), id: doc.id })));
    });
  };
  const getCategories = async () => {
    if (sport !== "") {
      const collectionRef = collection(db, "fixtures");
      const q = query(
        collectionRef,
        where("sport", "==", sport),
        orderBy("id", "desc")
      );
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((doc) => doc.data());
      setCategories(queryData);
    }
  };
  const handleBooking = (id) => {
    const gameDate = new Date(id.date);
    // Check if the game is in the past
    if (gameDate < new Date()) {
      toast.error("You can't book this game as it's in the past.");
    } else {
      // Check if the game is already booked
      const bookedGames = JSON.parse(localStorage.getItem("bookedGames")) || [];
      if (bookedGames.some((game) => game.id === id.id)) {
        toast.warning("You have already booked this game.");
      } else {
        // Proceed with booking logic
        console.log("Game can be booked.");
        const updatedBookedGames = [...bookedGames, id];
        localStorage.setItem("bookedGames", JSON.stringify(updatedBookedGames));
        setBookedGames(updatedBookedGames);

        toast.success("Game successfully booked.");
      }
    }
  };

  useEffect(() => {
    getFunc();
    getCategories();
    if (userData?.role === "admin") {
      setAdmin(true);
    }
  }, [userData?.role, sport]);
  const handleDelete = async (PostId) => {
    try {
      await deleteDoc(doc(db, "fixtures", PostId));
      const updatePost = post.filter((post) => post.id !== PostId);
      setPost(updatePost);
      toast.success("Successfully deleted the Post");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteButtonColumn = {
    field: " ",
    flex: 0,
    minWidth: 80,
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
  };
  const columns = [
    { field: "id", headerName: "Fixture ID", minWidth: 50, flex: 0.7 },

    {
      field: "date",
      headerName: "Date",
      type: "number",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "matchFixtures",
      headerName: "Match",
      minWidth: 90,
      flex: 0.7,
    },

    {
      field: "sport",
      headerName: "Sport",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "time",
      headerName: "Time",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Book Game",
      flex: 0.1,
      minWidth: 100,
      headerName: "Book Game",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBooking(params.row)}
          >
            Book
          </Button>
        );
      },
    },
  ];
  if (admin) {
    columns.push(deleteButtonColumn);
  }
  const isCategoriesAvailable = categories && categories.length > 0;

  // Ensure rows is always defined, even if it's an empty array
  // Define rows based on categories availability
  const rows = isCategoriesAvailable
    ? categories?.map((item) => ({
        id: item?.id,
        sport: item?.sport,
        date: item?.date,
        matchFixtures: item?.matchFixtures,
        time: item?.time,
      }))
    : post?.map((item) => ({
        id: item?.id,
        sport: item?.sport,
        date: item?.date,
        matchFixtures: item?.matchFixtures,
        time: item?.time,
      })) || [];

  return (
    <React.Fragment>
      <div
        className={`800px:w-11/12 800px:mx-auto 800px:my-20 my-20 w-full px-0.5 h-[70vh]`}
      >
        <h2 className="text-center text-[20px] font-[700] mb-2">
          Payris Funolympics Fixtures
        </h2>
        <div className="800px:flex 800px:justify-end flex justify-between items-center">
          <form>
            <div className="w-full mt-1">
              <label htmlFor="" className="block mb-1">
                Preferred Sport
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full border h-[40px] rounded-[5px]"
              >
                <option value="" className="block pb-2">
                  Choose your sport fixture
                </option>
                {sportss &&
                  sportss.map((item) => (
                    <option
                      className="block pb-2"
                      value={item.sport}
                      key={item.id}
                    >
                      {item.sport}
                    </option>
                  ))}
              </select>
              <div className="800px:flex 800px:justify-end 800px:mt-1 mt-2">
                <Button
                  onClick={() => {
                    setCategories("");
                    setSport("");
                  }}
                  variant="contained"
                  color="primary"
                >
                  See all Fixtures
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full pt-1 bg-white mb-10 mt-2 h-[300px] overflow-y-scroll">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            rowHeight={50}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Fixture;
