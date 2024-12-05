import React from "react";
import { Story as StoryType } from "@/types/stories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Image from "next/image";
interface Props {
  story: StoryType;
}

const Story = ({ story }: Props) => {
  return (
    <div className="flex h-full ">
      <Carousel className="max-w-[clamp(80vw,90vw,800px)] mx-auto my-auto py-[40px]">
        <CarouselContent>
          {story.pages.map((page, index) => (
            <CarouselItem
              key={index}
              className={`grid  gap-[1px] ${
                page.txt.length > 1500 ? "" : "grid-cols-2"
              }`}
            >
              <Image
                width={1000}
                height={1000}
                src={page.png}
                alt={`Page ${index + 1} of ${story.story}`}
                className={`w-full h-full object-cover ${
                  page.txt.length > 1500 ? "rounded-xl " : "rounded-r-3xl"
                }`}
              />
              <pre
                className={`p-4 text-sm leading-[30px] font-light font-eb-garamond whitespace-wrap text-wrap bg-white  ${
                  index === 0 && "first-letter:text-4xl"
                }   ${page.txt.length > 1500 ? "rounded-xl" : "rounded-l-3xl"}`}
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
