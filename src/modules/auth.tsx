import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8080/login', {
      email,
      password,
    }, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const signup = async (email: string, name: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8080/signup', {
      email,
      name,
      password,
      tags: "user"
    }, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const validate = async () => {
  try {
    const response = await axios.post('http://localhost:8080/validate', {}, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('http://localhost:8080/logout', {}, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};