import React from 'react'

const ButtonNext = ({
    selectedOption, 
    setQuestionIndex, 
    setSelectedOption, 
    numQuestions, 
    questionIndex,
    setStudentScore,
    correctOption,
    setLoadingState,
    SubmitQuizToApi,

    scorePerQuestion
                
     }) => {

    if (selectedOption === null) return null

    function NextQuestion(){
        setQuestionIndex((curr) => curr + 1)
        if (selectedOption === correctOption){
            setStudentScore(curr => curr + scorePerQuestion)
        }
        setSelectedOption(null)
    }
    function SubmitQuiz(){
        setLoadingState("finished")
        if (selectedOption === correctOption){
            setStudentScore(curr => {
                const updatedScore = curr + scorePerQuestion
                SubmitQuizToApi(updatedScore)
                return updatedScore
            })
        }
        
    }

    if (questionIndex === numQuestions - 1)
        return (
            <button className='btn btn-ui' onClick={SubmitQuiz} >
                Submit
            </button>
          )


  return (
    <button className='btn btn-ui' onClick={NextQuestion}>
        Next
    </button>
  )
}

export default ButtonNext


