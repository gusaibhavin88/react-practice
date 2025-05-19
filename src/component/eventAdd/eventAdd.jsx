import { useForm } from "react-hook-form";
import styles from "./eventAdd.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEventAction } from "../../redux/event/eventAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEventModel } from "../../context/eventModelContext";

const createEvent = yup.object().shape({
  name: yup.string().required("Name is Required"),
  description: yup.string().required("Description is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  totalGuest: yup.string().required("Total guest is required"),
});

export function EventAdd() {
  const { closeModel } = useEventModel();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {};
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEvent),
    defaultValues: initialValue,
  });

  const selectedFiles = watch("images");

  const onComplete = (result) => {
    if (result.success) {
      console.log("ffffffffffffffffffffffffffff");
      closeModel();
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
  };

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
        <div>
          <label>Select Images</label>
          <input type="file" multiple {...register("images")} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
