import React, {useEffect, useState} from "react"
import "./App.css"
import Results from './components/Results'
import QuestionsCard from "./components/QuestionsCard"

function App() {
  //states 
  const [score,setScore] = useState(0); 
  const [currentQuestion,setCurrentQuestion] = useState(0); 
  const [finalResults,setFinalResults] = useState(false); 
  const [questions,setQuestions] = useState([]); 

  //getting data from server 
  const fetchData = async()=>{
    const result = await fetch('http://localhost:8000/'); 
    const jsonResult = await result.json(); 
    setQuestions(jsonResult); 
  }
/* fetching data from server when the page load */
  useEffect(()=>{
      fetchData();
  },[]); 

  //check if the answer is correct or not
  const choiceClick = (pos,eve) =>{
    let ele = eve.target; 
  
    if(pos===questions[currentQuestion].pos){
      setScore(score+1);
      ele.style.border = '5px solid green'; 
    }
    else{
      ele.style.border = '5px solid red'; 
    }
    /* this function will be called after 0.5 seconds from showing if the answer is correct or not. */
    setTimeout(()=>{
      ele.style.border ='3px solid white';
      if(currentQuestion+1 < questions.length){ 
      setCurrentQuestion(currentQuestion+1); 
      }
      else{
        setFinalResults(true); 
      }
    },500) 
  }

  //reset the game by clicking try again. 
  const resetGame = ()=>{
      setFinalResults(false); 
      setScore(0); 
      setCurrentQuestion(0); 
      fetchData();
  }

  return (
    <div className="App">
      {/* Header Section */}
     <h1>Words Quiz</h1>
      {finalResults ? 
      // check if the game is over, if it is show Results component. 
      <Results score ={score} resetGame={resetGame}/> : 
      // if the game is not over change the question. 
       <QuestionsCard currentQuestion={currentQuestion} questions={questions} choiceClick={choiceClick}/>
      }
    </div>
  );
}




export default App;
