export interface MediaImage {
  src: string;
  width: number;
  height: number;
}

export interface ImageMedia {
  type: "PHOTO";
  image: MediaImage;
}

export interface ExternalLink {
  type: "LINK";
  image: MediaImage;
  caption: string;
  titleLink: string;
  description: string;
  link: string;
}

export type MediaContent = ImageMedia | ExternalLink;

export interface Article {
  id: number;
  text: string;
  date: number;
  type: string;
  attachments?: MediaContent[];
}
