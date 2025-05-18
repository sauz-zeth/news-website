import { notFound } from "next/navigation";
import { newsData } from "@/lib/newsData";
import DialogWrapper from "@/components/DialogWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleModal({ params }: Props) {
  const { id } = await params;

  const article = newsData.find((item) => item.id.toString() === id);

  if (!article) notFound();

  return <DialogWrapper article={article} />;
}
