import React, { useEffect } from 'react'

const Timer = ({timerRemaining, setTimerRemaining, setLoadingState,SubmitQuizToApi,studentScore}) => {

    const mins = Math.floor(timerRemaining/60);
    const secs = timerRemaining % 60;

    // useEffect(function(){
    //     const id = setInterval(function(){
    //         setTimerRemaining(curr => curr - 1)
    //     }, 1000);
    //     return () => clearInterval(id);
    // }, []);

    // if (timerRemaining === 0){
    //     setLoadingState("finished")
    //     SubmitQuizToApi(studentScore)
    // }

    useEffect(() => {
        if (timerRemaining <= 0) {
            setLoadingState("finished");
            SubmitQuizToApi(studentScore);
            return;
        }
    
        const id = setInterval(() => {
            setTimerRemaining((curr) => curr - 1);
        }, 1000);
    
        return () => clearInterval(id);
    }, [timerRemaining]);
    



  return (
    <div className='timer'>
        {mins < 10 && "0"}
        {mins}:{secs < 10 && "0"}
        {secs}
    </div>
  )
}

export default Timer
