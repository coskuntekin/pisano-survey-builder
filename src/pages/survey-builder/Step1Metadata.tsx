import React, { Fragment, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import SurveyMetadataForm from "../../components/SurveyMetadataForm";
import { useSurveyState, useSurveyDispatch } from "../../context/SurveyContext";

const Step1Metadata: React.FC = () => {
  const surveyState = useSurveyState();
  const dispatch = useSurveyDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const saveSurveyToLocalStorage = useCallback(() => {
    if (!surveyState.id) {
      return;
    }

    const surveyWithTimestamp = {
      ...surveyState,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(
      `survey-${surveyState.id}`,
      JSON.stringify(surveyWithTimestamp),
    );
  }, [surveyState]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveSurveyToLocalStorage();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [saveSurveyToLocalStorage]);

  useEffect(() => {
    if (!id) {
      const newId = nanoid();
      navigate(`/app/survey-builder/step-1/${newId}`, { replace: true });
      return;
    }

    if (surveyState.id === id) {
      return;
    }

    const saved = localStorage.getItem(`survey-${id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "restoreSurvey",
          payload: parsed,
        });
      } catch (error) {
        console.error("Failed to parse saved survey:", error);
        dispatch({ type: "resetWithId", payload: { id } });
      }
    } else {
      dispatch({ type: "resetWithId", payload: { id } });
    }
  }, [id, navigate, surveyState.id, dispatch]);

  if (!surveyState.id || (id && surveyState.id !== id)) {
    return null;
  }

  const canProceed =
    surveyState.title.trim().length > 0 &&
    surveyState.description.trim().length > 0;

  const handleNext = () => {
    if (canProceed) {
      saveSurveyToLocalStorage();
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
