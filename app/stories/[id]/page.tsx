import { getStory } from "@/lib/stories";
import { notFound } from "next/navigation";
import React from "react";
import { getAllStories } from "@/lib/stories";
import Story from "@/components/Story";
interface StoryPageProps {
  params: {
    id: string;
  };
}

function StoryPage({ params: { id } }: StoryPageProps) {
  const decodeID = decodeURIComponent(id);

  const story = getStory(decodeID);

  if (!story) {
    return notFound();
  }

  return <Story story={story} />;
}

export default StoryPage;

export async function generateStaticParams() {
  const stories = getAllStories();

  const paths = stories.map((story) => ({
    id: story.story
  }));

  return paths;
}
