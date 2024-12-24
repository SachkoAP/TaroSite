import RegStep1 from "./modules/RegistrationModule/RegStep1/RegStep1";
import RegStep2 from "./modules/RegistrationModule/RegStep2/RegStep2";
import RegStep3 from "./modules/RegistrationModule/RegStep3/RegStep3";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import HomePage from "./pages/HomePage/HomePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Cours from "./pages/Cours/Cours";
import CoursVideo from "./pages/CoursVideo/CoursVideo";
import TestCours from "./pages/TestCours/TestCours";
import "./styles/App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lk from "./pages/Lk/Lk";
import ProgressLKModule from "./modules/LkModules/ProgressLKModule/ProgressLKModule";
import MyCourseLkModule from "./modules/LkModules/MyCourseLkModule/MyCourseLkModule";
import { useEffect } from "react";
import { apiGetUser } from "./api/ApiRequest";
import { setUser } from "./store/user/user.slice";
import { useDispatch } from "react-redux";
import DataContext from "./context";
import React from "react";

function App() {
  //! функция получения данные пользоваетля
  const dispach = useDispatch();
  const funGetUserData = () => {
    apiGetUser().then((response) => {
      console.log("user", response);
      if (response?.status === 200) {
        dispach(setUser({ data: response.data }));
      }
    });
  };
  const storedData = JSON.parse(sessionStorage.getItem("auth"));
  useEffect(() => {
    funGetUserData();
  }, [storedData]);

  const context = {
    funGetUserData: funGetUserData,
  };

  return (
    <DataContext.Provider
      value={{
        context,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <main className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="RegistrationPage/*" element={<RegistrationPage />}>
                <Route path="*" element={<RegStep1 type={false} />} />
                <Route
                  path="Step2"
                  element={<RegStep2 type={false} title={"регистрации"} />}
                />
                <Route path="Step3" element={<RegStep3 type={false} />} />
              </Route>
              <Route path="AuthorizationPage/*" element={<AuthorizationPage />}>
                {/* <Route path="*" element={<RegStep1 type={true} />} /> */}
                <Route
                  path="*"
                  element={<RegStep2 title={"входа"} type={true} />}
                />
                <Route path="Step3" element={<RegStep3 type={true} />} />
              </Route>
              <Route path="Cours" element={<Cours />}></Route>
              <Route path="CoursVideo" element={<CoursVideo />}></Route>
              <Route path="TestCours" element={<TestCours />}></Route>
              <Route path="Lk/*" element={<Lk />}>
                <Route path="*" element={<MyCourseLkModule />} />
                <Route path="ProgressLKModule" element={<ProgressLKModule />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </DataContext.Provider>
  );
}

export default App;
