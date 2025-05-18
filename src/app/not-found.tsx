import styles from "./page.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.headerContainer}>
      <h1>Nothing here!</h1>
      <Link href="/">Return to news</Link>
    </div>
  );
}
