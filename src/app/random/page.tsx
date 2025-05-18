export const dynamic = "force-dynamic";

import { newsData } from "@/lib/newsData";
<<<<<<< HEAD
import NewsDetail from "@/components/NewsDetail/NewsDetail";
=======
import ArticleDetail from "@/components/ArticleDetail/ArticleDetail";
>>>>>>> a1154c7 (deployment bug)
import { notFound } from "next/navigation";

export default async function RandomNewsPage() {
  const randomIndex = Math.floor(Math.random() * newsData.length);
  const randomNews = newsData[randomIndex];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!randomNews) {
    notFound();
  }

<<<<<<< HEAD
  return <NewsDetail news={randomNews} />;
=======
  return <ArticleDetail article={randomNews} />;
>>>>>>> a1154c7 (deployment bug)
}
