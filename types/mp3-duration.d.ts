declare module "mp3-duration" {
  export default function getMP3Duration(filePath: string): Promise<number>;
}
