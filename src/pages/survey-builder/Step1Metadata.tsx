import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SurveyMetadataForm from "../../components/SurveyMetadataForm";
import { useSurveyState } from "../../context/SurveyContext";

const Step1Metadata: React.FC = () => {
  const surveyState = useSurveyState();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const canProceed =
    surveyState.title.trim().length > 0 &&
    surveyState.description.trim().length > 0;

  const handleNext = () => {
    if (canProceed) {
      navigate(`/app/survey-builder/step-2/${id}`);
    }
  };

  return (
    <Fragment>
      <h2 className="text-2xl font-bold mb-6">Survey Details</h2>
      <SurveyMetadataForm
        disabled={false}
        showNext={true}
        onNext={handleNext}
      />
    </Fragment>
  );
};

export default Step1Metadata;
