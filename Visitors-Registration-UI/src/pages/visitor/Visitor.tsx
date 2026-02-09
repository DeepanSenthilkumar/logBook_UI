import { useState } from 'react';
import {useForm} from "react-hook-form"
import Button from '../../components/buttons/buttons'
import '../../index.css'
// import './visitor.css'
import styles from './visitor.module.css'

type FormValues = {
  firstName: string;
  lastName: string;
  mobile: number;
  purpose: string;
};

const SuccessPage = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "transparent", display: "flex", justifyContent: "center", alignItems: "center", }} >
      <button style={{ backgroundColor: "red", color: "black", padding: "12px 24px", border: "none", cursor: "pointer" }} >
        Continue
      </button>
    </div>
  );
};

function Visitor() {
  const { register, trigger, getValues, reset
    // handleSubmit, // formState: { errors }
  } = useForm<FormValues>();

  const [isSuccess, setIsSuccess] = useState(false);
  
  const submitForm = async () => {
    debugger
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    const data = getValues();

    console.log("Collected form data:", data);
    reset();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <SuccessPage />;
  }

  return (
      <>
      <div className={`container py-5 ${styles.visitor}`}>
        <h2> Welcome to iCodex. Please Enter your details </h2>

        <form>
          <div className={`row g-3 py-3 ${styles.formContainer}`}>
            <div className="col-12 col-md-6">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" {...register("firstName", { required: true })} placeholder='Enter First Name'/>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" {...register("lastName", { required: true })} placeholder='Enter Last Name'/>
            </div>

            <div className="col-12">
              <label className="form-label">Mobile Number</label>
              <input type="text" className="form-control" {...register("mobile", { required: true, minLength: 10, pattern: /^\d+$/ })} placeholder='Enter Mobile Number'/>
            </div>

            <div className="col-12">
              <label className="form-label">Purpose of Visit</label>
              <textarea className={`form-control ${styles.purpose_Input}`} {...register("purpose", { required: true })} placeholder='Enter Purpose of Visit'/>
            </div>

            <Button text='Submit' onClick={submitForm} variant='danger btn-size col-5 mx-auto submit-margin'></Button>

          </div>
        </form>
      </div>
      </>
  )
}

export default Visitor