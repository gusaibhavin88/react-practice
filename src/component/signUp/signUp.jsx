import "./signUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../redux/auth/authAction";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
  email: yup
    .string()
    .required()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Must be a valid email with .com domain"
    ),
  password: yup.string().required(),
  contactNumber: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.string().required(),
});

const SignUp = () => {
  const [profile, setProfile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerUser = useSelector((state) => state?.auth?.registerUser);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const selectedFile = watch("profileImage");

  const onComplete = (response) => {
    if (response.success) {
      navigate("/login");
    }
  };
  const onError = () => {};

  const submitForm = (data) => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if (selectedFile) {
      formData.append("profileImage", data?.profileImage);
    }

    dispatch(
      registerUserAction({
        functions: {
          onComplete,
          formData: data,
          onError,
        },
      })
    );
  };

  return (
    <div className="signUpPage">
      <div className="mainSignUp">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="formDiv">
            <div className="formField">
              <label>Email</label>
              <div className="formSub">
                <input {...register("email")} type="email" />{" "}
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>

            <div className="formField">
              <label>Password</label>
              <input {...register("password")} type="password" />
            </div>
            {errors.password && <p>{errors.password.message}</p>}

            <div className="formField">
              <label>First Name</label>
              <input {...register("firstName")} type="text" />
            </div>
            {errors.firstName && <p>{errors.firstName.message}</p>}

            <div className="formField">
              <label>Last Name</label>
              <input type="text" {...register("lastName")} />
            </div>
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <div className="formField">
              <label>Contact Number</label>
              <input type="number" {...register("contactNumber")} />
            </div>
            {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
            <div className="formField">
              <label>Birth Date</label>
              <input type="date" {...register("birthDate")} />
            </div>
            {errors.birthDate && <p>{errors.birthDate.message}</p>}

            <div className="formField">
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setValue("profileImage", e?.target?.files[0])}
              />
            </div>
            {errors.endDate && <p>{errors.endDate.message}</p>}

            {selectedFile && (
              <div className="formField">
                <label>Preview</label>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  style={{ width: "50px" }}
                ></img>
              </div>
            )}

            <button type="submit" disabled={registerUser?.loading}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
