import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SurveyPreview from "../../components/SurveyPreview";
import { useSurveyState, useSurveyDispatch } from "../../context/SurveyContext";

const Step3Preview: React.FC = () => {
  const surveyState = useSurveyState();
  const dispatch = useSurveyDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      // Load existing survey data from localStorage
      const saved = localStorage.getItem(`survey-${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "restoreSurvey",
          payload: parsed,
        });
      } else {
        dispatch({ type: "reset" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    localStorage.setItem(
      `survey-${surveyState.id}`,
      JSON.stringify(surveyState),
    );
  }, [surveyState]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-lg p-8 border border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-blue-700">
            Survey Preview
          </h2>
        </div>
        <SurveyPreview survey={surveyState} />
      </div>
    </div>
  );
};

export default Step3Preview;
