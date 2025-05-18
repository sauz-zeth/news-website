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

  const formatPublicationDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const renderMediaContent = (media: { type: string; url: string; id: string }) => {
    if (media.type === "image") {
      return (
        <div key={media.id} className={styles.mediaContainer}>
          <Image
            src={media.url}
            alt="Article media"
            width={800}
            height={600}
            className={styles.mediaImage}
            onClick={() => setSelectedImage(media.url)}
          />
        </div>
      );
    } else if (media.type === "video") {
      return (
        <div key={media.id} className={styles.mediaContainer}>
          <video
            src={media.url}
            controls
            className={styles.mediaVideo}
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
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <div className={styles.articleMeta}>
          <span className={styles.publicationDate}>
            {formatPublicationDate(article.publicationDate)}
          </span>
          {article.category && (
            <span className={styles.categoryBadge}>{article.category}</span>
          )}
        </div>
      </div>

      {article.media && article.media.length > 0 && (
        <div className={styles.mediaGrid}>
          {article.media.map(renderMediaContent)}
        </div>
      )}

      <div className={styles.articleContent}>
        {article.content.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      {article.externalResources && article.externalResources.length > 0 && (
        <div className={styles.externalResources}>
          <h2 className={styles.externalResourcesTitle}>Дополнительные материалы</h2>
          <div className={styles.externalResourcesList}>
            {article.externalResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalResource}
              >
                {resource.title}
              </a>
            ))}
          </div>
        </div>
      )}

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
