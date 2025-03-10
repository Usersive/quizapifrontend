import React, { useState } from 'react'
import api from '../../api'
import Error from './Error'


const StartScreen =({numQuestions, matricNum, setMatricNum, setLoadingState, setTimerRemaining, secondsPerQuestion})=> {
    const studentMatricNum ={matricNum:matricNum }
    const [error, setError] = useState(null);

    function submitMatricNum (){
        api.post("has_taken_quiz/", studentMatricNum)
        .then((res) =>{
            console.log(res.data);
            setLoadingState("active")
            localStorage.setItem("matricNum", matricNum)
            setTimerRemaining(secondsPerQuestion * numQuestions)
        })
        .catch((err) =>{
            setError(err.response.data.error);
        });
        
    }


  return (

    <div className='start'>
        {/* <h2>Welcome to React Quiz</h2> */}
        <h3>{numQuestions} questions to test your React mastery</h3>
        {error && <Error error= {error} />}
        <input placeholder ="Your Matric No."
            className="btn btn-ui" style={{ marginBottom: "20px", textTransform: "uppercase"}} 
            value={matricNum}
            onChange={(e) => setMatricNum(e.target.value)}
        />
        <button 
            className="btn btn-ui" 
            onClick={submitMatricNum} 
            disabled={matricNum===""}> Let's start
            </button>
    </div>



  )
}

export default StartScreen;
