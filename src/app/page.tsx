"use client";

import { useState, useEffect, useTransition } from "react";
import { Article } from "./types";
import { fetchArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import ArticleCardSkeleton from "@/components/ArticleCardSkeleton/ArticleCardSkeleton";
import Dialog from "@/components/Dialog/Dialog";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./page.module.css";

export default function NewsPage() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{
    articles: Article[];
    selectedArticle: Article | null;
    isDialogOpen: boolean;
    isLoading: boolean;
  }>({
    articles: [],
    selectedArticle: null,
    isDialogOpen: false,
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        if (mounted) {
          startTransition(() => {
            setState(prev => ({
              ...prev,
              articles: data,
              isLoading: false
            }));
          });
        }
      } catch (error) {
        console.error("Error loading articles:", error);
        if (mounted) {
          startTransition(() => {
            setState(prev => ({
              ...prev,
              isLoading: false
            }));
          });
        }
      }
    };

    loadArticles();

    return () => {
      mounted = false;
    };
  }, []);

  const handleArticleClick = (article: Article) => {
    setState(prev => ({
      ...prev,
      selectedArticle: article,
      isDialogOpen: true
    }));
  };

  const handleDialogDismiss = () => {
    setState(prev => ({
      ...prev,
      isDialogOpen: false
    }));
  };

  const renderSkeletons = () => (
    <>
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </>
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.newsGrid}>
          <AnimatePresence mode="wait">
            {(state.isLoading || isPending) ? (
              <motion.div
                key="skeletons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.contentContainer}
              >
                {renderSkeletons()}
              </motion.div>
            ) : state.articles.length > 0 ? (
              <motion.div
                key="articles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.contentContainer}
              >
                {state.articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onArticleClick={handleArticleClick}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Новости не найдены
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      {state.isDialogOpen && state.selectedArticle && (
        <Dialog
          article={state.selectedArticle}
          isVisible={state.isDialogOpen}
          onDismiss={handleDialogDismiss}
        />
      )}
    </main>
  );
}
