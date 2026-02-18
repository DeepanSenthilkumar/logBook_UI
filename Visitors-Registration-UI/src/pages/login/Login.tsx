// import { useState } from 'react';
import {useForm} from "react-hook-form"
import Button from '../../components/buttons/buttons';
import '../../index.css'
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css';
import { success, error } from "../../components/toaster/toaster";
import api from '../../service/api.service.ts'
import { useLoader } from "../../components/loader/LoaderContext.tsx";

type LoginFormValues = {
  userId: string;
  password: string;
};

function Login() {
  const { showLoader, hideLoader } = useLoader();
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<LoginFormValues>();

  const submitLogin = async () => {
    const isValid = await trigger();
    sessionStorage.removeItem("token");

    if (!isValid) {
      return;
    }
    showLoader();

    const data = getValues();

    const requestBody = {
      userId: data.userId,
      password: data.password
    };

    console.log("Login Request Body:", requestBody);
    const response = (await api.validateUser(requestBody)) as any;
    debugger
    if (response.isAdded) {
      success("Login Success")
      login(response.jwtToken);
      navigate("/admin");
    } else {
      error("Invalid Credentials");
      hideLoader();
    }
  };

  return (
    <>
      <div className={`container py-5 ${styles.login}`}>
        <h2> Welcome to iCodex. Please signIn to access log </h2>

        <form>
          <div className={`row g-3 py-3 shadow-sm ${styles.formContainer}`}>
            <div className="col-12">
              <label className="form-label">User Id</label>
              <input type="text" className={`form-control ${errors.userId ? "is-invalid" : ""}`} placeholder='Enter User Id'{...register("userId", { required: "User Id is required" })}/>
               
               {errors.userId && (
                <small className="text-danger">{errors.userId.message}</small>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Password</label>
              <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder='Enter Password '{...register("password", { required: "Password is required",
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).+$/, message: "Must contain uppercase, lowercase, special character, no spaces"}})}/>
                
                {errors.password && (
                  <small className="text-danger">{errors.password.message}</small>
                )}
            </div>

            <Button text='Submit' variant='danger login-submit col-5 mx-auto submit-margin' onClick={submitLogin}></Button>

          </div>
        </form>
      </div>
    </>
  )
}

export default Login