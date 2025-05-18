"use client";

import { Article } from "@/app/types";
import { motion } from "framer-motion";
import styles from "./ArticleCard.module.css";
import { useRef } from "react";

interface ArticleProps {
  article: Article;
  onArticleClick: (article: Article) => void;
}

export default function ArticleCard({ article, onArticleClick }: ArticleProps) {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const getCategoryName = (category: string): string => category.replace("Вика_", "");

  const galleryRef = useRef<HTMLDivElement>(null);

  const handleGalleryScroll = () => {
    if (!galleryRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    const progressBar = galleryRef.current.nextElementSibling?.querySelector(
      `.${styles["gallery-progress"]}::after`
    ) as HTMLElement | null;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };

  const images = article.attachments?.filter((media) => media.type === "PHOTO") || [];
  const hasGallery = images.length > 1;
  const hasExternalLinks = article.attachments?.some(
    (media) => media.type === "LINK"
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        y: -4,
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
      className={styles.article}
      onClick={() => onArticleClick(article)}
    >
      <div className={styles["article-content"]}>
        <span className={styles.category}>
          {getCategoryName(article.type)}
        </span>
        <h2 className={styles.heading}>
          {article.text.split("\n")[0]}
        </h2>
        <p className={styles.timestamp}>
          📅 {formatTimestamp(article.date)}
        </p>

        <p className={styles.description}>
          {article.text}
        </p>

        {images.length > 0 && (
          <>
            <div
              ref={galleryRef}
              onScroll={handleGalleryScroll}
              className={styles["image-gallery"]}
            >
              {images.map((media, index) => (
                <div 
                  key={index} 
                  className={styles["gallery-item"]}
                >
                  <img 
                    src={media.image.src} 
                    alt="Изображение" 
                    loading="lazy"
                    className={styles["gallery-image"]}
                  />
                </div>
              ))}
            </div>
            {hasGallery && (
              <div className={styles["gallery-progress"]} />
            )}
          </>
        )}

        {hasExternalLinks &&
          article.attachments?.map((media, index) => {
            if (media.type === "LINK") {
              return (
                <a
                  key={index}
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["external-link"]}
                >
                  <img 
                    src={media.image.src} 
                    alt={media.titleLink}
                    className={styles["link-preview"]}
                  />
                  <span className={styles["link-title"]}>
                    {media.titleLink}
                  </span>
                </a>
              );
            }
            return null;
          })}
      </div>
    </motion.div>
  );
}
