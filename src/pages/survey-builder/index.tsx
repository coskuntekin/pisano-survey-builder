import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const steps = [
  { label: "Details", path: "/app/survey-builder/step-1" },
  { label: "Questions", path: "/app/survey-builder/step-2" },
  { label: "Answers", path: "/app/survey-builder/step-3" },
  { label: "Preview", path: "/app/survey-builder/step-4" },
];

const SurveyBuilderIndex: React.FC = () => {
  const location = useLocation();
  const currentStep = steps.findIndex((s) => location.pathname.includes(s.path));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col items-center py-8">
        <div className="w-full max-w-3xl bg-white rounded shadow p-6">
          <nav className="flex justify-between items-center mb-8">
            <ol className="flex w-full justify-between">
              {steps.map((step, idx) => {
                const isActive = location.pathname.includes(step.path);
                return (
                  <li key={step.path} className="flex-1 flex flex-col items-center">
                    <span
                      className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 text-sm font-bold border-2 transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600"
                          : idx < currentStep
                          ? "bg-blue-100 text-blue-600 border-blue-300"
                          : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {idx + 1}
                    </span>
                    <span className={`text-xs ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"}`}>{step.label}</span>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Pisano Survey Builder</h2>
            <p className="text-gray-600">Create, preview, and export your custom survey in just a few steps.</p>
          </div>
          <Outlet />

          {location.pathname === "/app/survey-builder" && (
            <div className="flex justify-center mt-8">
              <Link
                to="/app/survey-builder/step-1"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition-colors"
              >
                Start Survey
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SurveyBuilderIndex;
