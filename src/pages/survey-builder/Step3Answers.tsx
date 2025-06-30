import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AnswerList from "../../components/AnswerList";
import { useSurveyState } from "../../context/SurveyContext";

const Step3Answers: React.FC = () => {
  const survey = useSurveyState();
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    localStorage.setItem("survey-builder-state", JSON.stringify(survey));
  }, [survey]);

  const handlePrev = () => {
    setCurrentIdx((idx) => Math.max(0, idx - 1));
  };

  const handleNext = () => {
    if (currentIdx < survey.questions.length - 1) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      navigate("/app/survey-builder/step-4");
    }
  };

  const currentQuestion = survey.questions[currentIdx];

  return (
    <Fragment>
      <h2 className="text-2xl font-bold mb-4">Step 3: Add Answers</h2>
      <p className="mb-6 text-gray-700">
        For each question, add possible answers and select the answer type
        (e.g., single choice, multiple choice, text).
      </p>
      {survey.questions.length === 0 ? (
        <div className="text-gray-400 italic">No questions added yet.</div>
      ) : (
        <Fragment>
          <div className="rounded p-4 bg-gray-50 relative">
            <div className="font-medium mb-2 flex items-center gap-2">
              {currentIdx + 1}.{" "}
              {currentQuestion.text && currentQuestion.text.trim() !== "" ? (
                currentQuestion.text
              ) : (
                <span className="italic text-gray-400">Untitled Question</span>
              )}
            </div>
            <AnswerList questions={[currentQuestion]} />
          </div>
        </Fragment>
      )}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center gap-2"
          onClick={() => {
            if (currentIdx === 0) {
              navigate("/app/survey-builder/step-2");
            } else {
              handlePrev();
            }
          }}
          disabled={survey.questions.length === 0}
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
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          onClick={handleNext}
          disabled={survey.questions.length === 0}
        >
          {currentIdx === survey.questions.length - 1
            ? "Next (Preview)"
            : "Next"}
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
    </Fragment>
  );
};

export default Step3Answers;
