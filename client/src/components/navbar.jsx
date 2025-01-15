import React from 'react';
import { Button } from "./ui/button"
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <span className="text-xl font-bold text-gray-700 dark:text-white">SwiftNet</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link to={"/docs"} target='_blank'>
                                <Button variant="ghost">Docs</Button>
                            </Link>
                            <Button variant="ghost">Features</Button>
                            <Button variant="ghost">About</Button>
                            <Button variant="ghost">Contact</Button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;