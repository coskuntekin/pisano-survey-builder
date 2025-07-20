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
      <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-6">
        <h2 className="mb-2 text-2xl font-bold text-blue-700">
          Title: {survey.title || "Untitled Survey"}
        </h2>
        <p className="mb-4 text-base text-gray-600">
          Description: {survey.description}
        </p>
      </div>
      <div className="space-y-8">
        {survey.questions.length === 0 && (
          <div className="text-gray-400 italic">No questions added yet.</div>
        )}
        {survey.questions.map((question, idx) => (
          <QuestionRenderer key={question.id} question={question} index={idx} />
        ))}
      </div>
      <div className="mt-10 flex items-start justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
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
          className="flex items-center gap-x-1.5 rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
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
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-2 flex items-center gap-2">
        <small className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          Q{index + 1}
        </small>
        <p className="text-lg font-medium">
          {question.text || (
            <small className="text-gray-400 italic">Untitled Question</small>
          )}
        </p>
      </div>
      <div className="mb-2 text-sm text-gray-600">
        <small className="font-semibold">Type:</small>{" "}
        {question.type
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      </div>
      {question.type !== "TEXT_INPUT" && (
        <div className="ml-4">
          <p className="mb-1 text-xs font-semibold text-gray-500">Answers:</p>
          {question.options.length === 0 ? (
            <div className="text-gray-400 italic">No answers defined.</div>
          ) : (
            <ul className="list-inside list-disc text-sm text-gray-700">
              {question.options.map((opt) => (
                <li key={opt.id} className="py-0.5">
                  {opt.text || (
                    <small className="text-gray-400 italic">
                      Untitled Answer
                    </small>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {question.type === "TEXT_INPUT" && (
        <small className="ml-4 text-sm text-gray-400 italic">
          [Text input answer]
        </small>
      )}
    </div>
  );
};

export default SurveyPreview;
