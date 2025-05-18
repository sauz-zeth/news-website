import { Article } from "./types";
import { newsData } from "@/lib/newsData";

export async function fetchArticles(): Promise<Article[]> {
  // В реальном приложении здесь был бы запрос к API
  return newsData;
} 