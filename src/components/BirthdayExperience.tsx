"use client";

import { BackgroundMusic } from "@/components/BackgroundMusic";
import { CatParade } from "@/components/CatParade";
import { FloatingElements } from "@/components/FloatingElements";
import { RandomPopups } from "@/components/RandomPopups";
import { StepWrapper } from "@/components/StepWrapper";
import { ChatStep } from "@/components/steps/ChatStep";
import { EndingScreen } from "@/components/steps/EndingScreen";
import { FinalMessage } from "@/components/steps/FinalMessage";
import { FunInteraction } from "@/components/steps/FunInteraction";
import { GiftOpening } from "@/components/steps/GiftOpening";
import { IdentityCheck } from "@/components/steps/IdentityCheck";
import { IntroMessage } from "@/components/steps/IntroMessage";
import { MemorySlides } from "@/components/steps/MemorySlides";
import { PasswordScreen } from "@/components/steps/PasswordScreen";
import { SecretButton } from "@/components/steps/SecretButton";
import { TimelineStep } from "@/components/steps/TimelineStep";
import { VideoStep } from "@/components/steps/VideoStep";
import { useBirthdayFlow } from "@/hooks/useBirthdayFlow";

export function BirthdayExperience() {
  const {
    currentStep,
    hasInteracted,
    markInteraction,
    nextStep,
    reset,
  } = useBirthdayFlow();

  const interact = markInteraction;

  const isFullscreenStep = currentStep === 5;
  const isVideoStep = currentStep === 11;

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-fuchsia-300 via-pink-200 to-rose-100">
      <FloatingElements />
      <BackgroundMusic enabled={hasInteracted} useLastTrack={isVideoStep} />
      <RandomPopups
        active={hasInteracted && currentStep > 1 && currentStep !== 5}
      />
      <CatParade active={hasInteracted && currentStep >= 3} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(255,105,180,0.22),transparent_55%)]" />

      {isFullscreenStep ? (
        <MemorySlides onComplete={nextStep} onInteract={interact} />
      ) : (
        <StepWrapper stepKey={currentStep}>
          {currentStep === 1 && (
            <PasswordScreen onSuccess={nextStep} onInteract={interact} />
          )}
          {currentStep === 2 && (
            <IdentityCheck onYes={nextStep} onInteract={interact} />
          )}
          {currentStep === 3 && (
            <GiftOpening onOpen={nextStep} onInteract={interact} />
          )}
          {currentStep === 4 && (
            <IntroMessage onContinue={nextStep} onInteract={interact} />
          )}
          {currentStep === 6 && (
            <FunInteraction onContinue={nextStep} onInteract={interact} />
          )}
          {currentStep === 7 && (
            <ChatStep onContinue={nextStep} onInteract={interact} />
          )}
          {currentStep === 8 && (
            <TimelineStep onContinue={nextStep} onInteract={interact} />
          )}
          {currentStep === 9 && (
            <SecretButton onContinue={nextStep} onInteract={interact} />
          )}
          {currentStep === 10 && (
            <FinalMessage onContinue={nextStep} onInteract={interact} />
          )}
          {currentStep === 11 && (
            <VideoStep onContinue={nextStep} onInteract={interact} />
          )}
          {currentStep === 12 && <EndingScreen onReplay={reset} />}
        </StepWrapper>
      )}
    </main>
  );
}
