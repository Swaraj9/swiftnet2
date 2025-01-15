import React, { useEffect, useRef } from "react";
import { Bot } from "lucide-react";


const ChatUI = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessageSender = (string) => {
    const match = string.match(/----------\s*(\w+)\s*----------/);
    if (match && match[1] && match[1] === "MagenticOneOrchestrator") {
      match[1] = "TaskMaster";
    }
    if (match && match[1] && match[1] === "WebSurfer") {
      match[1] = "BrowserBot";
    }
    if (match && match[1] && match[1] === "Coder") {
      match[1] = "CodeSmith";
    }
    if (match && match[1] && match[1] === "ComputerTerminal") {
      match[1] = "ShellCommander";
    }
    if (match && match[1] && match[1] === "FileSurfer") {
      match[1] = "FileNavigator";
    }
    return match ? match[1] : null;
  };

  const removeSenderPattern = (input) => {
    const _input = input.trim("\n");
    const output = _input.replace(/----------\s*(\w+)\s*----------/, "");
    return output;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    messages &&
    messages.length > 0 && (
      <div className="flex flex-col max-h-[600px] w-full max-w-4xl mx-auto bg-white rounded-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-500" />
              </div>

              <div className="flex-1">
                <div className="text-xs font-medium text-gray-500 mb-1">
                  {(message?.data && getMessageSender(message?.data)) ||
                    "System"}
                </div>

                <div className="rounded-2xl px-4 py-2 bg-gray-100 text-gray-800 shadow-sm">
                  <p className="whitespace-pre-wrap text-sm">
                    {(message?.data && removeSenderPattern(message?.data)) ||
                      ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {messages.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-indigo-500">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ChatUI;