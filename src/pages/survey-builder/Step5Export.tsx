import React, { useEffect } from "react";
import { useSurveyState } from "../../context/SurveyContext";

const Step5Export: React.FC = () => {
  const survey = useSurveyState();

  useEffect(() => {
    localStorage.setItem("survey-builder-state", JSON.stringify(survey));
  }, [survey]);

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(survey, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      `survey-${survey.title || "untitled"}.json`,
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Export Survey as JSON</h2>
      <p className="mb-4 text-gray-700">
        Click the button below to export your survey as a JSON file. You can use
        this file to import or share your survey structure.
      </p>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto mb-6 max-h-64">
        {JSON.stringify(survey, null, 2)}
      </pre>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleExport}
      >
        Export as JSON
      </button>
    </div>
  );
};

export default Step5Export;
