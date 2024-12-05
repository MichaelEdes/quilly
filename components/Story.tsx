"use client";

import React, { useRef, useState } from "react";
import { Story as StoryType } from "@/types/stories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Image from "next/image";
import { ArrowLeft, ExpandIcon, Shrink } from "lucide-react";
import Link from "next/link";

interface Props {
  story: StoryType;
}

const Story = ({ story }: Props) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div
      className={`flex flex-col h-full  ${
        fullscreen &&
        "fixed w-full h-full top-0 z-[101] bg-black items-center justify-start overflow-scroll"
      }`}
    >
      {!fullscreen && (
        <Link
          href="/stories"
          className="flex group w-fit  flex-row text-white px-[77px] mt-[30px] hover:underline underline-white"
        >
          <ArrowLeft className="relative group-hover:right-[30px] duration-150 right-0" />
          Back
        </Link>
      )}
      <Carousel className="max-w-[clamp(80vw,90vw,800px)] mx-auto py-[40px] my-auto">
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
                <div>
                  {!fullscreen ? (
                    <ExpandIcon
                      className="w-[40px] hover:scale-110 hover:ring-2 ring-purple-500 duration-200 h-[40px] absolute top-2 left-2 bg-white p-2 rounded-full cursor-pointer"
                      onClick={() => setFullscreen(true)}
                    />
                  ) : (
                    <Shrink
                      className="w-[40px] hover:scale-110 hover:ring-2 ring-purple-500 duration-200 h-[40px] absolute top-2 left-2 bg-white p-2 rounded-full cursor-pointer"
                      onClick={() => setFullscreen(false)}
                    />
                  )}
                </div>
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
