"use client";

import { useCallback, useState } from "react";

export const TOTAL_STEPS = 12;

export function useBirthdayFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  const markInteraction = useCallback(() => {
    setHasInteracted((prev) => (prev ? prev : true));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, TOTAL_STEPS)));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setHasInteracted(false);
  }, []);

  return {
    currentStep,
    hasInteracted,
    markInteraction,
    nextStep,
    goToStep,
    reset,
  };
}
