"use client";

import Link from "next/link";
import styles from "./ArticleDetail.module.css";
import { Article } from "@/app/types";
import { motion } from "framer-motion";

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const formatPublicationDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getCategoryLabel = (category: string): string => {
    return category.replace("Вика_", "");
  };

  const renderMediaContent = (media: any) => {
    if (media.type === "PHOTO") {
      return (
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={media.image.src}
          alt="Изображение"
          className={styles.mediaImage}
          loading="lazy"
        />
      );
    }

    return (
      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        href={media.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.externalResource}
      >
        <img
          src={media.image.src}
          alt={media.titleLink}
          className={styles.resourcePreview}
        />
        <div className={styles.resourceInfo}>
          <span className={styles.resourceTitle}>{media.titleLink}</span>
          <span className={styles.resourceUrl}>{media.link}</span>
        </div>
      </motion.a>
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.articleContainer}
    >
      <Link href="/" className={styles.navigationLink}>
        <span className={styles.backIcon}>←</span>
        Вернуться к списку
      </Link>

      <div className={styles.articleHeader}>
        <span className={styles.categoryBadge}>
          {getCategoryLabel(article.type)}
        </span>
        <h1 className={styles.articleTitle}>
          {article.text.split("\n")[0]}
        </h1>
        <time className={styles.publicationDate}>
          📅 {formatPublicationDate(article.date)}
        </time>
      </div>

      <div className={styles.articleContent}>
        {article.text.split("\n").map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      {article.attachments && article.attachments.length > 0 && (
        <div className={styles.mediaGallery}>
          {article.attachments.map((media, index) => (
            <div key={`${media.type}-${index}`}>
              {renderMediaContent(media)}
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}
