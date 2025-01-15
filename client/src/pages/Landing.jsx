import React, { useState, useEffect, useRef } from "react";
import {
  Globe2,
  FolderSearch,
  Code2,
  Terminal,
  Send,
  Bot,
  Loader2,
  Twitter,
  MessageCircle,
  FileText,
  ArrowRight,
  MessageSquare,
  Zap,
} from "lucide-react";
import { io } from "socket.io-client";
import ChatResponseUI from "../components/chatui";

const socket = io("http://localhost:5000");

function LoadingScreen() {
  return (
    <div className="fixed inset-0 animated-gradient flex items-center justify-center z-50 animate-fadeOut">
      <div className="text-center">
        <Bot className="h-16 w-16 text-blue-400 animate-bounce mb-4" />
        <div className="text-2xl font-bold text-white">SwiftNet</div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-0"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-150"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-300"></div>
        </div>
      </div>
    </div>
  );
}

function FadeInSection({ children, delay = 0 }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
          }, delay);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [delay]);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={() => onModeChange("single")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          mode === "single"
            ? "bg-blue-500 text-white"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
        }`}
      >
        <Zap
          className={`h-4 w-4 ${
            mode === "single" ? "text-white" : "text-blue-400"
          }`}
        />
        Single Task
      </button>
      <button
        onClick={() => onModeChange("conversational")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          mode === "conversational"
            ? "bg-blue-500 text-white"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
        }`}
      >
        <MessageSquare
          className={`h-4 w-4 ${
            mode === "conversational" ? "text-white" : "text-blue-400"
          }`}
        />
        Conversational
      </button>
    </div>
  );
}

/** MAIN */
function Landing() {
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState("single");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.info("Connected to WebSocket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.info("Disconnected from WebSocket server");
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    if (mode !== "single" && response !== "") {
      socket.emit("user_response", { response: userInput });
    } else {
      setIsProcessing(true);

      // Clear response if starting a new task
      setResponse("");

      // Emit the task to the backend
      socket.emit("process_task", { task: userInput, humanInteraction: mode });

      // Listen for the backend response
      socket.on("stream_response", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        // console.log(data);

        // Append new data to the existing response
        setResponse((prevResponse) => prevResponse + data.data);

        setIsProcessing(false);
      });
    }
  };

  const getPlaceholder = () => {
    return mode === "single"
      ? "Describe your task here..."
      : "Start a conversation with AI agents...";
  };

  const agents = [
    {
      name: "WebSurfer",
      icon: Globe2,
      description: "Searches and analyzes web content in real-time",
    },
    {
      name: "FileSurfer",
      icon: FolderSearch,
      description: "Manages and processes local files efficiently",
    },
    {
      name: "Coder",
      icon: Code2,
      description: "Writes and optimizes code across languages",
    },
    {
      name: "Executor",
      icon: Terminal,
      description: "Runs commands and manages system tasks",
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Telegram", icon: MessageCircle, href: "#" },
    { name: "Documentation", icon: FileText, href: "#" },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen animated-gradient text-white">
      {/* Header remains the same */}
      <FadeInSection delay={0}>
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-3xl font-bold">
              <Bot className="h-10 w-10 text-blue-400" />
              <span>SwiftNet</span>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all group"
                >
                  <link.icon className="h-5 w-5 text-blue-400" />
                  <span>{link.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </header>
      </FadeInSection>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {agents.map((agent, index) => (
            <FadeInSection key={agent.name} delay={index * 100}>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex flex-col items-center text-center">
                  <agent.icon className="h-12 w-12 text-blue-400 mb-4 animate-float" />
                  <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                  <p className="text-gray-400">{agent.description}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Input Section */}
        <FadeInSection delay={400}>
          <div className="max-w-3xl mx-auto">
            <ModeSwitch mode={mode} onModeChange={setMode} />
            <ChatResponseUI messages={messages} />
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="relative">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full h-32 px-4 py-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {mode === "single" ? "Submit" : "Send"}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Response Section */}
            {/* {response && (
              <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                <h4 className="text-lg font-semibold mb-2">Response:</h4>
                <p className="text-gray-300">{response}</p>
              </div>
            )} */}
          </div>
        </FadeInSection>
      </main>

      {/* Footer */}
      <FadeInSection delay={500}>
        <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>
            Powered by advanced AI agents working together to solve your tasks
          </p>
        </footer>
      </FadeInSection>
    </div>
  );
}

export default Landing;
