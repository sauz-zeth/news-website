import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.skeleton} ${styles.skeletonHeader}`}></div>
      <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
      <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
      <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
    </div>
  );
}
