import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSurveyDispatch, useSurveyState } from "../../context/SurveyContext";
import { QuestionType, type Question } from "../../types/survey";

const SortableQuestionCard: React.FC<{
  question: Question;
  index: number;
  onUpdate: (questionId: string, text: string, type?: QuestionType) => void;
  onDuplicate: (questionId: string) => void;
  onDelete: (questionId: string) => void;
  onAddOption: (questionId: string) => void;
  onUpdateOption: (questionId: string, optionId: string, text: string) => void;
  onDeleteOption: (questionId: string, optionId: string) => void;
}> = ({
  question,
  index,
  onUpdate,
  onDuplicate,
  onDelete,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [questionText, setQuestionText] = useState(question.text);
  const [questionType, setQuestionType] = useState(question.type);

  const handleQuestionUpdate = () => {
    onUpdate(question.id, questionText, questionType);
  };

  const handleTypeChange = (newType: QuestionType) => {
    setQuestionType(newType);
    onUpdate(question.id, questionText, newType);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <p className="font-medium text-gray-700">Question {index + 1}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onDuplicate(question.id)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Duplicate question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(question.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded p-2 outline-none resize-none"
          placeholder="Enter your question..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          onBlur={handleQuestionUpdate}
          rows={2}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Answer Type
        </label>
        <select
          value={questionType}
          onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        >
          <option value={QuestionType.SINGLE_CHOICE}>Single Choice</option>
          <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
          <option value={QuestionType.TEXT_INPUT}>Text Input</option>
        </select>
      </div>

      {(questionType === QuestionType.SINGLE_CHOICE ||
        questionType === QuestionType.MULTIPLE_CHOICE) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Answer Options
            </label>
            <button
              onClick={() => onAddOption(question.id)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Option
            </button>
          </div>
          {question.options.map((option, optionIndex) => (
            <div key={option.id} className="flex items-center gap-2">
              <div className="flex items-center">
                {questionType === QuestionType.SINGLE_CHOICE ? (
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                )}
              </div>
              <input
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option.text}
                onChange={(e) =>
                  onUpdateOption(question.id, option.id, e.target.value)
                }
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
              />
              {question.options.length > 1 && (
                <button
                  onClick={() => onDeleteOption(question.id, option.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {questionType === QuestionType.TEXT_INPUT && (
        <div className="border border-gray-200 rounded p-3 bg-gray-50">
          <input
            type="text"
            placeholder="Text input field (preview)"
            disabled
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          />
        </div>
      )}
    </div>
  );
};

const Step2QuestionsAnswers: React.FC = () => {
  const surveyState = useSurveyState();
  const dispatch = useSurveyDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setIsNextEnabled(surveyState.questions.length > 0);
  }, [surveyState.questions.length]);

  const handleAddQuestion = () => {
    dispatch({
      type: "addQuestion",
      payload: { type: QuestionType.SINGLE_CHOICE, text: "" },
    });
  };

  const handleUpdateQuestion = (
    questionId: string,
    text: string,
    type?: QuestionType
  ) => {
    dispatch({
      type: "updateQuestion",
      payload: { questionId, text, type },
    });
  };

  const handleDuplicateQuestion = (questionId: string) => {
    dispatch({
      type: "duplicateQuestion",
      payload: { questionId },
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    dispatch({
      type: "deleteQuestion",
      payload: { questionId },
    });
  };

  const handleAddOption = (questionId: string) => {
    dispatch({
      type: "addOption",
      payload: { questionId },
    });
  };

  const handleUpdateOption = (
    questionId: string,
    optionId: string,
    text: string
  ) => {
    dispatch({
      type: "updateOption",
      payload: { questionId, optionId, text },
    });
  };

  const handleDeleteOption = (questionId: string, optionId: string) => {
    dispatch({
      type: "deleteOption",
      payload: { questionId, optionId },
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = surveyState.questions.findIndex(
        (q) => q.id === active.id
      );
      const newIndex = surveyState.questions.findIndex(
        (q) => q.id === over?.id
      );

      dispatch({
        type: "reorderQuestions",
        payload: { fromIndex: oldIndex, toIndex: newIndex },
      });
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Step 2: Create Questions & Answers
          </h2>
          <p className="text-gray-600 mt-1">
            Add questions and configure their answer options
          </p>
        </div>
        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Question
        </button>
      </div>

      {surveyState.questions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto mb-4 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-lg">No questions yet</p>
          <p className="text-sm">Click "Add Question" to get started</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={surveyState.questions.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            {surveyState.questions.map((question, index) => (
              <SortableQuestionCard
                key={question.id}
                question={question}
                index={index}
                onUpdate={handleUpdateQuestion}
                onDuplicate={handleDuplicateQuestion}
                onDelete={handleDeleteQuestion}
                onAddOption={handleAddOption}
                onUpdateOption={handleUpdateOption}
                onDeleteOption={handleDeleteOption}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Question
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center gap-2"
          onClick={() => navigate(`../step-1/${id}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
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
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 ${
            isNextEnabled ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
          onClick={() => navigate(`../step-3/${id}`)}
          disabled={!isNextEnabled}
        >
          Next (Preview)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </Fragment>
  );
};

export default Step2QuestionsAnswers;
