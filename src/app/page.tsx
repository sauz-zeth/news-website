"use client";

import { useEffect, useState } from "react";
import { Article } from "./types";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Dialog from "@/components/Dialog/Dialog";
import { fetchArticles } from "@/app/api";
import { newsData } from "@/lib/newsData";
import styles from "./page.module.css";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  const handleDialogDismiss = () => {
    setIsDialogOpen(false);
    setSelectedArticle(null);
  };

  if (isLoading) {
    return (
      <div className={styles.layoutContainer}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.newsGrid}>
        {newsData.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            onArticleClick={handleArticleClick} 
          />
        ))}
      </div>

      <Dialog
        isVisible={isDialogOpen}
        onDismiss={handleDialogDismiss}
        article={selectedArticle || undefined}
      />
    </div>
  );
}
