export const dynamic = "force-dynamic";

import { newsData } from "@/lib/newsData";
import NewsDetail from "@/components/NewsDetail/NewsDetail";
import { notFound } from "next/navigation";

export default async function RandomNewsPage() {
  const randomIndex = Math.floor(Math.random() * newsData.length);
  const randomNews = newsData[randomIndex];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!randomNews) {
    notFound();
  }

  return <NewsDetail news={randomNews} />;
}
