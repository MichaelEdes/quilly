import React from "react";
import { Story } from "@/types/stories";
import { getAllStories } from "@/lib/stories";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

export const revalidate = 0;

function Stories() {
  const stories: Story[] = getAllStories();

  console.log("All Stories:", stories); // Debugging line

  return (
    <div className="p-4 lg:px-[70px]">
      <h2 className="text-2xl text-white mb-6">Stories</h2>
      <Input className="my-[30px]" placeholder="Search for a story" />
      <div className="flex flex-row gap-6">
        <div className="w-[280px] shrink-0 bg-gray-800 rounded-lg h-[300px]"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {stories.map((story, index) => (
            <Link
              key={index}
              href={`/stories/${encodeURIComponent(story.story)}`}
              className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-lg hover:shadow-gray-400 duration-200"
            >
              <div className="relative h-[200px] flex items-center justify-center">
                <p className="flex bg-white items-center py-1.5 px-3 rounded-full absolute top-4 right-4 z-10 text-sm font-medium">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {story.pages.length === 1
                    ? `${story.pages.length} page`
                    : `${story.pages.length} pages`}
                  genre: {story.genre}
                </p>
                <Image
                  className="transition-transform duration-300 object-cover w-full h-full"
                  src={story.pages[0].png}
                  alt={story.story}
                  width={300}
                  height={300}
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-base font-semibold text-white truncate">
                  {story.story}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stories;
