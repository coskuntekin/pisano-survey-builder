import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { QuestionOption } from "../types/survey";

interface SortableOptionProps {
  option: QuestionOption;
  idx: number;
  onChange: (text: string) => void;
  onDelete: () => void;
  disabled: boolean;
}

const SortableOption: React.FC<SortableOptionProps> = ({
  option,
  idx,
  onChange,
  onDelete,
  disabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 mb-1">
      <div {...attributes} {...listeners} className="cursor-grab px-2 text-gray-400 hover:text-gray-700" aria-label="Drag to reorder option">
        <span>::</span>
      </div>
      <input
        type="text"
        className="border rounded px-2 py-1 flex-1"
        placeholder={`Option ${idx + 1}`}
        value={option.text}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
        onClick={onDelete}
        disabled={disabled}
        title={disabled ? "At least one option required" : "Delete option"}
      >
        Delete
      </button>
    </div>
  );
};

export default SortableOption;
