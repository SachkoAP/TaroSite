import axios from "axios";
import { apiTest } from "../store/test/test.slice";
const server = process.env.REACT_APP_API_URL;
const http = axios.create({
  withCredentials: true,
});
const storedData = JSON.parse(sessionStorage.getItem("auth"));

//! регистрация
export const apiRegister = async (data) => {
  try {
    const response = await http.post(`${server}/auth/register`, data);
    console.log(data, response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! регистрация отправляем код
export const apiRegisterCode = async (data) => {
  try {
    const response = await http.post(`${server}/auth/confirm`, data);
    console.log(data, response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! регистрация отправляем код
export const apiLogin = async (data) => {
  try {
    const response = await http.post(`${server}/auth/login`, data);
    console.log(data, response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
//! регистрация отправляем код по смс
export const apiLoginsms = async (data) => {
  try {
    const response = await http.post(`${server}/auth/renewCode`, data);
    console.log(data, response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! получаем курс
export const apiGetCours = async () => {
  try {
    const response = await http.get(`${server}/course`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Функция для получения значения конкретной куки

//! получаем профиль пользователя
export const apiGetUser = async () => {
  console.log("storedData", storedData);
  try {
    const response = await http.get(`${server}/user/profile`, {
      headers: {
        Authorization: `Bearer ${storedData?.refreshToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! получаем мой курс
export const apiGetMyCours = async () => {
  try {
    const response = await http.get(`${server}/course`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! получаем все блоки
export const apiGetBlock = async (id) => {
  try {
    const response = await http.get(`${server}/course/${id}/blocks`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! оплата
export const apiPay = async (tarif) => {
  try {
    // const response = await http.post(`${server}/user/buy`, tarif, {
    //   headers: {
    //     Authorization: `Bearer ${storedData.refreshToken}`,
    //   },
    // });
    const response = await http.post(`${server}/user/buy`, tarif);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const apiGetvideoBlock = async (id) => {
  try {
    const response = await http.get(`${server}/video/block/${id}`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getInfoVideo = async (id) => {
  try {
    const response = await http.get(
      `https://rutube.ru/pangolin/api/web/video/${id}/?pageType=video&client=wdp`
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const apiTestAndVideo = async (id) => {
  try {
    const response = await http.get(`${server}/block/${id}/inner`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const apiGetTest = async (id) => {
  try {
    const response = await http.get(`${server}/test/${id}`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const apiCheckTest = async (data) => {
  try {
    const response = await http.post(`${server}/test/check`, data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const apiGetProgress = async (id) => {
  try {
    const response = await http.get(`${server}/progress/test/${id}`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const apiGetProgressBlock = async (id) => {
  try {
    const response = await http.get(`${server}/progress/block/${id}`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
