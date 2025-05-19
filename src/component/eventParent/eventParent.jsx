import { useNavigate } from "react-router-dom";
import { EventManagement } from "../eventManagement/eventManagement";
import styles from "./eventParent.module.css";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/auth/authSlice";

export function EventParent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };
  return (
    <div className={styles.eventParent}>
      <div className={styles.logOutBtn}>
        <button onClick={() => logOut()}>Logout</button>
      </div>
      <div className={styles.eventParent}>
        <EventManagement />
      </div>
    </div>
  );
}
