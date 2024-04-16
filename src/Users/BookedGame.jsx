/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styles from "../components/styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookedGame = () => {
  const [amount, setAmount] = useState(1);
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

  const sumOfOddOdds = bookedGames.reduce((accumulator, currentValue) => {
    const oddValue = parseFloat(currentValue.matchOdd);
    if (oddValue % 2 !== 0) {
      // Check if odd
      return accumulator + oddValue;
    }
    return accumulator;
  }, 0);
  let total = sumOfOddOdds * amount;

  const handleClick = () => {
    localStorage.removeItem("bookedGames");
    total = "";
    toast.success("You have successfully place a bet.");
    navigate("/");
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
      field: "matchOdd",
      headerName: "Match Odd",
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
      matchOdd: item?.matchOdd,
    })) || [];
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        {bookedGames.length === 0 ? (
          <div className="mt-20 h-[60vh]">
            <h2 className="text-center text-2xl font-[700]">
              You haven't booked yet.. Kindly go to fixtures to book games
            </h2>
          </div>
        ) : (
          <>
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
              <div className="button flex justify-end space-x-3 mt-5 mr-2">
                <div className="text-sm ">
                  <label htmlFor="" className="block ml-1">
                    Amount
                  </label>
                  <select
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={1} className="block pb-2">
                      Select amount to use bet
                    </option>
                    <option value={100} className="block pb-2">
                      100
                    </option>
                    <option value={200} className="block pb-2">
                      200
                    </option>
                    <option value={500} className="block pb-2">
                      500
                    </option>
                    <option value={1000} className="block pb-2">
                      1000
                    </option>
                  </select>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Place bet &pound;{total.toFixed(2)}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default BookedGame;
