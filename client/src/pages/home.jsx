import { cn } from "@/lib/utils";
import { DotPattern } from "../components/ui/dot-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import Navbar from "../components/navbar";
import { AnimatedBeamMultipleOutputDemo } from "../components/beams";
import { MagicCard } from "@/components/ui/magic-card";
import Footer from "../components/footer";
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from "react-router";

const Home = () => {
    const { login } = usePrivy();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login();
            navigate('/chat');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    
    return (
        <div className="min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-cyan-100 " />
                
                <h1 className="z-10 text-center lg:text-8xl md:text-7xl text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                    SwiftNet
                </h1>
                
                <p className="z-10 lg:w-1/3 md:w-1/2 w-full text-center text-xl leading-relaxed my-4 text-gray-700 dark:text-gray-300">
                    Dynamic platform that seamlessly integrates multiple AI agents for smarter and more accurate results.
                </p>

                <div className="z-10 mt-8">
                    <ShimmerButton 
                        className="shadow-lg hover:shadow-cyan-500/50 transition-all duration-300" 
                        onClick={handleLogin}
                    >
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                            Get Started
                        </span>
                    </ShimmerButton>
                </div>

                <DotPattern
                    width={10}
                    height={10}
                    className="h-screen fill-cyan-600/20 dark:fill-cyan-400/20"
                />
            </div>

            {/* Productivity Section */}
            <div className="bg-gradient-to-b from-cyan-100 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="min-h-screen container mx-auto py-20">
                    <h2 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold text-6xl text-center mb-8">
                        Be 5x more Productive
                    </h2>

                    <p className="text-center text-xl mx-auto my-8 w-full text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                        Work like never before. Elevate your tasks with specialized agents working together to complete your work. 
                        Precise and reliable results increase your productivity rate by several folds.
                    </p>

                    <AnimatedBeamMultipleOutputDemo className="my-10" />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white dark:bg-gray-900 py-20">
                <div className="container mx-auto">
                    <h2 className="bg-gradient-to-r py-4 from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold text-6xl text-center mb-20">
                        Multi Agent for Multi Purpose
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                        {[
                            {
                                icon: "https://img.icons8.com/ios/50/grand-master-key.png",
                                title: "Task Master",
                                description: "Oversees task delegation, guiding agents to complete tasks effectively and on time."
                            },
                            {
                                icon: "https://img.icons8.com/ink/48/bot.png",
                                title: "Browser Bot",
                                description: "Automates browsing tasks such as data scraping, form filling, and web navigation for efficiency."
                            },
                            {
                                icon: "https://img.icons8.com/hatch/64/detective.png",
                                title: "File Scout",
                                description: "Organizes and categorizes files for quick retrieval, enhancing workflow efficiency and accessibility."
                            },
                            {
                                icon: "https://img.icons8.com/external-others-maxicons/62/external-blacksmith-greek-mythology-others-maxicons-3.png",
                                title: "Code Smith",
                                description: "Develops and refines code, crafting efficient software solutions and ensuring optimal performance."
                            },
                            {
                                icon: "https://img.icons8.com/ios-filled/50/run-command.png",
                                title: "Shell Commander",
                                description: "Executes system commands and automates terminal tasks, enhancing workflow with streamlined processes."
                            }
                        ].map((feature, index) => (
                            <MagicCard
                                key={index}
                                className="cursor-pointer flex-col items-center justify-center p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                                gradientColor="rgba(6, 182, 212, 0.1)"
                            >
                                <img 
                                    width="60" 
                                    height="60" 
                                    className="mx-auto dark:invert" 
                                    src={feature.icon} 
                                    alt={feature.title}
                                />
                                <h3 className="text-2xl font-semibold text-center py-4 text-gray-800 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="px-4 text-center text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </MagicCard>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;