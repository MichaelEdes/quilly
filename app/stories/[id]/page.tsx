import { getStory, getAllStories } from "@/lib/stories";
import { notFound } from "next/navigation";
import React from "react";
import Story from "@/components/Story";

interface StoryPageProps {
  params: {
    id: string;
  };
}

function StoryPage({ params: { id } }: StoryPageProps) {
  const decodedID = decodeURIComponent(id);
  const story = getStory(decodedID);

  if (!story) {
    return notFound();
  }

  return <Story story={story} />;
}

export default StoryPage;

export async function generateStaticParams(): Promise<
  { params: { id: string } }[]
> {
  const stories = getAllStories();

  return stories.map((story) => ({
    params: { id: encodeURIComponent(story.story) }
  }));
}
