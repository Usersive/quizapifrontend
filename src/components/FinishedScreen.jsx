import React from 'react'

const FinishedScreen = ({
    quizTotalScore,
    studentScore, 
    setLoadingState,
    setQuestionIndex,
    setSelectedOption,
    setCorrectOption,
    setStudentScore,
    setMatricNum
}) => {
    
    const percentage =(studentScore/quizTotalScore) * 100
    const matricNum =localStorage.getItem("matricNum")

    function restartQuiz(){
        setLoadingState("ready")
        setQuestionIndex(0)
        setCorrectOption(null)
        setSelectedOption(null)
        setStudentScore(0)
        setMatricNum(null)
        localStorage.removeItem("matricNum")

    }

  return (
    <>
      <p className="result">
        <span> Hi </span> 
        <span style={{ textTransform: "uppercase" }}>{matricNum}</span>, you
        scored <strong>{studentScore}</strong> out of {quizTotalScore} ({percentage}%)
      </p>
      <p className="highscore">(HighScore: {studentScore} points)</p>

      <button className=" btn btn-ui" onClick={restartQuiz} >Restart Quiz</button>
    </>
  )
}

export default FinishedScreen

