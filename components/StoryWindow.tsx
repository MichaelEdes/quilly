"use client";
import React from "react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Frame } from "@gptscript-ai/gptscript";
import renderEventMessage from "@/lib/renderEventMessage";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import cleanTitle from "@/lib/cleanTitle";

function StoryWindow() {
  const genre = [
    "Fiction",
    "Non-Fiction",
    "Adventure",
    "Mystery",
    "Science Fiction",
    "Horror",
    "Thriller",
    "Romance",
    "Comedy",
    "Drama",
    "Crime",
    "Sci-Fi",
    "Children's Books",
    "Biographies",
    "Autobiographies"
  ];

  const storiesPath = "public/stories";
  const [storyName, setStoryName] = useState<string>("");
  const [storyGenre, setStoryGenre] = useState<string>("");
  const [storyPages, setstoryPages] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [writing, setWriting] = useState<boolean | null>(null); //Run Started
  const [script, setScript] = useState<string>(""); // Progress
  const [currentTool, setCurrentTool] = useState<string>(""); //Current Tool
  const [writingComplete, setWritingComplete] = useState<boolean | null>(null); //Progress Complete
  const [events, setEvents] = useState<Frame[]>([]);

  async function runScript() {
    setWriting(true);
    setWritingComplete(false);

    const response = await fetch("/api/run-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyName,
        storyGenre,
        storyPages,
        story,
        path: storiesPath
      })
    });

    if (response.ok && response.body) {
      console.log("streaming script");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      handleStream(reader, decoder);
    } else {
      setWritingComplete(true);
      setWriting(false);
    }
  }

  async function handleStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    decoder: TextDecoder
  ) {
    let buffer = ""; // Accumulate incomplete chunks

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk; // Append chunk to the buffer

      const events = buffer
        .split("\n\n")
        .filter((line) => line.startsWith("event: "))
        .map((line) => line.replace(/^event: /, ""));

      events.forEach((event) => {
        try {
          const parsedData = JSON.parse(event); // Parse the JSON

          if (parsedData.type === "callProgress") {
            setScript(parsedData.output[parsedData.output.length - 1].content);
          } else if (parsedData.type === "callStart") {
            setCurrentTool(parsedData.tool?.description);
          } else if (parsedData.type === "runFinish") {
            setWritingComplete(true);
            setWriting(false);
            setStoryName("");
            setStoryGenre("");
            setstoryPages("");
            setStory("");
            // Show toast on completion
            toast("Your story has been generated!", {
              description: `${cleanTitle(storyName)}`,
              duration: 20000,
              action: {
                label: "View Story",
                onClick: () => {
                  window.open(`/stories/${cleanTitle(storyName)}`, "_blank");
                }
              }
            });
          } else {
            setEvents((prevEvents) => [...prevEvents, parsedData]);
          }
        } catch (error) {
          console.log("");
        }
      });

      // Retain only the last incomplete chunk in the buffer
      buffer = buffer.split("\n\n").slice(-1)[0];
    }
  }

  return (
    <>
      <Toaster />
      <div
        id="create-story"
        className="grid w-[100vw] md:grid-cols-2 gap-[10px] px-0 lg:px-[70px]"
      >
        <div className="order-1 bg-gray-9-0 px-4 rounded-lg">
          <section className="flex flex-col gap-[20px] text-white">
            <h2 className="text-gray-400">Enter your story details here</h2>
            <Input
              value={storyName}
              disabled={writing ? true : false}
              onChange={(e) => setStoryName(e.target.value)}
              placeholder="The Boy, The Dragon, and The Wizard"
              className="bg-gray-700 placeholder:text-gray-400 border-0 duration-150 hover:ring-2 ring-gray-200"
            />
            <Select
              value={storyGenre}
              disabled={writing ? true : false}
              onValueChange={(value) => setStoryGenre(value)}
            >
              <SelectTrigger className="w-full bg-gray-700 duration-150 border-0 hover:ring-2 ring-gray-200">
                <SelectValue placeholder="Select A Genre" className="" />
              </SelectTrigger>
              <SelectContent className="w-full bg-gray-700  border-0  duration-150  hover:ring-2 ring-gray-200 p-0 text-gray-200">
                <SelectGroup className="w-full ">
                  {genre.map((item) => (
                    <SelectItem key={item} value={item} className="p-2">
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              disabled={writing ? true : false}
              value={storyPages}
              onValueChange={(value) => setstoryPages(value)}
            >
              <SelectTrigger className="w-full bg-gray-700 duration-150 border-0 hover:ring-2 ring-gray-200">
                <SelectValue
                  placeholder="Select Number Of Pages"
                  className=""
                />
              </SelectTrigger>
              <SelectContent className="w-full bg-gray-700  border-0  duration-150  hover:ring-2 ring-gray-200 p-0 text-gray-200">
                <SelectGroup className="w-full ">
                  {Array.from({ length: 100 }, (_, i) => i + 1).map((item) => (
                    <SelectItem key={item} value={String(item)} className="p-2">
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              disabled={writing ? true : false}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="bg-gray-700 text-white  border-0 hover:ring-2 ring-gray-200 duration-150  placeholder:text-gray-400 p-4 min-h-[250px]"
              placeholder="write a story about a boy who defeats a dragon in a cave with the help of a magic wizard..."
            />
            <Button
              onClick={runScript}
              disabled={
                !story || !storyGenre || !storyPages || !storyName || writing
                  ? true
                  : false
              }
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-tr from-purple-400 to-blue-900 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900 "
            >
              {writing ? "Generating..." : "Generate Story"}{" "}
              <i className="fa-solid fa-feather"></i>{" "}
            </Button>
          </section>
        </div>
        <div className="order-2 bg-black/40 rounded-lg p-4 text-white flex flex-col-reverse font-light font-source text-xs overflow-y-scroll max-h-[535px]">
          <div>
            {writing === null && (
              <>
                <p className="animate-pulse">
                  Generate a story to start the process!
                </p>
                <br />
              </>
            )}
            <span className="mr-5 my-4">{">>"}</span>
            {script}
          </div>

          {/* Current Tool */}

          {currentTool && (
            <div>
              <span>{"----- [Current Tool] -----"}</span>
              {currentTool}
            </div>
          )}

          {/* Render Events  */}
          <div>
            {events.map((event, index) => (
              <div key={`${event.id} ${index}` || `${event} ${index}`}>
                <span className="mr-5 my-4">{">>"}</span>
                {renderEventMessage(event)}
              </div>
            ))}
          </div>

          {writing && (
            <div>
              <span>{"----- [Quilly has started] -----"}</span>
              <br></br>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StoryWindow;
