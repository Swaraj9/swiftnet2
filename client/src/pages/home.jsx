import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "../components/ui/interactive-grid-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import Navbar from "../components/navbar"; // Add this import
import { AnimatedBeamMultipleOutputDemo } from "../components/beams";
import { MagicCard } from "@/components/ui/magic-card";
import Footer from "../components/footer";
import {usePrivy} from '@privy-io/react-auth';
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
        <>
            <Navbar />
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <h1
                    className="z-10 whitespace-pre-wrap text-center lg:text-8xl md:text-7xl text-4xl font-bold bg-gradient-to-br from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] bg-clip-text text-transparent dark:text-white"
                >
                    SwiftNet
                </h1>
                <p
                    className="z-10 lg:w-1/3 md:w-1/2 w-full text-center text-xl leading-relaxed my-4"
                >
                    Dynamic platform that seamlessly integrates multiple AI agents for smarter and more accurate results.
                </p>

                <div className="z-10 mt-8">
                    <ShimmerButton className="shadow-2xl" onClick={handleLogin}>
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Get Started
                        </span>
                    </ShimmerButton>
                </div>

                <InteractiveGridPattern
                    width={60}
                    height={60}
                    squares={[40, 40]}
                    squaresClassName="hover:fill-indigo-50/50"
                    className={"h-screen"}
                />
            </div>
            <div className="bg-gradient-to-b from-[#434343] to-[#000000]">
                <div className="min-h-screen container mx-auto py-[15rem]">

                    <h2 className=" pt-[8rem] bg-gradient-to-br from-[#ef32d9] to-[#89fffd] bg-clip-text text-transparent font-bold text-6xl text-center">
                        Be 5x more Productive
                    </h2>

                    <p className="text-center text-xl mx-auto my-8 w-full text-white leading-relaxed">
                        Worl like never before elevate your tasks by power or specialized agents working together to complete your work. Precise and Reliable results increased your productivity rate by several folds. The only platform you will ever need
                    </p>

                    <AnimatedBeamMultipleOutputDemo className={" my-10"} />
                </div>
            </div>
            <div className="">
                <div className=" container mx-auto">
                    <h2 className=" pt-[8rem] mb-[8rem] py-8 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent font-bold text-6xl text-center">
                        Multi Agent for Multi Purpose
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 min-h-screen gap-6">
                        <MagicCard
                            className="cursor-pointer flex-col items-center justify-center p-6 shadow-2xl "
                            gradientColor={"#D9D9D955"}
                        >
                            <img width="60" height="60" className="mx-auto" src="https://img.icons8.com/ios/50/grand-master-key.png" alt="grand-master-key" />
                            <h3 className="text-2xl font-semibold text-center py-4 text-gray-800">
                                Task Master
                            </h3>
                            <p className="px-4 text-center text-gray-600">
                                Oversees task delegation, guiding agents to complete tasks effectively and on time.
                            </p>
                        </MagicCard>

                        <MagicCard
                            className="cursor-pointer flex-col items-center justify-center p-6 shadow-2xl "
                            gradientColor={"#D9D9D955"}
                        >
                            <img width="60" height="60" className="mx-auto" src="https://img.icons8.com/ink/48/bot.png" alt="grand-master-key" />
                            <h3 className="text-2xl font-semibold text-center py-4 text-gray-800">
                                Browser Bot
                            </h3>
                            <p className="px-4 text-center text-gray-600">
                                Automates browsing tasks such as data scraping, form filling, and web navigation for efficiency.
                            </p>
                        </MagicCard>

                        <MagicCard
                            className="cursor-pointer flex-col items-center justify-center p-6 shadow-2xl "
                            gradientColor={"#D9D9D955"}
                        >
                            <img width="60" height="60" className="mx-auto" src="https://img.icons8.com/hatch/64/detective.png" alt="grand-master-key" />
                            <h3 className="text-2xl font-semibold text-center py-4 text-gray-800">
                                File Scout
                            </h3>
                            <p className="px-4 text-center text-gray-600">
                                Organizes and categorizes files for quick retrieval, enhancing workflow efficiency and accessibility.
                            </p>
                        </MagicCard>

                        <MagicCard
                            className="cursor-pointer flex-col items-center justify-center p-6 shadow-2xl "
                            gradientColor={"#D9D9D955"}
                        >
                            <img width="60" height="60" className="mx-auto" src="https://img.icons8.com/external-others-maxicons/62/external-blacksmith-greek-mythology-others-maxicons-3.png" alt="grand-master-key" />
                            <h3 className="text-2xl font-semibold text-center py-4 text-gray-800">
                                Code Smith
                            </h3>
                            <p className="px-4 text-center text-gray-600">
                                Develops and refines code, crafting efficient software solutions and ensuring optimal performance.
                            </p>
                        </MagicCard>

                        <MagicCard
                            className="cursor-pointer flex-col items-center justify-center p-6 shadow-2xl "
                            gradientColor={"#D9D9D955"}
                        >
                            <img width="60" height="60" className="mx-auto" src="https://img.icons8.com/ios-filled/50/run-command.png" alt="grand-master-key" />
                            <h3 className="text-2xl font-semibold text-center py-4 text-gray-800">
                                Shell Commander
                            </h3>
                            <p className="px-4 text-center text-gray-600">
                                Executes system commands and automates terminal tasks, enhancing workflow with streamlined processes.
                            </p>
                        </MagicCard>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home