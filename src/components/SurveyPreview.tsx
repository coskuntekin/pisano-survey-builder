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
      <h2 className="text-2xl font-bold mb-2">
        Title:{" "}
        {survey.title || "Untitled Survey"}
      </h2>
      <p className="mb-6 text-gray-600">
        Description:{" "}
        {survey.description}</p>
      <div className="space-y-8">
        {survey.questions.length === 0 && (
          <div className="text-gray-400 italic">No questions added yet.</div>
        )}
        {survey.questions.map((question, idx) => (
          <QuestionRenderer key={question.id} question={question} index={idx} />
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start gap-2">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {success && <span className="text-green-600">{success}</span>}
        {error && <span className="text-red-600">{error}</span>}
      </div>
    </div>
  );
};

const QuestionRenderer: React.FC<{ question: Question; index: number }> = ({
  question,
}) => {
  return (
    <div className="border rounded p-4 bg-gray-50">
      <div className="font-medium mb-2">
        Question:{" "}
        {question.text || (
          <small className="italic text-gray-400">Untitled Question</small>
        )}
      </div>
      <div className="mb-2 text-sm text-gray-600">
        Answer:{" "}
        <br />
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
                <li key={opt.id}>
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
