import ArticleDetail from "@/components/ArticleDetail/ArticleDetail";
import { newsData } from "@/lib/newsData";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage(props: Props) {
  const params = await props.params;
  const { id } = params;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // проверка id
  const article = newsData.find((item) => item.id.toString() === id);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}
