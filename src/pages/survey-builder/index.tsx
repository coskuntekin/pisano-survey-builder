import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

const steps = [
  { label: "Details", path: "/app/survey-builder/step-1" },
  { label: "Questions and Answers", path: "/app/survey-builder/step-2" },
  { label: "Preview", path: "/app/survey-builder/step-3" },
];

const SurveyBuilderIndex: React.FC = () => {
  const location = useLocation();
  const currentStep = steps.findIndex((s) =>
    location.pathname.includes(s.path),
  );

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="w-full max-w-3xl rounded bg-white p-6 shadow">
        <nav className="mb-8 flex items-center justify-between">
          <ol className="flex w-full justify-between">
            {steps.map((step, idx) => {
              const isActive = location.pathname.includes(step.path);
              return (
                <li
                  key={step.path}
                  className="flex flex-1 flex-col items-center"
                >
                  <span
                    className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                      isActive
                        ? "border-blue-600 bg-blue-600 text-white"
                        : idx < currentStep
                          ? "border-blue-300 bg-blue-100 text-blue-600"
                          : "border-gray-300 bg-gray-100 text-gray-400"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {idx + 1}
                  </span>
                  <small
                    className={`text-xs ${isActive ? "font-semibold text-blue-600" : "text-gray-500"}`}
                  >
                    {step.label}
                  </small>
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Pisano Survey Builder</h2>
          <p className="text-gray-600">
            Create, preview, and export your custom survey in just a few steps.
          </p>
        </div>

        <Outlet />

        {location.pathname === "/app/survey-builder" && (
          <div className="mt-8 flex justify-center">
            <Link
              to={`/app/survey-builder/step-1/${nanoid()}`}
              className="rounded bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Start Survey
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyBuilderIndex;
