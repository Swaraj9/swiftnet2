import React from 'react';
import { Button } from "./ui/button"
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 py-1 backdrop-blur-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                            SwiftNet
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-6">
                            <Link 
                                to="/docs" 
                                target='_blank'
                                className="flex flex-col items-center space-y-1"
                            >
                                <Button 
                                    variant="icon" 
                                    className=" flex items-center justify-center"
                                >
                                    <img 
                                        width="35" 
                                        height="35" 
                                        src="https://img.icons8.com/color/48/twitterx--v1.png" 
                                        alt="Twitter" 
                                    />
                                </Button>
                            </Link>
                            
                            <div className="flex flex-col items-center space-y-1">
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
                            
                            <div className="flex flex-col items-center space-y-1">
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