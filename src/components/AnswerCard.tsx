import React from "react";
import type { Question } from "../types/survey";
import { QuestionType } from "../types/survey";
import { useSurveyDispatch } from "../context/SurveyContext";
import SortableOption from "./SortableOption";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface AnswerCardProps {
  question: Question;
  onChangeText?: (text: string) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
  questionCount?: number;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  question,
  onDelete,
  children,
  questionCount = 1,
}) => {
  const dispatch = useSurveyDispatch();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    dispatch({
      type: "updateQuestion",
      payload: { questionId: question.id, text: question.text, type: newType },
    });
    if (newType === QuestionType.TEXT_INPUT) {
      console.log("Removing options");
    } else if (
      (newType === QuestionType.SINGLE_CHOICE ||
        newType === QuestionType.MULTIPLE_CHOICE) &&
      question.options.length === 0
    ) {
      dispatch({
        type: "addOption",
        payload: { questionId: question.id },
      });
    }
  };

  const handleAddOption = () => {
    dispatch({
      type: "addOption",
      payload: { questionId: question.id },
    });
  };

  const handleOptionTextChange = (optionId: string, text: string) => {
    dispatch({
      type: "updateOption",
      payload: { questionId: question.id, optionId, text },
    });
  };

  const handleDeleteOption = (optionId: string) => {
    dispatch({
      type: "deleteOption",
      payload: { questionId: question.id, optionId },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const fromIndex = question.options.findIndex((o) => o.id === active.id);
      const toIndex = question.options.findIndex((o) => o.id === over?.id);
      if (fromIndex !== -1 && toIndex !== -1) {
        dispatch({
          type: "reorderOptions",
          payload: { questionId: question.id, fromIndex, toIndex },
        });
      }
    }
  };

  return (
    <div className="rounded p-4 mb-4 bg-white shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor={`type-${question.id}`} className="text-sm font-medium">
          Answer Type:
        </label>
        <select
          id={`type-${question.id}`}
          className="border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 outline-none"
          value={question.type}
          onChange={handleTypeChange}
        >
          <option value={QuestionType.SINGLE_CHOICE}>Single Choice</option>
          <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
          <option value={QuestionType.TEXT_INPUT}>Text Input</option>
        </select>
      </div>

      <div className="mt-2">
        {(question.type === QuestionType.SINGLE_CHOICE ||
          question.type === QuestionType.MULTIPLE_CHOICE) && (
          <div>
            <div className="mb-2 font-semibold text-sm flex items-center gap-2">
              Options:
            </div>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleOptionDragEnd}
            >
              <SortableContext
                items={question.options.map((o) => o.id)}
                strategy={verticalListSortingStrategy}
              >
                {question.options.map((option, idx) => (
                  <SortableOption
                    key={option.id}
                    option={option}
                    idx={idx}
                    onChange={(text) => handleOptionTextChange(option.id, text)}
                    onDelete={() => handleDeleteOption(option.id)}
                    disabled={question.options.length <= 1}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <button
              type="button"
              className="mt-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>
        )}
        {question.type === QuestionType.TEXT_INPUT && (
          <div>
            <div className="mb-2 font-semibold text-sm">
              Text Answer Preview:
            </div>
            <textarea
              className="w-full border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 min-h-[48px] bg-gray-50 outline-none"
              placeholder="User will enter their answer here"
              disabled
              value=""
            />
          </div>
        )}
      </div>

      <div>{children}</div>

      <div className="flex gap-2 mt-2">
        {questionCount > 1 && (
          <button
            type="button"
            className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
