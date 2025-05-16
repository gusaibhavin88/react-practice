import { EventAdd } from "../eventAdd/eventAdd";
import { EventManagement } from "../eventManagement/eventManagement";
import styles from "./eventParent.module.css";

export function EventParent() {
  return (
    <div className={styles.eventParent}>
      <EventAdd />
      <EventManagement />
    </div>
  );
}
