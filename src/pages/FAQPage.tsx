import React from 'react';
import Question from "../components/FAQ/Question";
import CenterDiv from "../components/UI/CenterDiv";

const questions = [
  {
    question: "Why does this app exist?",
    answer: "During my las job search I found it difficult to keep track of all the applications I was sending out. The spreadsheet I was using just wouldn't cut it. A fellow dev offered an obvious solution - \"Write our own app to do it\". So, here it is.",
  },
  {
    question: "How do I use this app?",
    answer: "Simply sign up, log in, and start adding applications. You can add as many as you want, and update them as you go through the application process.",
  },
  {
    question: "How much does it cost?",
    answer: "It's free! I'm building this to help myself and others. I'm not looking to make money from it. Besides, if you're looking for a job, chances are you don't have much money to spare. That linkedIn premium subscription isn't going to pay for itself.",
  },
  {
    question: "Can I contribute?",
    answer: "Yes! The code is open source and available on GitHub. Feel free to submit a pull request with any changes you'd like to see.",
  },
  {
    question: "How is my data being used?",
    answer: "Your data is stored in a database and is only accessible to you. I'm not doing anything with it other than displaying it back to you. If I get bored, I might build some stats on it (like average applications sent out before you land a job, or whatever).",
  },
  {
    question: "Why does the app look like crap?",
    answer: "I'm a developer, not a designer. I'm working on it, but it's not a priority right now. If you're a designer and want to help out, please get in touch",
  }

]

export default function FAQPage(){
  return (
    <CenterDiv>
      <div className={"max-w-3xl"}>
        <h1 className={"text-2xl font-semibold my-4"}>Frequently Asked Questions</h1>
        {questions.map((q, i) => (
          <Question question={q.question} answer={q.answer} key={i} />
        ))}

      </div>
    </CenterDiv>
  )
}