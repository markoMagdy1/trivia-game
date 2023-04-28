import React, { useState, useEffect } from "react";
import {  Form, Button } from "react-bootstrap";
import { fetchQuestion } from "./api";
import { Question } from "../models/question";
import { FaCheck, FaTimes } from "react-icons/fa";


export default function TriviaGame() {

    const [question, setQuestion] = useState<Question | null>(null);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState<boolean | null>(null);
  
    useEffect(() => {
      loadQuestion();
    }, []);
  //===============> Get questions and answers from this API
    async function loadQuestion() {
      const question = await fetchQuestion();
      setQuestion(question);
      setAnswer("");
      setResult(null);
    }
  //===============>on Submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (question) {
        setResult(answer === question.correct_answer);
        loadQuestion();
      }
    };
  

    return (
        <div className=" d-flex justify-content-center my-5 ">
          {question && (
            <div className="alert alert-secondary col-sm-10 col-md-6 ">
              <h4 className="mb-4 text-success"> category : {question.category}</h4>
              <h4>{question.question}</h4>
              <Form onSubmit={handleSubmit} className="my-2">
                  <Form.Control
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                <div className="d-flex justify-content-center">
                <Button type="submit"  className="m-3 col-2 btn btn-success">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    loadQuestion();
                  }}
                  className="m-3 btn btn-danger col-2"
                >
                  Skip
                </Button>
                </div>
                {result !== null && (
                  <>
                    {result ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                    <span
                      className={
                        result ? "text-success mx-2" : "text-danger mx-2"
                      }
                    >
                      {result ? "Correct!" : "Incorrect!"}
                    </span>
                  </>
                )}
              </Form>
            </div>
          )}
        </div>  
    );
}





