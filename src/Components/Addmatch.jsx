import React from 'react'
import { useState  , useEffect} from 'react'

function Addmatch() {
    const [newmatch, setNewMatch] = useState({
        team1:"",
        team2:"",
        date:null,
        venue:""
    })
  const [teams , setTeams] = useState([])
  
    useEffect(() => {
        fetch('http://localhost:4000/teams')
        .then((res)=>res.json())
        .then((data)=>setTeams(data))
    }, [])
    async function handleSubmit(){
        try {
            const rawResponse = await fetch('http://localhost:4000/matches', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newmatch)
              });
            console.log(rawResponse)
        } catch (error) {
             console.log(error)
        }
       
    }
  return (
    <div>  
        <div className='form-group  container'>
        <input type="date"  className='form-control'value={newmatch.date} onChange={(e)=>setNewMatch({...newmatch , date:e.target.value})} />
        <input type="text" placeholder='SELECT MATCH VENUE' className='form-control'value={newmatch.venue}  onChange={(e)=>setNewMatch({...newmatch , venue:e.target.value})}/>
        
        <select className='form-control' onChange={(e)=>setNewMatch({...newmatch , team1:e.target.value})}>
            <option value={null} selected disabled> select team1</option>
            {
              teams && teams.map((teams , i)=>{
               return <option key={i} disabled={newmatch.team2===teams.teamname} value={teams.teamname}>{teams.teamname}</option>
              }) 
            }

        </select>
        
        <select className='form-control'  onChange={(e)=>setNewMatch({...newmatch , team2:e.target.value})}>
            <option value={null} selected disabled> select team2</option>
            {
              teams && teams.map((teams , i)=>{
               return <option key ={i} disabled={newmatch.team1===teams.teamname}  value={teams.teamname}>{teams.teamname}</option>
              }) 
            }

        </select>
        <button className='btn btn-dark d-block' onClick={handleSubmit}>Add match</button>
        </div>
    </div>
  )
}

export default Addmatch