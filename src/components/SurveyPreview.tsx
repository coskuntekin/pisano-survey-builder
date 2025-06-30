import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitSurvey } from "../context/SurveyContext";
import type { Question, SurveyState } from "../types/survey";

interface SurveyPreviewProps {
  survey: SurveyState;
  onSave?: () => void;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ survey, onSave }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (onSave) {
        onSave();
      }
      const result = await submitSurvey(survey);
      if (result.success) {
        console.log("Survey submitted successfully");
      } else {
        console.error("Something went wrong");
      }
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/app/dashboard");
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
          className="px-6 py-2 bg-blue-600 flex items-center gap-x-1.5 text-white rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <Fragment>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 animate-spin"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"
                  fill="currentColor"
                />
              </svg>
              Submitting...
            </Fragment>
          ) : (
            "Submit Survey"
          )}
        </button>
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
