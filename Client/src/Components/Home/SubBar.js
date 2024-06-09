import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function SubBar() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email)
      return toast.error(
        "Please make sure to fill the email address"
      );
    try {
      setLoading(true);
      const { data } = await axios.post(`api/email`, {
        email
      });
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (            
    <div className="w-full p-1 flex justify-center items-center bg-gray-200">
        <ToastContainer position='top-center' limit={1} />
        <p className="mr-4 font-bold text-xl">SIGN&nbsp;&nbsp;UP&nbsp;&nbsp;FOR&nbsp;&nbsp;OUR&nbsp;&nbsp;DAILY&nbsp;&nbsp;INSIDER</p>
        <form className="mr-4" onSubmit={submitHandler}>
          <input className="border-2 border-solid border-black placeholder-black mr-4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          <button className="bg-gray-400 w-24" type="submit">{loading ? "Thanks!" : "Subscribe"}</button>
        </form>
    </div>
  );
}
  
  export default SubBar;