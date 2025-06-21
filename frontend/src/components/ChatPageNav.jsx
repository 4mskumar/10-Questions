import { useAuth0 } from "@auth0/auth0-react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSettings } from "react-icons/io";

const ChatPageNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const logoutRef = useRef(null);
  const { logout } = useAuth0();

  useEffect(() => {
    if (showLogout) {
      setIsVisible(true);
      if (logoutRef.current) {
        gsap.fromTo(
          logoutRef.current,
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }
        );
      }
    } else if (logoutRef.current) {
      gsap.to(logoutRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsVisible(false),
      });
    }
  }, [showLogout]);

  return (
    <div className="flex justify-between items-center px-4 md:px-6 py-4 border-b border-zinc-700">
      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white font-inter">
        Inqo
        <span className="ml-0.5 italic font-playfair">ra</span>
      </h1>

      {/* Settings and Logout */}
      <div className="relative flex flex-col items-end gap-2">
        <IoMdSettings
          onClick={() => setShowLogout(prev => !prev)}
          className="text-white text-2xl md:text-3xl cursor-pointer"
        />

        {isVisible && (
          <div
            ref={logoutRef}
            onClick={() =>
              {
                logout({ logoutParams: { returnTo: window.location.origin } });
                localStorage.removeItem("chatHistory");
                localStorage.removeItem("name");
                localStorage.removeItem("token");
              }
            }
            className="absolute top-10 right-0 bg-zinc-900 rounded-xl px-4 py-2 hover:bg-zinc-700 z-50 cursor-pointer shadow-lg w-28 md:w-32"
          >
            <h1 className="text-white text-sm md:text-base font-medium text-center font-inter tracking-tight">
              Logout
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPageNav;
