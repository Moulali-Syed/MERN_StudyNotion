import toast from 'react-hot-toast';
import { setLoading, setToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';
import { apiConnector } from '../apiConnector';
import { endpoints } from '../apis';
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading('loading...');
    dispatch(setLoading(true));

    try {
      const response = await apiConnector('POST', LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('login successful');

      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`;
      // console.log(response.data.user, 'from login api hit');
      dispatch(setUser({ ...response.data.user, image: userImage }));
      // console.log('After SetUser:', response.data.user);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/dashboard/my-profile');
    } catch (error) {
      console.log('Error Logging IN', error);
      toast.error('login failed');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', SENDOTP_API, {
        email,
      });
      console.log('SENDOTP API RESPONSE............', response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('OTP Sent Successfully');
      navigate('/verify-email');
    } catch (error) {
      console.log('SENDOTP API ERROR............', error);
      toast.error(`Could Not Send OTP - ${error.response.data.message}`);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', RESETPASSTOKEN_API, {
        email,
      });
      console.log('RESET PASSWORD TOKEN RESPONSE:....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('reset email sent');
      setEmailSent(true);
    } catch (error) {
      console.log('RESET PASSWORD TOKEN ERROR', error);
      toast.error('failed to send email for resetting password');
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading('Loading...');

    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log('RESET password response ', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('password reset successful');
      navigate('/login');
    } catch (error) {
      console.log('RESET PASSWORD ERROR', error);
      toast.error('unable to password');
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log('SIGNUP API RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success('Signup Successful');
      navigate('/login');
    } catch (error) {
      console.log('SIGNUP API ERROR............', error);
      toast.error('Signup Failed');
      navigate('/signup');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged Out');
    navigate('/');
  };
}
