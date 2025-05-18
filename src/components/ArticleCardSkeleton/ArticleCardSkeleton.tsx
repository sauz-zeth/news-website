"use client";

import styles from "./ArticleCardSkeleton.module.css";

export default function ArticleCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.content}>
        <div className={styles.category} />
        <div className={styles.title} />
        <div className={styles.date} />
        <div className={styles.description}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.line} />
        </div>
        <div className={styles.gallery}>
          <div className={styles.image} />
          <div className={styles.image} />
        </div>
      </div>
    </div>
  );
} 