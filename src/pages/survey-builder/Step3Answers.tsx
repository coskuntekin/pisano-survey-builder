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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-8">
      <h2 className="text-2xl font-bold mb-4">Step 3: Add Answers</h2>
      <p className="mb-6 text-gray-700">
        For each question, add possible answers and select the answer type (e.g.,
        single choice, multiple choice, text).
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
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={handlePrev}
          disabled={currentIdx === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleNext}
          disabled={survey.questions.length === 0}
        >
          {currentIdx === survey.questions.length - 1
            ? "Next (Preview)"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Step3Answers;
