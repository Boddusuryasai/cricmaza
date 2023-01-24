import { useState , useEffect } from "react"
import React  from 'react'

function Matches() {

 const [matches, setMatches] = useState([])

 useEffect(() => {
        fetch("http://localhost:4000/matches")
        .then((res)=>{
           return  res.json()
        }
        ).then((data)=>{
       setMatches(data)
        })
 }, [])
 

  return (
    <div>
         <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Team1</th>
      <th scope="col">Team2</th>
      <th scope="col">Venue</th>
      <th scope="col">Match Date</th>
    </tr>
  </thead>
  <tbody>
    { matches && matches.map((match )=>{
          return   (<tr key={match.id}>
                  <td>{match.team1}</td>
                  <td>{match.team2}</td>
                  <td>{match.date}</td>
                  <td>{match.venue}</td>
                </tr>)
    })
    
}
      
  </tbody>
</table>
    </div>
  )
}

export default Matches