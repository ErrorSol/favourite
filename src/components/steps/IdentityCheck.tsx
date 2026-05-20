"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

type IdentityCheckProps = {
  onYes: () => void;
  onInteract: () => void;
};

export function IdentityCheck({ onYes, onInteract }: IdentityCheckProps) {
  const [noClicked, setNoClicked] = useState(false);

  return (
    <GlassCard className="w-full max-w-sm text-center">
      <h2 className="mb-8 text-xl font-semibold text-purple-900">
        Wait… is this really you? 🤔
      </h2>
      {noClicked ? (
        <p className="mb-6 text-lg font-medium text-pink-600">
          Then how did you get here 👀😂
        </p>
      ) : (
        <IdentityButtons
          onYes={() => {
            onInteract();
            onYes();
          }}
          onNo={() => {
            onInteract();
            setNoClicked(true);
          }}
        />
      )}
      {noClicked && (
        <PrimaryButton
          className="mt-4"
          onClick={() => {
            onInteract();
            onYes();
          }}
        >
          Okay fine, it&apos;s me 😎
        </PrimaryButton>
      )}
    </GlassCard>
  );
}

function IdentityButtons({
  onYes,
  onNo,
}: {
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <PrimaryButton onClick={onYes}>Yes 😎</PrimaryButton>
      <PrimaryButton variant="secondary" onClick={onNo}>
        No 😭
      </PrimaryButton>
    </div>
  );
}
