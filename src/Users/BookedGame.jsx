import React from "react";
import styles from "../components/styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookedGame = () => {
  const bookedGames = JSON.parse(localStorage.getItem("bookedGames")) || [];
  const navigate = useNavigate();
  const handleRemove = (game) => {
    const gameId = game.id;
    // Retrieve the array of games from localStorage
    const storedGames = JSON.parse(localStorage.getItem("bookedGames")) || [];
    // Find the index of the game with the matching id
    const gameIndex = storedGames.findIndex(
      (storedGame) => storedGame.id === gameId
    );

    if (gameIndex !== -1) {
      // Remove the game from the array
      storedGames.splice(gameIndex, 1);
      // Update localStorage with the modified array
      localStorage.setItem("bookedGames", JSON.stringify(storedGames));
      toast.success("Game successfully removed.");
      navigate("/fixtures");
    } else {
      console.log("Game not found in localStorage.");
    }
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
            onClick={() => handleRemove(params.row)}
          >
            Remove
          </Button>
        );
      },
    },
  ];

  const rows =
    bookedGames?.map((item) => ({
      id: item?.id,
      sport: item?.sport,
      date: item?.date,
      matchFixtures: item?.matchFixtures,
      time: item?.time,
    })) || [];
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        <div className="flex justify-center items-center">
          <h2 className={`${styles.heading}`}>Your Booked Games</h2>
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

export default BookedGame;
