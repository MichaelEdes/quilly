import Hero from "@/components/Hero";
import StoryWindow from "@/components/StoryWindow";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-stretch scroll-smooth pb-[100px]">
      <Hero />
      <div>
        <StoryWindow />
      </div>
    </main>
  );
}
