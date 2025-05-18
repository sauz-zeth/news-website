"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Article } from "@/app/types";
import styles from "./ArticleDetail.module.css";

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formatPublicationDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryLabel = (category: string): string => {
    return category.replace("Вика_", "");
  };

  const renderMediaContent = (media: { type: string; image: { src: string; width: number; height: number } }) => {
    if (media.type === "PHOTO") {
      return (
        <div key={media.image.src} className={styles.mediaContainer}>
          <Image
            src={media.image.src}
            alt="Article media"
            width={media.image.width}
            height={media.image.height}
            className={styles.mediaImage}
            onClick={() => setSelectedImage(media.image.src)}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={styles.articleContainer}
    >
      <div className={styles.articleHeader}>
        <h1 className={styles.articleTitle}>{article.text.split("\n")[0]}</h1>
        <div className={styles.articleMeta}>
          <span className={styles.publicationDate}>
            {formatPublicationDate(article.date)}
          </span>
          <span className={styles.categoryBadge}>
            {getCategoryLabel(article.type)}
          </span>
        </div>
      </div>

      {article.attachments && article.attachments.length > 0 && (
        <div className={styles.mediaGrid}>
          {article.attachments.map(renderMediaContent)}
        </div>
      )}

      <div className={styles.articleContent}>
        {article.text.split("\n").map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      {selectedImage && (
        <div
          className={styles.imageModal}
          onClick={() => setSelectedImage(null)}
        >
          <div className={styles.imageModalContent}>
            <Image
              src={selectedImage}
              alt="Selected media"
              width={1200}
              height={800}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
