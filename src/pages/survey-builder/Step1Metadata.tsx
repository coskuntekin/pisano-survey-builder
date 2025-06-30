import React, { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SurveyMetadataForm from "../../components/SurveyMetadataForm";
import { useSurveyState, useSurveyDispatch } from "../../context/SurveyContext";

const Step1Metadata: React.FC = () => {
  const surveyState = useSurveyState();
  const dispatch = useSurveyDispatch();
  const navigate = useNavigate();
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
      } else {
        dispatch({ type: "reset" });
      }
    } else {
      dispatch({ type: "reset" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const canProceed =
    surveyState.title.trim().length > 0 &&
    surveyState.description.trim().length > 0;

  const handleNext = () => {
    if (canProceed) {
      const surveyId = id || surveyState.id;
      navigate(`/app/survey-builder/step-2/${surveyId}`);
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
