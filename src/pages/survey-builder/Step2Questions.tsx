import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSurveyDispatch, useSurveyState } from "../../context/SurveyContext";
import { QuestionType } from "../../types/survey";

const Step2Questions: React.FC = () => {
  const surveyState = useSurveyState();
  const dispatch = useSurveyDispatch();
  const navigate = useNavigate();

  const [newQuestionText, setNewQuestionText] = useState("");

  useEffect(() => {
    localStorage.setItem("survey-builder-state", JSON.stringify(surveyState));
  }, [surveyState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestionText.trim() === "") {
      return;
    }
    dispatch({
      type: "addQuestion",
      payload: { type: QuestionType.TEXT_INPUT, text: newQuestionText },
    });
    setNewQuestionText("");
    navigate("../step-3");
  };

  return (
    <Fragment>
      <h2 className="text-2xl font-bold mb-4">Step 2: Add Questions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <textarea
            className="w-full border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 mb-2 outline-none"
            placeholder="Type your question here..."
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            rows={2}
            required
            aria-required="true"
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 flex items-center gap-x-2 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => navigate("../step-1")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 flex items-center gap-x-2 text-white rounded hover:bg-blue-700"
            disabled={
              newQuestionText.trim() === "" &&
              surveyState.questions.length === 0
            }
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Step2Questions;
