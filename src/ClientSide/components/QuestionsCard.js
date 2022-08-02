import React from 'react'
import '../App.css'
import Progress_bar from './Progress_bar'


const QuestionsCard = ({currentQuestion,questions,choiceClick}) => {
  return (
    <div>
        <Progress_bar bgcolor="lightblue" progress={(currentQuestion / 10) * 100} height="30"/>
        <div className="question-card">
          {questions.length > 0 ? <h3 className="question-text">{questions[currentQuestion].word} is a\an ......</h3> : <h3>nothing to show</h3>}

          <ul>
            <li onClick={(event) => choiceClick("noun",event)} key={1}>Noun</li>
            <li onClick={(event) => choiceClick("verb",event)} key={2}>Verb</li>
            <li onClick={(event) => choiceClick('adverb',event)} key={3}>Adverb</li>
            <li onClick={(event) => choiceClick('adjective',event)} key={4}>Adjective</li>
          </ul>
        </div>
    </div>
  )
}

export default QuestionsCard
