import confetti from "canvas-confetti";

export function fireConfetti(intensity: "light" | "burst" = "burst") {
  const count = intensity === "burst" ? 120 : 60;
  const defaults = { origin: { y: 0.65 }, zIndex: 9999 };

  confetti({
    ...defaults,
    particleCount: count,
    spread: 70,
    startVelocity: 35,
    colors: ["#FFB7C5", "#E8B4F8", "#FFF4B8", "#B8E8FF", "#FFD4E5"],
  });

  if (intensity === "burst") {
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 200);
  }
}
