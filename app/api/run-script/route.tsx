import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import groe from "@/lib/gptScriptInstance";

const script = "app/api/run-script/story-book.gpt";

export async function POST(request: NextRequest) {
  try {
    const { storyName, storyGenre, storyPages, story, path } =
      await request.json();

    if (!storyName || !storyGenre || !storyPages || !story || !path) {
      return new Response("Missing required fields in the request", {
        status: 400
      });
    }

    const opts: RunOpts = {
      disableCache: true,
      input: `--storyName "${storyName}" --storyGenre "${storyGenre}" --story "${story}" --page ${storyPages} --path "${path}"`
    };

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          const run = await groe.run(script, opts);
          run.on(RunEventType.Event, (data) => {
            console.log("Received Event:", data);
            controller.enqueue(
              encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
            );
          });
        } catch (error) {
          console.error("Error during script execution:", error);
          controller.error(new Error(`Error during stream creation`));
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
      }
    });
  } catch (error) {
    console.error("Failed to create story:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to create story"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
