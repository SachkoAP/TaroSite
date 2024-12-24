import React from "react";
const DataContext = React.createContext({}); // данные передаем в ApiData
export default DataContext;

//sesionStorage

//! при confirm сохраняем данные
// const storedData = JSON.parse(sessionStorage.getItem("auth"));
// sessionStorage.setItem("auth", JSON.stringify(req.data));
