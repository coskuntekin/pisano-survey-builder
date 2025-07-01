import React, { Fragment } from "react";
import { useSurveyDispatch } from "../context/SurveyContext";
import type { Question } from "../types/survey";
import AnswerCard from "./AnswerCard";

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  const dispatch = useSurveyDispatch();

  return (
    <Fragment>
      <h3 className="mb-2 font-semibold">Answers</h3>
      {questions.length === 0 ? (
        <div className="text-gray-500">No answers added yet.</div>
      ) : (
        questions.map((question) => (
          <AnswerCard
            key={question.id}
            question={question}
            questionCount={questions.length}
            onChangeText={(text) =>
              dispatch({
                type: "updateQuestion",
                payload: { questionId: question.id, text },
              })
            }
            onDuplicate={() =>
              dispatch({
                type: "duplicateQuestion",
                payload: { questionId: question.id },
              })
            }
            onDelete={() =>
              dispatch({
                type: "deleteQuestion",
                payload: { questionId: question.id },
              })
            }
          />
        ))
      )}
    </Fragment>
  );
};

export default QuestionList;
