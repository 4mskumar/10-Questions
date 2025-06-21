import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const tryNowRef = useRef(null);
  const fillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/chat");
  }, [isAuthenticated, navigate]);

  const handleMouseEnter = (e) => {
    const btn = tryNowRef.current;
    const fill = fillRef.current;
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(fill, {
      clipPath: `circle(0% at ${x}px ${y}px)`,
      backgroundColor: "white",
      opacity: 1,
    });

    gsap.to(fill, {
      clipPath: `circle(150% at ${x}px ${y}px)`,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to("#try-now", {
      color: "black",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    const btn = tryNowRef.current;
    const fill = fillRef.current;
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(fill, {
      clipPath: `circle(0% at ${x}px ${y}px)`,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(fill, { opacity: 0 });
      },
    });

    gsap.to("#try-now", {
      color: "white",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-screen flex items-start mt-20 justify-center px-4">
      <div className="text-center max-w-5xl mx-auto py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white font-inter">
          Know yourself{" "}
          <span className="text-yellow-500 italic font-light font-playfair">
            better
          </span>
        </h1>
        <p className="text-zinc-200 text-base sm:text-lg md:text-xl font-medium mt-6 leading-relaxed">
          Gain clarity and self-awareness through 10 powerful questions.<br />
          Reflect, realign, and reconnect with your true self—one question at a time.
          <br className="hidden sm:block" />
          Reflect deeply — Grow intentionally — Start your journey today.
        </p>

        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 relative">
            <button
              ref={tryNowRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => loginWithRedirect()}
              className="border-2 border-white text-white font-semibold tracking-tighter text-lg sm:text-xl px-6 py-2 rounded-lg relative overflow-hidden z-10"
            >
              <span id="try-now" className="relative z-20">
                Try now
              </span>
              <span
                ref={fillRef}
                className="absolute inset-0 z-10"
                style={{
                  backgroundColor: "white",
                  clipPath: "circle(0% at 50% 50%)",
                  transition: "none",
                  opacity: 0,
                }}
              />
            </button>

            <button
              onClick={() => loginWithRedirect()}
              className="bg-white text-black font-semibold tracking-tighter text-lg sm:text-xl px-6 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
