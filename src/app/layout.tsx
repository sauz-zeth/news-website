import "../styles/globals.css";
import { ReactNode } from "react";
import styles from "./page.module.css";

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div className={styles.layoutContainer}>
          <div className={styles.mainContent}>
            <header className={styles.headerContainer}>
              <h1 className={styles.newsTitle}>Новости ИИТ</h1>
            </header>
            <main>
              {children}
              {modal}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
