import Hero from "@/components/Hero";
import StoryWindow from "@/components/StoryWindow";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-stretch">
      <Hero />
      <div>
        <StoryWindow />
      </div>
    </main>
  );
}
