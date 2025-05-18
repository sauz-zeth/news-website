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
  title: string;
  text: string;
  date: number;
  publicationDate: string;
  type: string;
  category?: string;
  content: string[];
  media?: {
    type: 'image' | 'video';
    url: string;
    id: string;
  }[];
  externalResources?: {
    title: string;
    url: string;
  }[];
  attachments?: MediaContent[];
}
