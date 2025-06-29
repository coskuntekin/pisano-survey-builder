import React, { useEffect } from "react";
import { useSurveyState } from "../../context/SurveyContext";
import SurveyPreview from "../../components/SurveyPreview";

const Step4Preview: React.FC = () => {
  const surveyState = useSurveyState();

  useEffect(() => {
    localStorage.setItem("survey-builder-state", JSON.stringify(surveyState));
  }, [surveyState]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-3xl bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Preview Survey</h2>
        <SurveyPreview survey={surveyState} />
      </div>
    </div>
  );
};

export default Step4Preview;
