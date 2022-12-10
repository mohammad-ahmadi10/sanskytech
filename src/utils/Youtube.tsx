import styles from "@/styles/Youtube.module.scss";

export default function YouTube({ id }: { id: string }) {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className={styles.frame}
      />
    </div>
  );
}