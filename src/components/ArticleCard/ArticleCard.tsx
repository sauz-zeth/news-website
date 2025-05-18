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
      <motion.div 
        className={styles["article-content"]}
        whileHover={{ 
          transition: { duration: 0.2 }
        }}
      >
        <motion.span 
          className={styles.category}
          whileHover={{ 
            y: -2,
            backgroundColor: "#0070f3",
            transition: { duration: 0.2 }
          }}
        >
          {getCategoryName(article.type)}
        </motion.span>
        <motion.h2 
          className={styles.heading}
          whileHover={{ 
            color: "#0070f3",
            transition: { duration: 0.2 }
          }}
        >
          {article.text.split("\n")[0]}
        </motion.h2>
        <motion.p 
          className={styles.timestamp}
          whileHover={{ 
            color: "#0070f3",
            transition: { duration: 0.2 }
          }}
        >
          📅 {formatTimestamp(article.date)}
        </motion.p>

        <motion.p 
          className={styles.description}
          whileHover={{ 
            color: "#e0e0e0",
            transition: { duration: 0.2 }
          }}
        >
          {article.text}
        </motion.p>

        {images.length > 0 && (
          <>
            <motion.div
              ref={galleryRef}
              onScroll={handleGalleryScroll}
              className={styles["image-gallery"]}
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              {images.map((media, index) => (
                <motion.div 
                  key={index} 
                  className={styles["gallery-item"]}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.img 
                    src={media.image.src} 
                    alt="Изображение" 
                    loading="lazy"
                    className={styles["gallery-image"]}
                    whileHover={{ 
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      transition: { duration: 0.2 }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
            {hasGallery && (
              <motion.div 
                className={styles["gallery-progress"]}
                whileHover={{ 
                  backgroundColor: "#0070f3",
                  transition: { duration: 0.2 }
                }}
              />
            )}
          </>
        )}

        {hasExternalLinks &&
          article.attachments?.map((media, index) => {
            if (media.type === "LINK") {
              return (
                <motion.a
                  key={index}
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["external-link"]}
                  whileHover={{ 
                    y: -2,
                    backgroundColor: "#0070f3",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.img 
                    src={media.image.src} 
                    alt={media.titleLink}
                    className={styles["link-preview"]}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  />
                  <motion.span 
                    className={styles["link-title"]}
                    whileHover={{ 
                      color: "#fff",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {media.titleLink}
                  </motion.span>
                </motion.a>
              );
            }
            return null;
          })}
      </motion.div>
    </motion.div>
  );
}
