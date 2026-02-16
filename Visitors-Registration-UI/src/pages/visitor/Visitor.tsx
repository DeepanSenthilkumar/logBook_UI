import { useState } from 'react';
import {useForm} from "react-hook-form"
import Button from '../../components/buttons/buttons'
import '../../index.css'
import styles from './visitor.module.css'
import api from '../../service/api.service.ts'
import { useLoader } from '../../components/loader/LoaderContext.tsx';
import { error, success, warning } from '../../components/toaster/toaster.tsx';

type FormValues = {
  firstName: string;
  lastName: string;
  mobile: number;
  purpose: string;
};

const SuccessPage = () => {
  return (
    <div className={`${styles.successPage_layout}`} >
      <div className= {`${styles.successPage_secondaryLayout}`}>
        <p className={styles.message}>Thanks for visiting iCodex.<span> Have a nice day.</span></p>
        <Button text='Back'to="/" variant='danger btn-size col-5 mx-auto submit-margin'></Button>
      </div>
    </div>
  );
};

function Visitor() {
  const { showLoader, hideLoader } = useLoader();
  const { register, trigger, getValues, reset
    // handleSubmit, // formState: { errors }
  } = useForm<FormValues>();

  const [isSuccess, setIsSuccess] = useState(false);

  const formatTime12 = (d: Date, field: string): string => {
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    if(field === 'in') {
      return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }
  };

  const formatDate = (d: Date): string => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  
  const submitForm = async () => {
    // debugger
    showLoader();
    const isValid = await trigger();

    if (!isValid) {
      warning('Please fill all details');
      hideLoader();
      return;
    }
    const data = getValues();
    console.log("Collected form data:", data);
    
    try {
      const now = new Date();
      const inTimeDate = new Date(now);
      const outTimeDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // +2 hrs safely

      const requestBody = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "mobileNumber": data.mobile,
        "purposeOfVisit": data.purpose,
        "date": formatDate(now),
        "inTime": formatTime12(inTimeDate, 'in'),
        "outTime": formatTime12(outTimeDate, 'out')
      } 

      console.log('requestBody', requestBody);
      const res = (await api.addVisitor(requestBody)) as any;
      console.log(res);
      if (res.isAdded) {
        setIsSuccess(true);
        reset({
            firstName: "",
            lastName: "",
            mobile: undefined,
            purpose: ""
          });
        }
        hideLoader();
        success("Data Saved")
      } catch (err) {
        hideLoader();
        error('Unexpected error. Please try again');
      console.error(err);
    }
  };

  if (isSuccess) {
    return <SuccessPage />;
  }

  return (
      <>
      <div className={`container py-5 ${styles.visitor}`}>
        <h2> Welcome to iCodex. Please Enter your details </h2>

        <form>
          <div className={`row g-3 py-3 shadow-sm ${styles.formContainer}`}>
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