import React from "react";
import { useSurveyState, useSurveyDispatch } from "../context/SurveyContext";

interface SurveyMetadataFormProps {
  disabled?: boolean;
  showNext?: boolean;
  onNext?: () => void;
}

const SurveyMetadataForm: React.FC<SurveyMetadataFormProps> = ({
  disabled = false,
  showNext = false,
  onNext,
}) => {
  const survey = useSurveyState();
  const dispatch = useSurveyDispatch();

  const [title, setTitle] = React.useState(survey.title);
  const [description, setDescription] = React.useState(survey.description);

  React.useEffect(() => {
    setTitle(survey.title);
    setDescription(survey.description);
  }, [survey.title, survey.description]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (title !== survey.title || description !== survey.description) {
        dispatch({
          type: "updateMetadata",
          payload: { title, description },
        });
      }
    }, 300);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description]);

  const canProceed = title.trim().length > 0 && description.trim().length > 0;

  return (
    <form
      className="flex flex-col gap-4 mb-6"
      aria-label="Survey Metadata"
      onSubmit={(e) => {
        e.preventDefault();
        if (onNext && canProceed) onNext();
      }}
    >
      <label className="flex flex-col">
        <small className="font-semibold mb-1">Survey Title</small>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter survey title"
          className="border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded outline-none"
          disabled={disabled}
        />
      </label>
      <label className="flex flex-col">
        <small className="font-semibold mb-1">Description</small>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter survey description"
          className="border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded resize-y min-h-[60px] outline-none"
          disabled={disabled}
        />
      </label>
      {showNext && (
        <button
          type="submit"
          className={`self-end bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white flex items-center gap-2 ${
            canProceed ? "cursor-pointer" : " cursor-not-allowed"
          }`}
          disabled={!canProceed}
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
      )}
    </form>
  );
};

export default SurveyMetadataForm;
