import React from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const DefaultLayout = ({ children,flag,setFlag,isLog }) => {
  return (
    <div>
      <HeaderComponent flag={flag} setFlag={setFlag} isLog={isLog}/>
      {children}
      <FooterComponent />
    </div>
  );
};

export default DefaultLayout;
