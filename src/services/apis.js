export const categories = {
  CATEGORIES_API: '/api/v1/course/showAllCategories',
};
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: '/api/v1/auth/sendotp',
  SIGNUP_API: '/api/v1/auth/signup',
  LOGIN_API: '/api/v1/auth/login',
  RESETPASSTOKEN_API: '/api/v1/auth/reset-password-token',
  RESETPASSWORD_API: '/api/v1/auth/reset-password',
};

export const contactusEndpoint = {
  CONTACT_API: '/api/v1/reach/contact',
};
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: '/api/v1/profile/updateDisplayPicture',
  UPDATE_PROFILE_API: '/api/v1/profile/updateProfile',
  CHANGE_PASSWORD_API: '/api/v1/auth/changepassword',
  DELETE_PROFILE_API: '/api/v1/profile/deleteProfile',
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: '/api/v1/profile/getUserDetails',
  GET_USER_ENROLLED_COURSES_API: '/api/v1/profile/getEnrolledCourses',
  GET_INSTRUCTOR_DATA_API: '/api/v1/profile/instructorDashboard',
};
