import React, { Fragment, useEffect } from "react";
import { useSurveyState } from "../../context/SurveyContext";
import SurveyPreview from "../../components/SurveyPreview";

const Step4Preview: React.FC = () => {
  const surveyState = useSurveyState();

  useEffect(() => {
    localStorage.setItem("survey-builder-state", JSON.stringify(surveyState));
  }, [surveyState]);

  return (
    <Fragment>
      <h2 className="text-2xl font-bold mb-4">Preview Survey</h2>
      <SurveyPreview survey={surveyState} />
    </Fragment>
  );
};

export default Step4Preview;
