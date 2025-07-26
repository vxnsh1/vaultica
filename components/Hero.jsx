"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import GradientText from "./ui/gradienttext";
import { useEffect, useRef } from "react";

const Hero = () => {
  const imageRef = useRef();
  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="pb-20 px-4 pt-10">
      <div className="container mx-auto text-center">
        <GradientText className="text-5xl font-bold md:text-8xl lg:text-[105px] pb-6 ">
          Your Finances, <br /> Faster than ever.
        </GradientText>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An intelligent finance tracker that helps you monitor, understand, and
          improve your spending habits.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="px-8 cursor-pointer">
            Get Started
          </Button>
        </Link>
        <div className="hero-image-wrapper overflow-hidden">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/robot.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
