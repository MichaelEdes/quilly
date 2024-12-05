import { ArrowDown } from "lucide-react";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-gray-100 w-full">
        <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7 lg:px-[70px]">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
              Generate Your Own Stories In{" "}
              <span className="text-purple-500">Seconds</span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
              Let your wildest thoughts take on a life of their own where you
              can be the author of your very own AI-generated book!
            </p>
            <a
              href="#create-story"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-purple-500 from-purple-400 to-blue-900 hover:bg-purple-700 hover:ring-4 hover:ring-purple-500 duration-200"
            >
              Create My Story
              <ArrowDown className="w-[20px] ml-[10px]" />
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="https://github.com/MichaelEdes/quilly/blob/main/app/assets/books-hero.png?raw=true"
              alt="mockup"
              width={500}
              height={600}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
