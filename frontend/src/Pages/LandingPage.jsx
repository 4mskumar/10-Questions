import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Mouse from "../components/Mouse";

const LandingPage = () => {
  return (
    <div className="w-full overflow-hidden min-h-screen relative">
      {/* Custom cursor or motion component */}
      <Mouse />

      {/* Navigation Bar */}
      <NavBar />

      {/* Hero Section */}
      <Hero />

      {/* Video Background */}
      <div className="absolute inset-0 -z-50 w-full h-full overflow-hidden">
        <video
          src="./videos/asbtract.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110 blur-2xl contrast-150"
        />
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>
    </div>
  );
};

export default LandingPage;
