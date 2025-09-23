"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function IntroPage() {
    const [showContent, setShowContent] = useState(false);
    const [typedText, setTypedText] = useState("");
    const fullText =
        "Your one-stop platform for vehicle services and parts, with 10–15 minute delivery support.";

    // Typing effect
    useEffect(() => {
        let index = 0;
        const typingTimer = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(typingTimer);
                setShowContent(true);
            }
        }, 50);
        return () => clearInterval(typingTimer);
    }, []);


    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 overflow-hidden px-4 text-center">

            {/* Moving Road Layer */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-40 bg-repeat-x z-10"
                style={{
                    backgroundImage: "url('/road.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "0 bottom",
                }}
                animate={{ backgroundPositionX: ["0px", "-1000px"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />

            {/* Logo */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="z-20 mb-8 sm:mb-12"
            >
                <Image
                    src="/logo.png"
                    alt="CarWoosh Logo"
                    width={300}
                    height={120}
                    className="w-auto h-28 sm:h-36 md:h-44 object-contain"
                    priority
                />
            </motion.div>

            {/* Typing Text */}
            <motion.p className="text-gray-800 text-lg sm:text-xl md:text-2xl font-semibold max-w-xl z-20">
                {typedText}
            </motion.p>

            {/* Moving Car */}
            <motion.div
                initial={{ x: "-120vw" }} // start fully off-screen
                animate={{ x: "20%" }} // animate only horizontal movement
                transition={{ type: "spring", stiffness: 60, damping: 15, delay: 1 }}
                className="absolute bottom-24 w-32 sm:w-40 md:w-48 z-20 translate-y-[48px]" // ✅ force correct vertical position from start
            >
                <Image
                    src="/car.png"
                    alt="Car Driving"
                    width={200}
                    height={100}
                    className="w-full h-auto"
                />
            </motion.div>


            {/* CTA Buttons */}
            {showContent && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center gap-4 z-20"
                >
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                        Log In
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
