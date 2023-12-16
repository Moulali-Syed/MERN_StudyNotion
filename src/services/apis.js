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

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: '/api/v1/course/getAllCourses',
  COURSE_DETAILS_API: '/api/v1/course/getCourseDetails',
  EDIT_COURSE_API: '/api/v1/course/editCourse',
  COURSE_CATEGORIES_API: '/api/v1/course/showAllCategories',
  CREATE_COURSE_API: '/api/v1/course/createCourse',
  CREATE_SECTION_API: '/api/v1/course/addSection',
  CREATE_SUBSECTION_API: '/api/v1/course/addSubSection',
  UPDATE_SECTION_API: '/api/v1/course/updateSection',
  UPDATE_SUBSECTION_API: '/api/v1/course/updateSubSection',
  GET_ALL_INSTRUCTOR_COURSES_API: '/api/v1/course/getInstructorCourses',
  DELETE_SECTION_API: '/api/v1/course/deleteSection',
  DELETE_SUBSECTION_API: '/api/v1/course/deleteSubSection',
  DELETE_COURSE_API: '/api/v1/course/deleteCourse',
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: '/api/v1/course/getFullCourseDetails',
  LECTURE_COMPLETION_API: '/api/v1/course/updateCourseProgress',
  CREATE_RATING_API: '/api/v1/course/createRating',
};
