import React, { useState, useEffect } from "react";
import { Send, Loader2, MessageSquare, Zap, LockIcon, ArrowRight } from "lucide-react";
import { io } from "socket.io-client";
import { Navigate } from "react-router";
import { usePrivy } from '@privy-io/react-auth';
import ChatResponseUI from "../components/chatui";
import Navbar from "../components/navbar";

const socket = io("http://localhost:5000");

function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-lg mb-6">
      <button
        onClick={() => onModeChange("single")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          mode === "single"
            ? "bg-indigo-500 text-white shadow-lg"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <Zap className="h-4 w-4" />
        Single Task
      </button>
      <button
        onClick={() => onModeChange("conversational")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          mode === "conversational"
            ? "bg-indigo-500 text-white shadow-lg"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        Conversational
      </button>
    </div>
  );
}

function Landing() {
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("single");
  const [messages, setMessages] = useState([]);
  const { ready, authenticated, user, login } = usePrivy();

  useEffect(() => {
    // Socket connection setup
    socket.on("connect", () => console.info("Connected to WebSocket server:", socket.id));
    socket.on("disconnect", () => console.info("Disconnected from WebSocket server"));
    
    // Socket response handler
    socket.on("stream_response", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setResponse((prevResponse) => prevResponse + data.data);
      setIsProcessing(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("stream_response");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    if (mode !== "single" && response !== "") {
      socket.emit("user_response", { response: userInput });
    } else {
      setIsProcessing(true);
      setResponse("");
      socket.emit("process_task", { task: userInput, humanInteraction: mode });
    }
    
    setUserInput(""); // Clear input after submission
  };

  // Show loading state while Privy initializes
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-100 dark:border-gray-700">
          {/* Logo/Brand Section */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
              <LockIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to SwiftNet
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to access intelligent AI assistance
            </p>
          </div>

          {/* Sign In Button */}
          <div className="space-y-6">
            <button
              onClick={login}
              className="group relative w-full flex items-center justify-center gap-2 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <span>Sign in with Privy</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Features List */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                What you'll get access to:
              </p>
              <div className="space-y-3">
                {[
                  'Advanced AI task automation',
                  'Secure authentication',
                  'Real-time responses',
                  'Conversational AI interface'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-indigo-200 to-purple-200 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>
      </div>
    );
  }

  // Main authenticated view
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                SwiftNet
              </h1>
              <p className="text-gray-600">Intelligent AI agents at your service</p>
            </div>

            <div className="flex flex-col items-center">
              <ModeSwitch mode={mode} onModeChange={setMode} />

              <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-lg">
                <div className="p-6">
                  <ChatResponseUI messages={messages} />
                </div>

                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <form onSubmit={handleSubmit} className="relative">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={mode === "single" ? "Describe your task..." : "Type your message..."}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-500 pr-24"
                      rows="3"
                    />
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="absolute bottom-2 right-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>{mode === "single" ? "Submit" : "Send"}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;