import React, { useEffect } from "react";
import SurveyMetadataForm from "../../components/SurveyMetadataForm";
import { useSurveyState } from "../../context/SurveyContext";
import { useNavigate } from "react-router-dom";

const Step1Metadata: React.FC = () => {
  const surveyState = useSurveyState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("survey-builder-state", JSON.stringify(surveyState));
  }, [surveyState]);

  const canProceed =
    surveyState.title.trim().length > 0 &&
    surveyState.description.trim().length > 0;

  const handleNext = () => {
    if (canProceed) {
      navigate("/app/survey-builder/step-2");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col items-center py-8">
        <div className="w-full max-w-3xl bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Survey Details</h2>
          <SurveyMetadataForm
            disabled={false}
            showNext={true}
            onNext={handleNext}
          />
        </div>
      </main>
    </div>
  );
};

export default Step1Metadata;
