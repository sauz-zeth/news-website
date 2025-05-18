// components/ClientModalWrapper.tsx
"use client";

import { Article } from "@/app/types";
import Dialog from "../Dialog/Dialog";

interface DialogWrapperProps {
  article: Article;
}

export default function DialogWrapper({ article }: DialogWrapperProps) {
  const handleDismiss = () => {
    window.history.back();
  };

  return (
    <Dialog 
      isVisible={true} 
      onDismiss={handleDismiss} 
      article={article} 
    />
  );
}
