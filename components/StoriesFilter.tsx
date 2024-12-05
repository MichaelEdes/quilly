"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Genres } from "@/types/stories";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface StoriesFilterProps {
  initialGenre: string;
  initialSearch: string;
  initialAudio: boolean | undefined;
}

function StoriesFilter({
  initialGenre,
  initialSearch,
  initialAudio
}: StoriesFilterProps) {
  const [genre, setGenre] = useState(initialGenre || "all");
  const [search, setSearch] = useState(initialSearch || "");
  const [audio, setAudio] = useState(initialAudio ?? false); // Ensure audio is a boolean
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (genre && genre !== "all") params.set("genre", genre); // Exclude "all"
    if (search) params.set("search", search);
    if (audio) params.set("audio", "true"); // Only add "audio" if it is true

    router.push(`/stories?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setGenre("all");
    setSearch("");
    setAudio(false);
    router.push(`/stories`); // Navigate back to the unfiltered stories page
  };

  const areFiltersActive = genre !== "all" || audio || search !== "";

  return (
    <div className="w-[280px] shrink-0 bg-gray-800 rounded-lg h-[400px] p-4 sticky top-[20px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full pt-3">
        {/* Audio Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="audio"
            checked={audio} // Ensure audio is a boolean
            onCheckedChange={(checked) =>
              setAudio(checked === "indeterminate" ? false : !!checked)
            }
          />
          <label
            htmlFor="audio"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
          >
            Audio Stories Only
          </label>
        </div>

        {/* Genre Filter */}
        <Select value={genre} onValueChange={(value) => setGenre(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genres</SelectLabel>
              <SelectItem value="all">All Genres</SelectItem>
              {Object.values(Genres).map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <Button
            disabled={!areFiltersActive}
            type="submit"
            variant={"outline"}
            className="w-full"
          >
            Apply Filters
          </Button>
          <Button
            type="button"
            disabled={!areFiltersActive}
            variant="default"
            onClick={handleClearFilters}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StoriesFilter;
