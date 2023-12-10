import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../../data/countrycode.json';
import { apiConnector } from '../../../services/apiConnector';
import { contactusEndpoint } from '../../../services/apis';

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const submitContactForm = async (data) => {
    console.log('logging data ', data);
    try {
      setLoading(true);
      const response = await apiConnector(
        'POST',
        contactusEndpoint.CONTACT_API,
        data
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        phoneNo: '',
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* firstName */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label className="lable-style" htmlFor="firstname">
            FirstName
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter FirstName"
            className="form-style"
            {...register('firstname', { required: true })}
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter firstName
            </span>
          )}
        </div>
        {/* lastName */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="lable-style">
            LastName
          </label>
          <input
            type="text"
            name="lastname"
            id="lastName"
            className="form-style"
            placeholder="Enter LastName"
            {...register('lastname')}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-style"
          placeholder="Enter Email Address"
          {...register('email', { requried: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your email
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="countrycode"
              id="countrycode"
              placeholder="Enter first name"
              className="form-style"
              {...register('countrycode', { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="text"
              name="phoneNo"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register('phoneNo', {
                required: {
                  value: true,
                  message: 'Please enter your Phone Number.',
                },
                maxLength: { value: 12, message: 'Invalid Phone Number' },
                minLength: { value: 10, message: 'Invalid Phone Number' },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="5"
          placeholder="Enter your message here"
          className="form-style"
          {...register('message', { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           'transition-all duration-200 hover:scale-95 hover:shadow-none'
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  );
};
export default ContactUsForm;
