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
      className="mb-6 flex flex-col gap-4"
      aria-label="Survey Metadata"
      onSubmit={(e) => {
        e.preventDefault();
        if (onNext && canProceed) onNext();
      }}
    >
      <label className="flex flex-col">
        <small className="mb-1 font-semibold">Survey Title</small>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter survey title"
          className="rounded border border-gray-400 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          disabled={disabled}
        />
      </label>
      <label className="flex flex-col">
        <small className="mb-1 font-semibold">Description</small>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter survey description"
          className="min-h-[60px] resize-y rounded border border-gray-400 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          disabled={disabled}
        />
      </label>
      {showNext && (
        <button
          type="submit"
          className={`flex items-center gap-2 self-end rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${
            canProceed ? "cursor-pointer" : "cursor-not-allowed"
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
