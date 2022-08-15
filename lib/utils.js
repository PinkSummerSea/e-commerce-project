import confetti from "canvas-confetti";

const runConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
} 

export default runConfetti