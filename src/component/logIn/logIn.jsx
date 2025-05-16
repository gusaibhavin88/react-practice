import "./logIn.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logInUserAction } from "../../redux/auth/authAction";
import { useState } from "react";
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
});

const LogIn = () => {
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

  const onComplete = (response) => {
    if (response.success) {
      navigate("/dashboard");
    }
    console.log(response, "khh");
  };
  const onError = () => {};

  const submitForm = (data) => {
    dispatch(
      logInUserAction({
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
        <h2>LogIn</h2>
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

            <button type="submit" disabled={registerUser?.loading}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
