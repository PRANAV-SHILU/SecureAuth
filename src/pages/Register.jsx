import { registerSchema } from "../utils/RegisterSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-router-dom";
import "../assets/css/input.css";
import { useActionData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function Register() {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  return (
    <section>
      <h1 style={{ textAlign: "center" }}>Register</h1>

      <Form method="post" className="form" onSubmit={handleSubmit(() => {})}>
        <div className="input-container">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            placeholder="Enter your name, ex: Pranav Shilu"
            {...register("name")}
          />
          <p className="errorMSG">{errors.name?.message}</p>
        </div>

        <div className="input-container">
          <label htmlFor="mobile">Mobile : </label>
          <input
            type="text"
            placeholder="Enter your mobile number, ex: 1234567891"
            {...register("mobile")}
          />
          <p className="errorMSG">{errors.mobile?.message}</p>
        </div>

        <div className="input-container">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <p className="errorMSG">{errors.password?.message}</p>
        </div>

        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password : </label>
          <input
            type="password"
            placeholder="confirm your Password"
            {...register("confirmPassword")}
          />
          <p className="errorMSG">{errors.confirmPassword?.message}</p>
        </div>

        <div className="input-container">
          <button type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
      />
    </section>
  );
}
