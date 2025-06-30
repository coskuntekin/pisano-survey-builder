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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 mb-1"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab px-2 text-gray-400 hover:text-gray-700"
        aria-label="Drag to reorder option"
      >
        <span>::</span>
      </div>
      <input
        type="text"
        className="border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 flex-1 outline-none"
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default SortableOption;
