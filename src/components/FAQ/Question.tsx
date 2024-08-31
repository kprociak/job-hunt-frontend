import React from 'react';

interface QuestionProps {
  question: string;
  answer: string;
}

export default function Question({question, answer}: QuestionProps){
  return (
    <div className={"py-3"}>
      <h2 className={"text-lg font-semibold"}>{question}</h2>
      <p>{answer}</p>
    </div>
  )
}