import { useDispatch, useSelector } from "react-redux";
import styles from "./eventManagement.module.css";
import { useEffect, useState } from "react";
import buildQuery from "../../utilityFunction/queryFunction";
import { getEventAction, listEventAction } from "../../redux/event/eventAction";
import Model from "../../model/model";
import { EventAdd } from "../eventAdd/eventAdd";
import { useEventModel } from "../../context/eventModelContext";

export function EventManagement() {
  const { isOpen, openModel, closeModel, setType } = useEventModel();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const eventDetail = useSelector((state) => state.event.details);

  const [filters, setFilters] = useState({
    search: "",
    sortField: "createdAt",
    sortOrder: "asc",
    itemPerPage: "10",
    page: 1,
  });

  const getDetail = (id) => {
    dispatch(
      getEventAction({
        functions: {
          onComplete,
          formData: { id },
          onError,
        },
      })
    );

    openModel();
    setType("view");
  };

  const onComplete = (response) => {};
  const onError = () => {};

  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.eventManagement}>
      <div className={styles.eventAdd}>
        <button
          className={styles.addEvent}
          onClick={() => {
            openModel();
            setType("add");
          }}
        >
          Add Event
        </button>
      </div>
      <Model>
        <EventAdd />
      </Model>
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
            <th>View</th>
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
                <td>{item.description}</td>
                <td>{new Date(item.startDate).toLocaleDateString("en-GB")}</td>
                <td>{new Date(item.endDate).toLocaleDateString("en-GB")}</td>
                <td>{item.totalGuest}</td>
                <td>
                  <button onClick={() => getDetail(item?._id)}>View</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
