import { Story, Page } from "@/types/stories";
import fs from "fs";
import path from "path";
import cleanTitle from "./cleanTitle";

const storiesDirectory = path.join(process.cwd(), "public/stories");

export function getAllStories(): Story[] {
  if (!fs.existsSync(storiesDirectory)) {
    return [];
  }

  const storyFolders = fs.readdirSync(storiesDirectory);

  const stories: Story[] = storyFolders
    .filter((storyFolder) => {
      const storyPath = path.join(storiesDirectory, storyFolder);
      return fs.statSync(storyPath).isDirectory(); // Ensure it's a directory
    })
    .map((storyFolder) => {
      const storyPath = path.join(storiesDirectory, storyFolder);
      const files = fs.readdirSync(storyPath);

      const pages: Page[] = [];
      const pageMap: { [key: string]: Partial<Page> } = {};
      let genre = "";
      let synopsis = "";
      let audio: string | null = null;

      files.forEach((file) => {
        const filePath = path.join(storyPath, file);
        const type = path.extname(file).substring(1);
        const pageNumber = file.match(/page(\d+)\./)?.[1];

        if (pageNumber) {
          if (!pageMap[pageNumber]) {
            pageMap[pageNumber] = {};
          }

          if (type === "txt") {
            pageMap[pageNumber].txt = fs.readFileSync(filePath, "utf8");
          } else if (type === "png") {
            pageMap[pageNumber].png = `/stories/${storyFolder}/${file}`;
          } else if (type === "mp3") {
            const fileStats = fs.statSync(filePath);
            if (fileStats.size > 500) {
              pageMap[pageNumber].mp3 = `/stories/${storyFolder}/${file}`;
            }
          }
        }

        if (type === "mp3" && file === "audio.mp3") {
          const fileStats = fs.statSync(filePath);
          if (fileStats.size > 500) {
            audio = `/stories/${storyFolder}/${file}`;
          }
        }

        if (file === "details.txt") {
          const detailsContent = fs.readFileSync(filePath, "utf8");
          const genreMatch = detailsContent.match(/genre:\s*(.+)/);
          const synopsisMatch = detailsContent.match(/synopsis:\s*(.+)/);

          if (genreMatch) {
            genre = genreMatch[1].trim();
          }
          if (synopsisMatch) {
            synopsis = synopsisMatch[1].trim();
          }
        }
      });

      Object.keys(pageMap).forEach((pageNumber) => {
        if (
          (pageMap[pageNumber].txt && pageMap[pageNumber].png) ||
          (pageMap[pageNumber].mp3 &&
            pageMap[pageNumber].txt &&
            pageMap[pageNumber].png)
        ) {
          pages.push(pageMap[pageNumber] as Page);
        }
      });

      return {
        story: cleanTitle(storyFolder),
        pages,
        genre,
        synopsis,
        audio,
        hasAudio: !!audio
      };
    });

  const storiesWithPages = stories.filter((story) => story.pages.length > 0);

  return storiesWithPages;
}

export const getStory = (story: string): Story | undefined => {
  const stories = getAllStories();
  return stories.find((s) => s.story === story);
};
