import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Results = ({score,resetGame}) => {
    
    const [rank,setRank] = useState(''); 
    const scorePercentage = (score/10)*100;
   /* useEffect function will be called when the component appears. */
    useEffect(()=>{ 
        /* post request to the server with score percentage to get the rank  */
        axios.post('http://localhost:8000/',{scorePercentage})
        .then(response=>{
            setRank(response.data);
            console.log(response.data); 
        })
         
    },[])

  return (
    <div className="final-results">
      <h1>Final Results</h1>
      <h2>{score} out of 10 are correct</h2>
      <h2>Your Rank is {rank}%</h2>
      <button onClick={resetGame}>Try Again</button>
     </div>
  )
}




export default Results