import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-gray-900 w-full">
        <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7 lg:px-[70px]">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              Generate Your Own Stories In Seconds
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl">
              Let your wildest thoughts take on a life of their own where you
              can be the author of your very own AI-generated book!
            </p>
            <a
              href="#create-story"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-tr from-purple-400 to-blue-900 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900"
            >
              Create My Story
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="https://github.com/MichaelEdes/quilly/blob/main/app/assets/books-hero.png"
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
