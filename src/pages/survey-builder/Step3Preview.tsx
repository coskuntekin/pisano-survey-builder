import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SurveyPreview from "../../components/SurveyPreview";
import { useSurveyDispatch, useSurveyState } from "../../context/SurveyContext";

const Step3Preview: React.FC = () => {
  const surveyState = useSurveyState();
  const dispatch = useSurveyDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem(`survey-${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "restoreSurvey",
          payload: parsed,
        });
      } else if (surveyState.id !== id) {
        dispatch({ type: "resetWithId", payload: { id } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, surveyState.id]);

  const saveSurveyToLocalStorage = () => {
    const surveyWithTimestamp = {
      ...surveyState,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(
      `survey-${surveyState.id}`,
      JSON.stringify(surveyWithTimestamp),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-2xl rounded-lg bg-white">
        <SurveyPreview survey={surveyState} onSave={saveSurveyToLocalStorage} />
      </div>
    </div>
  );
};

export default Step3Preview;
