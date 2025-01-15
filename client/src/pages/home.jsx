import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "../components/ui/interactive-grid-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import Navbar from "../components/navbar"; // Add this import

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <h1
                    className="z-10 whitespace-pre-wrap text-center lg:text-8xl md:text-7xl text-4xl font-bold text-gray-700 dark:text-white"
                >
                    SwiftNet
                </h1>
                <p
                    className="z-10 lg:w-1/3 md:w-1/2 w-full text-center text-xl leading-relaxed my-4"
                >
                    Dynamic platform that seamlessly integrates multiple AI agents for smarter and more accurate results.
                </p>

                <div className="z-10 mt-8">
                    <ShimmerButton className="shadow-2xl">
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
                />
            </div>
        </>
    )
}

export default Home