"use client";

import React, { useRef } from "react";
import { Story as StoryType } from "@/types/stories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  story: StoryType;
}

const Story = ({ story }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="flex flex-col h-full">
      <Link
        href="/stories"
        className="flex group w-fit  flex-row text-white px-[77px] mt-[30px] hover:underline underline-white"
      >
        <ArrowLeft className="relative group-hover:right-[30px] duration-150 right-0" />
        Back
      </Link>
      <Carousel className="max-w-[clamp(80vw,90vw,800px)] mx-auto py-[40px]">
        <CarouselContent>
          {story.pages.map((page, index) => (
            <CarouselItem
              key={index}
              className={`grid gap-[1px] ${
                page.txt.length > 2100 ? "" : "grid-cols-2"
              }`}
            >
              <div className="relative">
                {story.pages[index].mp3 && (
                  <div className="flex items-center justify-center mt-6 absolute bottom-[40px] left-0 z-20 right-0">
                    <audio
                      ref={audioRef}
                      src={story.pages[index].mp3}
                      preload="metadata"
                      controls
                    />
                  </div>
                )}
                <Image
                  width={1000}
                  height={1000}
                  src={page.png}
                  alt={`Page ${index + 1} of ${story.story}`}
                  className={`w-full h-full object-cover ${
                    page.txt.length > 1500 ? "rounded-xl " : "rounded-r-3xl"
                  }`}
                />
              </div>

              <pre
                className={`p-4 text-xs leading-[30px] font-light font-eb-garamond whitespace-wrap text-wrap bg-white ${
                  index === 0 && "first-letter:text-4xl"
                } ${page.txt.length > 1500 ? "rounded-xl" : "rounded-l-3xl"}`}
              >
                {page.txt}
              </pre>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Story;
