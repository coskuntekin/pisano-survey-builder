export const QuestionType = {
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  TEXT_INPUT: "TEXT_INPUT",
} as const;
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: QuestionOption[];
}

export interface SurveyState {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}
