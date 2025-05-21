import { useForm } from "react-hook-form";
import styles from "./eventAdd.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEventAction } from "../../redux/event/eventAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEventModel } from "../../context/eventModelContext";
import { useEffect } from "react";
import { clearDetail } from "../../redux/event/eventSlice";

const createEvent = yup.object().shape({
  name: yup.string().required("Name is Required"),
  description: yup.string().required("Description is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  totalGuest: yup.string().required("Total guest is required"),
});

export function EventAdd() {
  const { closeModel, type } = useEventModel();
  console.log(type, "fwfwf");
  const eventDetail = useSelector((state) => state.event.details);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {};
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEvent),
    defaultValues: initialValue,
  });

  const selectedFiles = watch("images");
  const filesArray = selectedFiles ? Array.from(selectedFiles) : [];

  console.log(selectedFiles);

  const onComplete = (result) => {
    if (result.success) {
      closeModel();
      navigate("/event");
    }
  };
  const onError = () => {};

  const onSubmitForm = (data) => {
    const formData = new FormData();

    // Append all fields except images (handle them separately below)
    for (let [key, value] of Object.entries(data)) {
      if (key !== "images") {
        formData.append(key, value);
      }
    }

    // Append images, if available
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("imagesUrl", file);
      });
    }

    dispatch(
      addEventAction({
        functions: {
          onComplete,
          formData,
          onError,
        },
      })
    );

    reset();
    closeModel();
  };

  useEffect(() => {
    if (eventDetail) {
      Object.keys(eventDetail).forEach((key) => {
        setValue(key, eventDetail[key]);
      });
    }
    return () => {
      dispatch(clearDetail());
    };
  }, [eventDetail]);
  return (
    <div className={styles.eventAdd}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <label>Name</label>{" "}
          <div className={styles.formGroup}>
            <input {...register("name")} type="text" />
            {errors.description && (
              <p className={styles.errorText}>{errors.description?.message}</p>
            )}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <div className={styles.formSub}>
            <input {...register("description")} type="text" />
            {errors.name && (
              <p className={styles.errorText}>{errors.name?.message}</p>
            )}
          </div>
        </div>
        <div>
          <label>Start Date</label>
          <div className={styles.formGroup}>
            <input {...register("startDate")} type="date" />
            {errors.startDate && (
              <p className={styles.errorText}>{errors.startDate?.message}</p>
            )}
          </div>
        </div>
        <div>
          <label>End Date</label>
          <div className={styles.formGroup}>
            <input {...register("endDate")} type="date" />

            {errors.endDate && (
              <p className={styles.errorText}>{errors.endDate?.message}</p>
            )}
          </div>
        </div>
        <div>
          <label>Total Guest</label>
          <div className={styles.formGroup}>
            <input {...register("totalGuest")} type="number" />

            {errors.totalGuest && (
              <p className={styles.errorText}>{errors.totalGuest?.message}</p>
            )}
          </div>
        </div>

        {type !== "view" && (
          <div>
            <label>Select Images</label>
            <input type="file" multiple {...register("images")} />
          </div>
        )}

        {Array.isArray(filesArray) && filesArray.length > 0 && (
          <div className={styles.imageView}>
            {filesArray.map((item, index) => (
              <div className={styles.imageView} key={index}>
                <img
                  src={URL.createObjectURL(item)}
                  alt={`preview-${index}`}
                  style={{ width: "50px" }}
                />
              </div>
            ))}
          </div>
        )}

        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
