import { useDispatch, useSelector } from "react-redux";
import styles from "./eventManagement.module.css";
import { useEffect, useState } from "react";
import buildQuery from "../../../utilityFunction/queryFunction";
import { listEventAction } from "../../../redux/event/eventAction";

export function EventManagement() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  console.log(events, "khkhfwfwffwwfwfg");
  const [filters, setFilters] = useState({
    search: "",
    sortField: "createdAt",
    sortOrder: "asc",
    itemPerPage: "1",
    page: 1,
  });

  const onComplete = (response) => {
    if (response.success) {
    }
  };
  const onError = () => {};

  const fetchEventsData = async () => {
    const query = buildQuery(filters);

    dispatch(
      listEventAction({
        functions: {
          onComplete,
          formData: query,
          onError,
        },
      })
    );
  };

  useEffect(async () => {
    const fetchData = async () => {
      await fetchEventsData();
    };
    fetchData();
  }, []);

  return (
    <div className={styles.eventManagement}>
      <table
        className={styles.eventTable}
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Guest</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events?.map((item) => (
              <tr>
                <td>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${item.imagesUrl?.[0]}`}
                    alt="event"
                    width="20px"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.totalGuest}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
