import React from "react";
import { Story } from "@/types/stories";
import { getAllStories } from "@/lib/stories";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Headphones } from "lucide-react";
import { Genres } from "@/types/stories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";

interface StoriesProps {
  searchParams: {
    genre?: string | undefined;
    search?: string | undefined;
    audio?: string | undefined;
  };
}

export const revalidate = 0;

function Stories({ searchParams }: StoriesProps) {
  const allStories: Story[] = getAllStories();

  const storyGenre = searchParams.genre || undefined;
  const searchTerm = searchParams.search || "";
  const audioFilter = searchParams.audio || undefined; // "all", "true", or "false"

  // Filter stories server-side based on query parameters
  const filteredStories = allStories.filter((story) => {
    const matchesGenre = storyGenre ? story.genre === storyGenre : true;
    const matchesSearch = searchTerm
      ? story.story.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesAudio =
      audioFilter === "all"
        ? undefined // Include all stories
        : audioFilter === "true"
        ? !!story.audio // Include only stories with audio
        : audioFilter === "false"
        ? !story.audio // Include only stories without audio
        : true;

    return matchesGenre && matchesSearch && matchesAudio === true;
  });

  // Check if there are active filters
  const hasFilters = storyGenre !== "" || searchTerm || audioFilter !== "";

  return (
    <div className="p-4 lg:px-[70px]">
      <h2 className="text-2xl text-white mb-6">
        {filteredStories.length} Stories
      </h2>

      <div className="flex flex-row gap-6">
        {/* Genre Filter */}
        <div className="w-[280px] shrink-0 bg-gray-800 rounded-lg h-full p-4 sticky top-[40px]">
          <form method="get" className="flex flex-col gap-6">
            {/* Genre Filter */}
            <Select name="genre" defaultValue={storyGenre}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Genres</SelectLabel>
                  <SelectItem key="none" value={"all"}>
                    All Genres
                  </SelectItem>
                  {Object.values(Genres).map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Audio Filter */}
            <Select name="audio" defaultValue={audioFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Audio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Audio</SelectLabel>
                  <SelectItem key="none" value="all">
                    All
                  </SelectItem>
                  <SelectItem key="true" value="true">
                    With Audio
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    Without Audio
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Apply Filters
            </Button>

            {/* Clear Filters Button */}
            {hasFilters && (
              <Link
                href="/stories"
                className="w-full text-center text-sm text-blue-600 hover:underline"
              >
                Clear Filters
              </Link>
            )}
          </form>
        </div>

        {/* Stories Grid */}
        <div className="flex flex-col gap-6 w-full h-full">
          {/* Search Input */}
          <Input
            type="text"
            name="search"
            placeholder="Search for a story"
            defaultValue={searchTerm}
            className="w-full "
          />
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
                        {story.audio && (
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
            <div className="w-full h-full items-center justify-center min-h-[400px] flex flex-col text-white">
              No Books Found
              {hasFilters && (
                <Link
                  href="/stories"
                  className="w-full text-center text-sm text-blue-600 hover:underline my-4"
                >
                  Clear Filters
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stories;
