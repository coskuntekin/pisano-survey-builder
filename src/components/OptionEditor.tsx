import React from "react";
import type { QuestionOption } from "../types/survey";

interface OptionEditorProps {
  questionId: string;
  options: QuestionOption[];
  onAddOption?: () => void;
  onUpdateOption?: (optionId: string, text: string) => void;
  onDeleteOption?: (optionId: string) => void;
}

const OptionEditor: React.FC<OptionEditorProps> = ({
  options,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}) => {
  return (
    <div className="p-4 bg-gray-50 rounded shadow space-y-2">
      <h4 className="font-semibold mb-2">Options</h4>
      <ul className="space-y-2">
        {options.map((option) => (
          <li key={option.id} className="flex items-center gap-2">
            <input
              type="text"
              value={option.text}
              placeholder="Option text"
              className="border px-2 py-1 rounded flex-1"
              onChange={(e) =>
                onUpdateOption && onUpdateOption(option.id, e.target.value)
              }
            />
            <button
              type="button"
              className="text-red-500 hover:text-red-700 px-2"
              onClick={() => onDeleteOption && onDeleteOption(option.id)}
              aria-label="Delete option"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onAddOption}
      >
        Add Option
      </button>
    </div>
  );
};

export default OptionEditor;
