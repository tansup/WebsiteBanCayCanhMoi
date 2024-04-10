import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "./layouts/adminlayout/AdminLayout";
import AdminLoginLayout from "./layouts/adminloginlayout/AdminLoginLayout";
export function App() {
  const [flag, setFlag] = useState(false);
  const [isLog, setIsLog] = useState(
    localStorage.getItem("username") == null ? false : true
  );

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;

            const Layout = route.admin
              ? AdminLayout
              : route.loggedIn
              ? AdminLoginLayout
              : DefaultLayout;
            const category =
              route.category != undefined ? route.category : undefined;
            const type = route.type != undefined ? route.type : undefined;
            const list = route.list != undefined ? route.list : undefined;
            const log = route.log != undefined ? route.log : undefined;
            const choice = route.choice != undefined ? route.choice : undefined;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout flag={flag} setFlag={setFlag} isLog={isLog}>
                    <Page
                      category={category}
                      type={type}
                      list={list}
                      log={log}
                      setFlag={setFlag}
                      setIsLog={setIsLog}
                      choice={choice}
                    />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
