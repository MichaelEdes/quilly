import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import groe from "@/lib/gptScriptInstance";

const script = "app/api/run-script/story-book.gpt";
export async function POST(request: NextRequest) {
  const { storyName, storyGenre, storyPages, story, path } =
    await request.json();

  const opts: RunOpts = {
    disableCache: true,
    input: `--storyName ${storyName} --storyGenre ${storyGenre} --story ${story} --page ${storyPages} --path ${path}`
  };

  try {
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          const run = await groe.run(script, opts);
          run.on(RunEventType.Event, (data) => {
            controller.enqueue(
              encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
            );
          });
        } catch (error) {
          controller.error(new Error(`Error during stream creation: ${error}`));
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    });
  } catch {
    return new Response("Failed to create story", { status: 500 });
  }
}
