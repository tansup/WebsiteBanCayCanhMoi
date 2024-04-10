import React, { useEffect,useRef } from "react";
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import ProductListComponent from '../../components/ProductListComponent/ProductListComponent';
import "./HomePage.css";
import { useParams } from 'react-router-dom';
function HomePage({category,setFlag}){
  
  const { maloai } = useParams();
  function removeSuffixFromUrl(url) {
    const lastSlashIndex = url.lastIndexOf('/');
    return url.substring(0, lastSlashIndex); 
}
useEffect(() => {
  if (maloai !== undefined) {
          let oldUrl = window.location.href;
          let newUrl = removeSuffixFromUrl(oldUrl);
          window.history.pushState(null, '', newUrl);
  }
}, [maloai]);
  return (
    <div  className="container d-flex">
      <MenuComponent/>
      <ProductListComponent category={category} maloai={maloai} setFlag={setFlag}/>
    </div>
  )
}

export default HomePage
