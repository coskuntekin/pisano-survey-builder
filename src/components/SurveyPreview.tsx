import React, { useState } from "react";
import type { SurveyState, Question } from "../types/survey";
import { submitSurvey } from "../context/SurveyContext";
import { useNavigate } from "react-router-dom";

interface SurveyPreviewProps {
  survey: SurveyState;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ survey }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const result = await submitSurvey(survey);
      if (result.success) {
        setSuccess("Survey submitted successfully!");
        setTimeout(() => {
          navigate("/app/dashboard");
        }, 1000);
      } else {
        setError("Submission failed.");
      }
    } catch (e) {
      console.error(e);
      setError("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 p-6 rounded-lg bg-blue-50 border border-blue-100">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          {survey.title || "Untitled Survey"}
        </h2>
        <p className="mb-4 text-gray-600 text-base">{survey.description}</p>
      </div>
      <div className="space-y-8">
        {survey.questions.length === 0 && (
          <div className="text-gray-400 italic">No questions added yet.</div>
        )}
        {survey.questions.map((question, idx) => (
          <QuestionRenderer key={question.id} question={question} index={idx} />
        ))}
      </div>
      <div className="mt-10 justify-between flex items-start">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center gap-2"
          onClick={() => navigate(-1)}
          type="button"
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
          className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Survey"}
        </button>
      </div>
      <div className="mt-4 flex justify-center w-full">
        {success && (
          <small className="text-green-600 font-medium">{success}</small>
        )}
        {error && <small className="text-red-600 font-medium">{error}</small>}
      </div>
    </div>
  );
};

const QuestionRenderer: React.FC<{ question: Question; index: number }> = ({
  question,
  index,
}) => {
  return (
    <div className="border rounded-lg p-5 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-bold">
          Q{index + 1}
        </span>
        <span className="font-medium text-lg">
          {question.text || (
            <small className="italic text-gray-400">Untitled Question</small>
          )}
        </span>
      </div>
      <div className="mb-2 text-sm text-gray-600">
        <span className="font-semibold">Type:</span>{" "}
        {question.type
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      </div>
      {question.type !== "TEXT_INPUT" && (
        <div className="ml-4">
          <div className="font-semibold text-xs text-gray-500 mb-1">
            Answers:
          </div>
          {question.options.length === 0 ? (
            <div className="italic text-gray-400">No answers defined.</div>
          ) : (
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {question.options.map((opt) => (
                <li key={opt.id} className="py-0.5">
                  {opt.text || (
                    <span className="italic text-gray-400">
                      Untitled Answer
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {question.type === "TEXT_INPUT" && (
        <div className="ml-4 text-gray-400 italic text-sm">
          [Text input answer]
        </div>
      )}
    </div>
  );
};

export default SurveyPreview;
