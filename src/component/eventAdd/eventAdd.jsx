import styles from "./eventAdd.module.css";

export function EventAdd() {
  return (
    <div className={styles.eventAdd}>
      <button className={styles.addEvent}>Add Event</button>
    </div>
  );
}
