import React from 'react'
import { useState } from 'react'

function Addplayer() {

    const [newPlayer , setNewPlayer] = useState({
        fullname:"",
        dob:"",
        battingStyle:"",
        bowlingStyle:""
    })
 
    function handleChange(event){
            setNewPlayer({...newPlayer,[event.target.name]:event.target.value})
    }
    
    async function handleSubmit(){
        try {
            const rawResponse = await fetch('http://localhost:4000/players', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayer)
              });
        } catch (error) {
             console.log(error)
        }
       
    }
  return (
    <div>
        <h1>Add Player Details</h1>
        <div className='container'>
             <input type="text" placeholder='fullname' className='form-control mt-3' name="fullname" onChange={handleChange} />
             <input type="Date" placeholder='Date-of-birth' className='form-control mt-3' name="dob" onChange={handleChange}/>
             <input type="text" placeholder='battingstyle' className='form-control mt-3' name="battingStyle" onChange={handleChange}/>
             <input type="text" placeholder='bowlingstyle' className='form-control mt-3' name="bowlingStyle" onChange={handleChange}/>
            <button className='btn btn-primary mt-3' onClick={handleSubmit}> Add</button>
        </div>
    </div>
  )
}

export default Addplayer