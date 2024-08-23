import axios from "axios";

export const logout = () => {
  axios.post('/api/auth/logout').then(() => {
    window.location.href = '/';
  }).catch((error) => {
    console.error('Error logging out:', error);
  });
}