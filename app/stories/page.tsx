import React from "react";
import { Story } from "@/types/stories";
import { getAllStories } from "@/lib/stories";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface StoriesProps {
  searchParams: {
    genre?: string;
    search?: string;
  };
}

export const revalidate = 0;

function Stories({ searchParams }: StoriesProps) {
  const allStories: Story[] = getAllStories();

  const storyGenre = searchParams.genre || "";
  const searchTerm = searchParams.search || "";

  // Filter stories server-side based on query parameters
  const filteredStories = allStories.filter((story) => {
    const matchesGenre = storyGenre ? story.genre === storyGenre : true;
    const matchesSearch = searchTerm
      ? story.story.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesGenre && matchesSearch;
  });

  // Check if there are active filters
  const hasFilters = storyGenre || searchTerm;

  return (
    <div className="p-4 lg:px-[70px]">
      <h2 className="text-2xl text-white mb-6">Stories</h2>

      <div className="flex flex-row gap-6">
        {/* Genre Filter */}
        <div className="w-[280px] shrink-0 bg-gray-800 rounded-lg h-full p-4 sticky top-[40px]">
          <form method="get" className="flex flex-col gap-6">
            {/* Genre Filter */}
            <Select name="genre" defaultValue={storyGenre}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Genres</SelectLabel>
                  {Object.values(Genres).map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Apply Filters
            </Button>

            {/* Clear Filters Button */}
            {hasFilters && (
              <a
                href="/stories"
                className="w-full text-center text-sm text-blue-600 hover:underline"
              >
                Clear Filters
              </a>
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
          ) : (
            <div className="w-full h-full items-center justify-center 0 min-h-[400px] flex flex-col text-white">
              No Books Found
              {hasFilters && (
                <a
                  href="/stories"
                  className="w-full text-center text-sm text-blue-600 hover:underline my-4"
                >
                  Clear Filters
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stories;
