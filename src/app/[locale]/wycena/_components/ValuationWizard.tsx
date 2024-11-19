"use client";
import { useState } from "react";
import classNames from "classnames";
import PriceEstimationForm from "./PriceEstimationForm";
import { steps } from "../../../_static-data/constants";
import { useTranslation } from "react-i18next";
import { monda } from "../../../fonts";

const ValuationWizard: React.FC = () => {
  const { t } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleGoToStep = (step: number) => {
    setCurrentStepIndex(step);
  };

  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body p-4 sm:p-8">
        <div className="divider divider-start divider-multicolor-single mb-12 mt-7 sm:mt-4">
          <h1
            className={`card-title text-3xl text-default text-center font-bold uppercase text-wrap sm:text-nowrap ${monda.className}`}
          >
            {t("page_title")}
          </h1>
        </div>
        {currentStepIndex === 0 && (
          <div role="alert" className="alert mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{t("step_one.page_info")}</span>
          </div>
        )}
        <ul className="steps steps-vertical lg:steps-horizontal">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={classNames("step", {
                "step-accent": index <= currentStepIndex,
              })}
            >
              {t(`${step.locale}`)}
            </li>
          ))}
        </ul>
        <PriceEstimationForm
          currentStepIndex={currentStepIndex}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          goToStep={handleGoToStep}
        />
      </div>
    </div>
  );
};

export default ValuationWizard;
