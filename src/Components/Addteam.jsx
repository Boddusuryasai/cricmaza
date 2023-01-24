import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Addteam() {
  const [newteam, setNewTeam] = useState({
    teamname: "",
    teamowner: "",
    players: [],
  });
  const [players, setPlayers] = useState([]);
  

  function handleChange(event) {
    setNewTeam({ ...newteam, [event.target.name]: event.target.value });
  }

  async function addTeam(){
    try {
        console.log(newteam);
         await fetch('http://localhost:4000/Teams', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newteam)
          });
        
    } catch (error) {
         console.log(error)
    }
   
}

  function handleSelectClick(i) {
    setNewTeam({...newteam,  players:[...newteam.players , players[i] ]});
    console.log(players[i] , newteam)
    let temp = [...players];
    temp.splice(i, 1);
    setPlayers([...temp]);
  }
  function handleRemoveClick(i) {
    let temp = [...newteam.players];
    let removedPlayer = temp.splice(i, 1);
    setNewTeam({...newteam , players:[...temp]});
    setPlayers([...players, removedPlayer[0]]);
  }
  useEffect(() => {
    fetch("http://localhost:4000/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div>
      <div className="container">
        <input
          type="text"
          placeholder="teamname"
          className="form-control mt-3"
          name="teamname"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="teamowner"
          className="form-control mt-3"
          name="teamowner"
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-wrap w">
        <div className="w-50">
          {players &&
            players.map((player, i) => {
              return (
                <li key={i}>
                  {player.fullname}
                  <button
                    className="btn btn-success m-2"
                    onClick={() => handleSelectClick(i)}
                  >
                    select
                  </button>
                </li>
              );
            })}
        </div>
        <div className="w-50">
          <h3 className="mt-3">Selected Players {" "} <span> <button className='btn btn-primary mt-3' onClick={addTeam}> Add Team</button></span></h3>
          {newteam?.players &&
           newteam?.players?.map((e, i) => {
              return (
                <li key={i}>
                  {e.fullname}{" "}
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => handleRemoveClick(i)}
                  >
                    remove
                  </button>
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Addteam;
