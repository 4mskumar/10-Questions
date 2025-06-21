import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex justify-center gap-10 w-full px-32 py-12 bg-gradient-to-b from-zinc-900 to-black text-white font-inter">
      <div>
        <a href="/" className="text-5xl tracking-tighter font-semibold text-white font-inter">
          10
          <span className="text-white ml-1 italic font-light font-playfair">
            questions
          </span>
        </a>
      </div>
      <div className="w-1/2">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 font-playfair">
          About This Project
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to the{" "}
          <span className="font-semibold text-yellow-300">Reflective AI</span>{" "}
          experience — your digital companion for deep self-discovery.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          This app is designed to help you slow down, reflect, and reconnect
          with yourself through the power of questions. Using the intelligence
          of Google's Gemini API, our AI will guide you through{" "}
          <span className="font-semibold">
            10 carefully crafted reflective questions
          </span>
          . These questions are meant to:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Encourage honest introspection</li>
          <li>Help identify your patterns, values, and desires</li>
          <li>Support emotional clarity and personal growth</li>
        </ul>
        <p className="text-lg leading-relaxed mb-6">
          As you respond to each question, the AI adapts and follows up based on
          your thoughts. This creates a personalized journey — unique to your
          mindset and experiences.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          You can revisit your answers, build upon them, and track your inner
          growth over time. Our goal is to make reflection a practice you look
          forward to.
        </p>
        <p className="text-lg leading-relaxed text-yellow-300">
          Start with one question. Let your mind speak. Let your truth surface.
        </p>
      </div>
    </div>
  );
};

export default About;
