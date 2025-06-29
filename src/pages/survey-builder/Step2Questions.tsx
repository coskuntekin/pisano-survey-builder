import React, { useState, useEffect } from "react";
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col items-center py-8">
        <div className="w-full max-w-3xl bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Step 2: Add Questions</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <textarea
                className="w-full border rounded p-2 mb-2"
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
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => navigate("../step-1")}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={
                  newQuestionText.trim() === "" &&
                  surveyState.questions.length === 0
                }
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Step2Questions;
