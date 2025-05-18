"use client";

import React from "react";
import styles from "./Dialog.module.css";
import { Article } from "@/app/types";
import { motion, AnimatePresence } from "framer-motion";

interface DialogProps {
  isVisible: boolean;
  onDismiss: () => void;
  article?: Article;
}

export default function Dialog({ isVisible, onDismiss, article }: DialogProps) {
  if (!isVisible || !article) return null;

  const formatPublicationDate = (timestamp: number): string =>
    new Date(timestamp * 1000).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

  const getCategoryLabel = (category: string): string => 
    category.replace("Вика_", "");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.dialogOverlay}
        onClick={onDismiss}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={styles.dialogContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className={styles.dismissButton} 
            onClick={onDismiss}
            aria-label="Закрыть"
          >
            <span className={styles.dismissIcon}>×</span>
          </button>

          <div className={styles.dialogHeader}>
            <span className={styles.categoryBadge}>
              {getCategoryLabel(article.type)}
            </span>
            <h2 className={styles.articleTitle}>
              {article.text.split("\n")[0]}
            </h2>
            <time className={styles.publicationDate}>
              📅 {formatPublicationDate(article.date)}
            </time>
          </div>

          <div className={styles.dialogBody}>
            <p className={styles.articlePreview}>
              {article.text}
            </p>
          </div>

          <div className={styles.dialogFooter}>
            <a
              href={`/news/${article.id}`}
              onClick={onDismiss}
              className={styles.viewFullButton}
            >
              Перейти к новости
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
