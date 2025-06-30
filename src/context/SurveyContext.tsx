import { nanoid } from "nanoid";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";
import { type Question, QuestionType, type SurveyState } from "../types/survey";

type UpdateMetadataAction = {
  type: "updateMetadata";
  payload: { title?: string; description?: string };
};

type AddQuestionAction = {
  type: "addQuestion";
  payload: { type: QuestionType; text?: string };
};

type DeleteQuestionAction = {
  type: "deleteQuestion";
  payload: { questionId: string };
};

type UpdateQuestionAction = {
  type: "updateQuestion";
  payload: { questionId: string; text: string; type?: QuestionType };
};

type DuplicateQuestionAction = {
  type: "duplicateQuestion";
  payload: { questionId: string };
};

type ReorderQuestionsAction = {
  type: "reorderQuestions";
  payload: { fromIndex: number; toIndex: number };
};

type AddOptionAction = {
  type: "addOption";
  payload: { questionId: string };
};

type UpdateOptionAction = {
  type: "updateOption";
  payload: { questionId: string; optionId: string; text: string };
};

type DeleteOptionAction = {
  type: "deleteOption";
  payload: { questionId: string; optionId: string };
};

type ReorderOptionsAction = {
  type: "reorderOptions";
  payload: { questionId: string; fromIndex: number; toIndex: number };
};

type ResetSurveyAction = { type: "reset" };

type ResetWithIdAction = { type: "resetWithId"; payload: { id: string } };

type RestoreSurveyAction = {
  type: "restoreSurvey";
  payload: SurveyState;
};

type SurveyAction =
  | UpdateMetadataAction
  | AddQuestionAction
  | DeleteQuestionAction
  | UpdateQuestionAction
  | DuplicateQuestionAction
  | ReorderQuestionsAction
  | AddOptionAction
  | UpdateOptionAction
  | DeleteOptionAction
  | ReorderOptionsAction
  | ResetSurveyAction
  | ResetWithIdAction
  | RestoreSurveyAction;

const initialSurveyState: SurveyState = {
  id: "",
  title: "",
  description: "",
  questions: [],
  createdAt: new Date().toISOString(),
};

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case "updateMetadata":
      return {
        ...state,
        ...action.payload,
      };

    case "addQuestion": {
      const newQuestion: Question = {
        id: nanoid(),
        type: action.payload.type,
        text: action.payload.text ?? "",
        options:
          action.payload.type === "TEXT_INPUT"
            ? []
            : [
                {
                  id: nanoid(),
                  text: "",
                },
              ],
      };
      return {
        ...state,
        questions: [...state.questions, newQuestion],
      };
    }

    case "deleteQuestion":
      return {
        ...state,
        questions: state.questions.filter(
          (q) => q.id !== action.payload.questionId,
        ),
      };

    case "updateQuestion": {
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== action.payload.questionId) return q;
          if (!action.payload.type || action.payload.type === q.type) {
            return { ...q, text: action.payload.text };
          }
          if (action.payload.type === QuestionType.TEXT_INPUT) {
            return {
              ...q,
              text: action.payload.text,
              type: action.payload.type,
              options: [],
            };
          }
          if (
            action.payload.type === QuestionType.SINGLE_CHOICE ||
            action.payload.type === QuestionType.MULTIPLE_CHOICE
          ) {
            return {
              ...q,
              text: action.payload.text,
              type: action.payload.type,
              options:
                q.options.length > 0
                  ? q.options
                  : [
                      {
                        id: nanoid(),
                        text: "",
                      },
                    ],
            };
          }
          return { ...q, text: action.payload.text, type: action.payload.type };
        }),
      };
    }

    case "duplicateQuestion": {
      const idx = state.questions.findIndex(
        (q) => q.id === action.payload.questionId,
      );
      if (idx === -1) return state;
      const original = state.questions[idx];
      const copiedOptions = original.options.map((opt) => ({
        ...opt,
        id: nanoid(),
      }));
      const duplicated: Question = {
        ...original,
        id: nanoid(),
        options: copiedOptions,
      };
      const newQuestions = [...state.questions];
      newQuestions.splice(idx + 1, 0, duplicated);
      return {
        ...state,
        questions: newQuestions,
      };
    }

    case "reorderQuestions": {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex < 0 ||
        fromIndex >= state.questions.length ||
        toIndex < 0 ||
        toIndex >= state.questions.length
      ) {
        return state;
      }
      const questions = [...state.questions];
      const [moved] = questions.splice(fromIndex, 1);
      questions.splice(toIndex, 0, moved);
      return {
        ...state,
        questions,
      };
    }

    case "addOption": {
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.questionId
            ? {
                ...q,
                options: [
                  ...q.options,
                  {
                    id: nanoid(),
                    text: "",
                  },
                ],
              }
            : q,
        ),
      };
    }

    case "updateOption": {
      const { questionId, optionId, text } = action.payload;
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                options: q.options.map((opt) =>
                  opt.id === optionId ? { ...opt, text } : opt,
                ),
              }
            : q,
        ),
      };
    }

    case "deleteOption": {
      const { questionId, optionId } = action.payload;
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                options: q.options.filter((opt) => opt.id !== optionId),
              }
            : q,
        ),
      };
    }
    case "reorderOptions": {
      const { questionId, fromIndex, toIndex } = action.payload;
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== questionId) return q;
          const options = [...q.options];
          const [moved] = options.splice(fromIndex, 1);
          options.splice(toIndex, 0, moved);
          return { ...q, options };
        }),
      };
    }
    case "reset":
      return {
        ...initialSurveyState,
        id: nanoid(),
      };
    case "resetWithId":
      return {
        ...initialSurveyState,
        id: action.payload.id,
      };
    case "restoreSurvey":
      return action.payload;
    default:
      return state;
  }
}

const SurveyStateContext = createContext<SurveyState | undefined>(undefined);
const SurveyDispatchContext = createContext<Dispatch<SurveyAction> | undefined>(
  undefined,
);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(surveyReducer, {
    ...initialSurveyState,
    id: nanoid(),
    createdAt: new Date().toISOString(),
  });

  return (
    <SurveyStateContext.Provider value={state}>
      <SurveyDispatchContext.Provider value={dispatch}>
        {children}
      </SurveyDispatchContext.Provider>
    </SurveyStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSurveyState() {
  const context = useContext(SurveyStateContext);
  if (context === undefined) {
    throw new Error("useSurveyState must be used within a SurveyProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSurveyDispatch() {
  const context = useContext(SurveyDispatchContext);
  if (context === undefined) {
    throw new Error("useSurveyDispatch must be used within a SurveyProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function submitSurvey(
  state: SurveyState,
): Promise<{ success: boolean; data: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    data: JSON.stringify(state),
  };
}
