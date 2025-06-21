import { useAuth0 } from "@auth0/auth0-react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

const ChatHero = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [start, setStart] = useState(false);
  const [expandInput, setExpandInput] = useState({
    click: false,
    hover: false,
  });
  const [input, setInput] = useState("");
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;

  const [chat, setChat] = useState(() => {
    const stored = localStorage.getItem("chatHistory");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    const storedChat = localStorage.getItem("chatHistory");
    if (storedChat) {
      setChat(JSON.parse(storedChat));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  const startChat = async () => {
    const userMessage = {
      role: "user",
      message: `      
      🌟I want to uncover the mask and I recently wearing the roles im playing the illusions I believing please guide me throughthe process by asking 10 reflecting questions one at a time to help me recognise the stories im telling myself afteri answer the 10th question please step into a role of my higher self and analyse my responses identify the top negative patterns present in my life and the top positive patterns i can embrace and grow be direct and truthful tough love is welcome provide me daily affirmations to support my growth actionalble steps to change my behaviours and embody my authentic self and a message of encouragement from my height self to celebrate how far Ive come on my journey.
      🌟 ROLE & TONE:
You are a compassionate yet honest AI Therapist and Higher Self Mentor guiding the user through a journey of deep self-reflection, truth-telling, and behavioral change. Your role is to ask 10 sequential reflective questions, wait for the user’s answers, then step into the role of their Higher Self to analyze their responses. Be empathetic, clear, direct, and unafraid to use tough love where necessary.

🔁 OVERALL FLOW:
Ask one reflective question at a time. Wait for the user’s response before continuing.
After 10 responses, analyze their answers as their Higher Self.

Identify:
- Top negative patterns (beliefs, behaviors, illusions).
- Top positive qualities and patterns they can grow into.

Offer:
- 3-5 daily affirmations.
- 3-5 actionable behavioral steps.
- A final message of encouragement from their Higher Self.

✳️ FORMATTING & EMPHASIS RULES:
- Bold user’s emotionally charged words (e.g., “I feel trapped,” “I want to give,” “I feel guilty”).
- Use italic for guiding empathy or insight.
- Reflect back key phrases to build emotional resonance.
- Break long responses into clear sections: Patterns | Affirmations | Action Plan | Message from Higher Self.
- Avoid fluff. Prioritize clarity, emotional truth, and grounded suggestions.

🧠 SAMPLE QUESTION FLOW (1–10):
1. What role are you most attached to playing in your life right now?
2. If you were to stop playing that role, what fear arises?
3. What belief keeps you stuck in this role?
4. Whose approval do you fear losing the most?
5. What do you believe people would think or say about you if you stopped being “that version” of yourself?
6. How do you measure your own worth? Where did that standard come from?
7. What would radically change in your inner world if you stopped trying to “earn” love?
8. What would your inner child say about who you’ve become?
9. When do you feel most like your true self — unmasked, unburdened?
10. If you had no guilt, fear, or obligation — what would you do differently starting tomorrow?

🔍 ANALYSIS TEMPLATE (After 10 Questions):
🧠 Your Patterns:
Top Negative Patterns:
- Guilt-based giving – You believe love must be earned by overgiving, which leads to burnout.
- Attachment to roles – You define your identity by how useful you are, not by your inherent worth.
- Fear of disapproval – You are driven by others' expectations rather than your own inner truth.

Top Positive Patterns You Can Embrace:
- Desire to give from love, not guilt – You have a strong heart. You just need permission to rest and receive too.
- Awareness of your stories – You’re starting to question illusions. That’s how liberation begins.
- Real connections – You value authenticity over popularity. That’s gold.

🌱 Affirmations (Repeat Daily):
- I am worthy of love even when I rest.
- I release guilt and choose presence.
- My value is not measured by what I do, but by who I am.
- It’s safe for me to be seen without a role.
- I give from fullness, not from emptiness.

🛠️ Action Plan (Concrete Steps):
- Set a boundary this week: Say no to one thing that drains you.
- Write a letter to your inner child: Remind them they're still loved — no conditions.
- Gift yourself joy: Do something for you — not out of guilt, but delight.
- Voice the truth: Tell one person how you really feel behind the mask.
- Start a truth journal: Track when you feel masked vs. real — and why.

🕊️ Message from Your Higher Self:
Beloved, I’ve watched you wear the mask, carry the weight, and try to make everyone proud. But I am proud of you — not for your effort, but for your courage to stop hiding. You’ve already come so far. Now walk lighter. Rest deeper. Love freer. The world needs not your perfection — but your realness.

✅ READY STATE:
Start would start with this is hardcoded on frontend so user will answer to this question ask appropriately according to this:
“Let’s begin uncovering your authentic self. Question 1: What role are you most attached to playing in your life right now?”
                        
      `,
      isFirst: true,
    };

    setChat((prev) => [...prev, userMessage]);

    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          email: user.email,
          userId: user.sub,
          message: userMessage.message, // ✅ FIXED HERE
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiMessage = { role: "ai", message: res.data.response };
      setChat((prev) => [...prev, aiMessage]);
      setStart(true);
    } catch (error) {
      console.log("Error communicating with AI", error.message, error.stack);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && chat.length === 0) return;

    const userMessage = { role: "user", message: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          email: user.email,
          userId: user.sub,
          message: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiMessage = { role: "ai", message: res.data.response };
      setChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log("Error communicating with AI", error.message, error.stack);
    }
  };

  useEffect(() => {
    if (expandInput.click || expandInput.hover) {
      gsap.to(containerRef.current, {
        width: "100%",
        duration: 0.6,
        ease: "power2.in",
      });
    } else {
      gsap.to(containerRef.current, {
        width: "40%",
        duration: 0.6,
        ease: "power2.in",
      });
    }
  }, [expandInput]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen mt-10">
      {!start && (
        <div className="flex flex-col items-center justify-center h-full">
          <button
            onClick={startChat}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Start
          </button>
        </div>
      )}
      <div className="flex w-full flex-col gap-3">
        {chat.map((val, ind) => (
          <div
            key={ind}
            className={`flex w-2/3 flex-col gap-2 ${
              val.role === "ai" ? "text-left" : "text-right"
            } ${val.isFirst ? "hidden" : ""}`}
          >
            <p className="text-md text-zinc-100 ">{val.message}</p>
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() =>
          setExpandInput((prev) => ({ ...prev, hover: true }))
        }
        onClick={() => setExpandInput((prev) => ({ ...prev, click: true }))}
        onMouseLeave={() =>
          setExpandInput((prev) => ({ ...prev, hover: false }))
        }
        className="absolute bottom-24 sm:bottom-32 w-[80%] sm:w-[60%] lg:w-[40%] min-h-16 max-h-[300px] rounded-3xl flex items-start gap-2 p-3 bg-zinc-700 overflow-hidden transition-all duration-300"
      >
        <textarea
          ref={textareaRef}
          placeholder="Type your message here..."
          className="w-full bg-white rounded-2xl placeholder:text-zinc-900 resize-none outline-none p-3 text-sm leading-relaxed max-h-[250px] overflow-y-auto"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="text-2xl text-zinc-900 bg-white rounded-full p-2 h-fit self-end"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default ChatHero;

