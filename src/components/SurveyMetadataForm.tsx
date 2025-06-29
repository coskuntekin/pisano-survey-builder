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
        <span className="font-semibold mb-1">Survey Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter survey title"
          className="border px-3 py-2 rounded"
          disabled={disabled}
        />
      </label>
      <label className="flex flex-col">
        <span className="font-semibold mb-1">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter survey description"
          className="border px-3 py-2 rounded resize-y min-h-[60px]"
          disabled={disabled}
        />
      </label>
      {showNext && (
        <button
          type="submit"
          className={`self-end px-4 py-2 rounded text-white ${canProceed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!canProceed}
        >
          Next
        </button>
      )}
    </form>
  );
};

export default SurveyMetadataForm;
