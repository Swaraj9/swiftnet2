import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Badge } from "../components/ui/badge";

const Navbar = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("f6b4d5a9b09d508bbce9f49ed7b5fa707865e");
    setCopied(true); // Show checkmark
    setTimeout(() => setCopied(false), 2000); // Hide checkmark after 2 seconds
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 py-1 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 hover:scale-[1.1] duration-300">
            <Link
              to="/"
              className="text-xl font-bold  text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              SwiftNet
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Badge
                onClick={handleCopy}
                className="cursor-pointer hover:bg-gray-200 flex items-center space-x-2 transition-all"
              >
                CA: f6b4d5a9b09d508bbce9f49ed7b5fa707865e
                {copied && (
                  <span
                    className="text-green-500 animate-pulse ml-2"
                    title="Copied!"
                  >
                    ✔
                  </span>
                )}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Link
                to="/docs"
                target="_blank"
                className="flex flex-col items-center space-y-1 hover:scale-110 transition-all duration-300"
              >
                <Button
                  variant="icon"
                  className=" flex items-center justify-center"
                >
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/color/48/twitterx--v2.png"
                    alt="Twitter"
                  />
                </Button>
              </Link>

              <Link
                to="/githuv"
                target="_blank"
                className="flex flex-col items-center space-y-1 hover:scale-110 transition-all duration-300"
              >
                <Button
                  variant="icon"
                  className=" flex items-center justify-center"
                >
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/ios-glyphs/30/github.png"
                    alt="Github"
                  />
                </Button>
              </Link>

              <div className="flex flex-col items-center space-y-1 hover:scale-110 duration-300">
                <Button
                  variant="icon"
                  className="flex items-center justify-center"
                >
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/ios/50/google-docs.png"
                    alt="Docs"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
