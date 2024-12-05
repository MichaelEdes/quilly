import React from "react";
import { Story } from "@/types/stories";
import { getAllStories } from "@/lib/stories";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Headphones } from "lucide-react";
import StoriesFilter from "@/components/StoriesFilter";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";

interface StoriesProps {
  searchParams: {
    genre?: string;
    search?: string;
    audio?: boolean | undefined;
  };
}

export const revalidate = 0;

function Stories({ searchParams }: StoriesProps) {
  const allStories: Story[] = getAllStories();

  const storyGenre = searchParams.genre || "";
  const searchTerm = searchParams.search || "";
  const hasAudio =
    searchParams.audio !== undefined ? searchParams.audio : undefined;

  // Filter stories server-side based on query parameters
  const filteredStories = allStories.filter((story) => {
    const matchesGenre = storyGenre ? story.genre === storyGenre : true;
    const matchesSearch = searchTerm
      ? story.story.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesAudio =
      hasAudio === undefined
        ? true
        : hasAudio
        ? story.pages[0].mp3
        : !story.pages[0].mp3;

    return matchesGenre && matchesSearch && matchesAudio;
  });

  return (
    <div className="p-4 lg:px-[70px]">
      <h2 className="text-2xl text-white mb-6">Stories</h2>

      {/* Search Input */}
      <form method="get" className="mb-6">
        <Input
          type="text"
          name="search"
          placeholder="Search for a story"
          defaultValue={searchTerm}
          className="w-full"
        />
        <button type="submit" className="hidden"></button>
      </form>

      <div className="flex flex-row gap-6">
        {/* Genre and Audio Filters */}
        <StoriesFilter
          initialGenre={storyGenre}
          initialSearch={searchTerm}
          initialAudio={hasAudio}
        />

        {/* Stories Grid */}
        <div className="flex flex-col gap-6 w-full h-full">
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
              {filteredStories.map((story, index) => (
                <div
                  key={index}
                  className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-lg hover:shadow-gray-400 duration-200 w-full"
                >
                  <HoverCard>
                    <HoverCardTrigger
                      href={`/stories/${encodeURIComponent(story.story)}`}
                    >
                      <div className="relative h-[200px] flex items-center justify-center">
                        <div className="flex flex-col gap-4 absolute top-2 right-2">
                          <p className="flex bg-white items-center py-1.5 px-3 rounded-full z-10 text-sm font-medium">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {story.pages.length === 1
                              ? `${story.pages.length} page`
                              : `${story.pages.length} pages`}
                          </p>
                        </div>
                        {story.pages[0].mp3 && (
                          <div className="bg-white text-sm rounded-full flex items-center justify-center p-2 absolute top-12 right-2 flex flex-row gap-[10px]">
                            <Headphones width={20} height={20} />
                            Audio
                          </div>
                        )}
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
                    </HoverCardTrigger>
                    <HoverCardContent className="w-full flex flex-grow max-w-[300px]">
                      {story.synopsis}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full items-center justify-center 0 min-h-[400px] flex flex-col text-white">
              No Books Found
              <Link
                href="/stories"
                className="w-full text-center text-sm text-blue-600 hover:underline my-4"
              >
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stories;
