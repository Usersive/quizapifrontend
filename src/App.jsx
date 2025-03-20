import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import api from '../api';
import Question from './components/Question';
import ButtonNext from './components/ButtonNext';
import Main from './components/Main';
import FinishedScreen from './components/FinishedScreen';
import Progress from './components/Progress';
import Footer from './components/Footer';
import Timer from './components/Timer';

const App = ()=> {
  
  const [loadingState, setLoadingState ] = useState("loading")
  const [error, setError] = useState(null)
  const [questions, setQuestions] = useState([])
  const numQuestions = questions.length;
  const [matricNum, setMatricNum] = useState("")
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [studentScore, setStudentScore] = useState(0)
  const [timerRemaining, setTimerRemaining] = useState (null)

  // const secondsPerQuestion = 10;
  
  // const scorePerQuestion = 2

  const [secondsPerQuestion, setSecondsPerQuestion] = useState(10)
  const [scorePerQuestion, setScorePerQuestion] = useState(1)

  const quizTotalScore = numQuestions * scorePerQuestion




  useEffect(() => {
    api.get("quiz_settings/")
    .then(res => {
        setSecondsPerQuestion(res.data.seconds_per_question);
        setScorePerQuestion(res.data.score_per_question);  // Update state
    })
    .catch(err => {
        console.log(err.message);
        setError(err.message);
    });
}, []);


  function getQuestion(){
    // const numQuestions = 2;
    // api
    // .get('questions?num_question=${numQuestions}')
    api.get(`questions?num_question=${numQuestions}`)

    .then((res) => {
      setQuestions(res.data);

    })
    .catch((err)=> {
      console.log(err.message)
    });

  }



  function reloadPage(){
    setLoadingState("finished")
    getQuestion()
    SubmitQuizToApi(studentScore)
  }

  function SubmitQuizToApi(updatedScore){
    const studentQuiz ={
      matricNum : localStorage.getItem("matricNum"), 
      score: updatedScore,
    };
    api.post("submit_quiz/", studentQuiz)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.message))
  };

  useEffect(function(){
    if (localStorage.getItem("matricNum")){
      return reloadPage()
    }
      api.get("questions")
      .then(res =>{
        console.log(res.data)
        setQuestions(res.data)
        setLoadingState("ready")
      })
      .catch(err=>{
        console.log(err.message)
        setError(err.message)
      })
  },[])




 // warning not to reload the page or refresh the browser
 useEffect(() => {
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ""; // Required for some browsers to display the warning
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);














  return (
    <div className='app'>
      <Header />
      {/* <h3>Score : {studentScore}</h3> */}
      <Main>
        { loadingState === "loading" && <Loader />}
        {error && <Error error={error} />}

        {loadingState === "ready" && (

          <StartScreen 
                matricNum={matricNum} 
                setMatricNum={setMatricNum}
                numQuestions={numQuestions} 
                setLoadingState ={setLoadingState}
                setTimerRemaining={setTimerRemaining}
                secondsPerQuestion={secondsPerQuestion}
            />)}

        {loadingState === "active" && (
            <>
              <Progress 
                numQuestions={numQuestions}
                questionIndex={questionIndex}
                matricNum={matricNum}
              />
              <Question 
                selectedOption ={selectedOption}
                setSelectedOption={setSelectedOption}
                question={questions[questionIndex]}
                setCorrectOption ={setCorrectOption}
                
              />
              <Footer>
                <Timer
                timerRemaining ={timerRemaining}
                setTimerRemaining ={setTimerRemaining}
                setLoadingState={setLoadingState}
                SubmitQuizToApi={SubmitQuizToApi}
                studentScore={studentScore}
                />

                <ButtonNext 
                selectedOption={selectedOption}
                setQuestionIndex ={setQuestionIndex}
                setSelectedOption={setSelectedOption}
                numQuestions={numQuestions}
                questionIndex={questionIndex}
                correctOption={correctOption}
                setStudentScore={setStudentScore}
                setLoadingState={setLoadingState}
                SubmitQuizToApi={SubmitQuizToApi}

                scorePerQuestion={scorePerQuestion}
              />
              </Footer>

             
            </> 
            )}
        {loadingState === "finished" && (
          <FinishedScreen 
            quizTotalScore ={quizTotalScore}
            studentScore ={studentScore}
            matricNum ={matricNum}
            setLoadingState ={setLoadingState}
            setQuestionIndex={setQuestionIndex}
            setSelectedOption={setSelectedOption}
            setCorrectOption={setCorrectOption}
            setStudentScore={setStudentScore}
            setMatricNum={setMatricNum}
          />
          )}
      </Main>
      <p className='donot'>Once you start do not refresh else you will loose you score.</p>
      <div className='footer-add'><p>&copy; 2025 HOREN TECH HUB</p></div>
    </div>
  )
}

export default App
