import React, { useEffect } from "react";
import { useSurveyState } from "../../context/SurveyContext";
import SurveyPreview from "../../components/SurveyPreview";

const Step4Preview: React.FC = () => {
  const surveyState = useSurveyState();

  useEffect(() => {
    localStorage.setItem("survey-builder-state", JSON.stringify(surveyState));
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

export default Step4Preview;
