import React from "react";
import CustomInput from "./CustomInput";
import "./AdminSingInPage.css";
import { Link } from "react-router-dom";
const AdminSignInPage = () => {
  return (
    <div
      className="py-5 admincontainer"
      style={{
        minHeight: "100vh",
      }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title ">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <CustomInput
            className="input-log-name"
            type="text"
            label="Email Address"
            id="email"
            name="email"
          />
          <CustomInput
            className="input-log-pass"
            type="password"
            label="Password"
            id="pass"
            name="password"
          />
          <div
            onClick={() => logIn()}
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#32CD32" }}
            type="submit"
          >
            Login
          </div>
        </form>
      </div>
    </div>
  );
};
async function logIn() {
  const userNameElement = document.querySelector(".input-log-name");
  const passWordElement = document.querySelector(".input-log-pass");
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/account/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userNameElement.value,
          passWord: passWordElement.value,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    if (jsonData && jsonData["role"] == true) {
      localStorage.setItem("token", jsonData["token"]);
      window.location.href = "/admin/dash";
    } else {
      // window.location.href ="/admin";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default AdminSignInPage;
