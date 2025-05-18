import { Article } from "@/app/types";
import { newsData } from "./newsData";

export async function fetchArticles(): Promise<Article[]> {
  // Имитация задержки загрузки данных
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return newsData;
} 