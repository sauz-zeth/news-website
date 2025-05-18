"use client";

import { useState, useEffect } from "react";
import { Article } from "./types";
import { fetchArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Dialog from "@/components/Dialog/Dialog";
import styles from "./page.module.css";

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };
    loadArticles();
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  const hasArticles = articles.length > 0;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.newsGrid}>
          {hasArticles ? (
            articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onArticleClick={handleArticleClick}
              />
            ))
          ) : (
            <p>Загрузка новостей...</p>
          )}
        </div>
      </div>
      {isDialogOpen && selectedArticle && (
        <Dialog
          article={selectedArticle}
          isVisible={isDialogOpen}
          onDismiss={() => setIsDialogOpen(false)}
        />
      )}
    </main>
  );
}
