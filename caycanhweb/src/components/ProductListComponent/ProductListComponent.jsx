import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductListComponent.css";
import { useParams } from 'react-router-dom';
const itemsPerPage = 12;
function ProductListComponent({category,maloai,setFlag}) {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
};

const renderData = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = products.slice(startIndex, endIndex);
  return currentPageData.map((item, index) => (
    <div  className="product" key={index}>
    <Link   to={formatPath(item["tenSP"],item["maLoai"],item["maSP"])} className="product-link"><div className="product-img" style={{height:300,width:300,backgroundImage:`url(${item["hinhAnh"]})`}}><div className="img-text d-flex justify-content-center align-items-center">Xem chi tiết</div></div></Link>
    <div className="product-title"><Link className="title-link">{item["tenSP"]}</Link></div>
    <div className="product-option d-flex justify-content-between">
        <div className="option-price" >{formatPrice(item["gia"])}</div>
        <div className="option-choice d-flex">
          <div onClick={() =>addCart(item["maSP"],1)} className="choice-cart d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
            </svg>
          </div>
          <Link to={formatPath(item["tenSP"],item["maLoai"],item["maSP"])} className="choice-view d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-eye-fill" viewBox="0 0 16 16">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg>
          </Link>
        </div>

    </div>
    </div>
  ));
};
function addCart(ma,sl) {
  if (localStorage.getItem('cart')==null) {
    const list=[]
    list.push({
      masp:ma,
      soluong:sl,
    })
  localStorage.setItem('cart', JSON.stringify(list));
  }else
  {
    let increase =-1;
    const storedData = localStorage.getItem('cart');
    const list = JSON.parse(storedData);
    for (let index = 0; index < list.length; index++) {
        if(list[index]["masp"]==ma)
          increase=index;
    }
      if(increase==-1) {
        list.push({
          masp:ma,
          soluong:sl,
      })
      }else{
        list[increase]["soluong"]+=1;
      }
    localStorage.setItem('cart', JSON.stringify(list));
  }
  setFlag(true);

}
const renderPaginationItems = () => {
  const items = [];
  let end;
  let start = currentPage <= 1 ? 1 :currentPage-1 ;
  if (totalPages<3 || currentPage <3) {
    end =3;
  }else end=currentPage+1;
  if (end>=totalPages) {
    end=totalPages;
    start = totalPages-2;
    if (start<1) {
      start=1
    }
  }

  for (let number = start; number <= end; number++) {
      items.push(
          <li className={number === currentPage ? "page-item active" : "page-item"}  key={number} ><button class="page-link" onClick={() => handlePageChange(number)}>{number}</button></li>
      );
  }
  return items;
};
  useEffect(() => {
    
      const fetchPlants = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/plant");
          const jsonData = await response.json();
          setProducts(jsonData["plants"]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const fetchPots = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/pot");
          const jsonData = await response.json();
          setProducts(jsonData["pots"]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/pot/all");
          const jsonData = await response.json();
          setProducts(jsonData["products"]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const fetchOneTypePlants = async (maloai) => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/plant/search?ml="+maloai);
          const jsonData = await response.json();
          setProducts(jsonData["plants"]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const fetchOneTypePots = async (maloai) => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/pot/search?ml="+maloai);
          const jsonData = await response.json();
          setProducts(jsonData["pots"]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const fetchTypePlants = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/producttype/plant");
          const jsonData = await response.json();
          setTypes(jsonData["producttypes"]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchTypePlants();
      if(category== undefined)
      {
        if (maloai == undefined) {
          fetchProducts()
        }else{
          let flag= false;
          for (let index = 0; index < types.length; index++) {
              if (types[index]["maLoai"].localeCompare(maloai) === 0) {
                flag=true;
              }
          }
          if (flag==true) {
            fetchOneTypePlants(maloai)
          }else{
            fetchOneTypePots(maloai)
          }

        }
      }else {
        if (category == true) {
          fetchPlants();
        } else {
          fetchPots();
        }
      }
      setCurrentPage(1);
    }, [category,maloai]);

  return <div className="product-list col-9">
      <TitleComponent category={category} maloai={maloai} />
      <div className="list-body">
      {products.length==0&&<div className="product-list-notice">Hiện không có sản phẩm thuộc loại này,....</div>}
      {products.length!=0&&renderData()}
      </div>
      {products.length!=0&&
        <nav aria-label="Page navigation ">
        <ul class="pagination list-panigation">
          <li class="page-item"><button class="page-link" onClick={() => handlePageChange(1)} disabled={currentPage === 1} >{"<<"}</button>
            </li>
            {renderPaginationItems()}
          <li class="page-item"><button class="page-link" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} >{">>"}</button></li>
        </ul>
      </nav>
      }
      
    </div>;
};
function formatPath(inputString,productType,type) {
  let str=inputString;
  str= str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str= str.toLowerCase().replace(/\s+/g, '-');
  if (type!=undefined) {
    str ="/san-pham/"+str+"/"+productType+"/"+type;
  }
  else str ="/san-pham/"+str;
  return str;
}
function TitleComponent({category,maloai}) {
  let title ="";
  let content ="";
  if(maloai != undefined)
  {
    switch (maloai) {
      case "TA47597777":
        title="CÂY ĐỂ BÀN";
        content = "Cây để bàn theo phong thuỷ hiện đang rất được nhiều người yêu thích bởi vẻ đẹp tự nhiên và quan trọng nhất đó là có thể giúp gia chủ thu hút tài lộc, gặp nhiều may mắn."
        break;
      case "AQ63584597":
        title="CÂY THỦY SINH";
        content = "Cây thủy sinh không chỉ có tác dụng trang trí mà nó còn giúp thanh lọc không khí, làm cho không gian phòng trở nên thoáng mát hơn."
        break;    
      case "SLCA452863":
        title="SEN ĐÁ, XƯƠNG RỒNG";
        content = 'Sen đá - Xương rồng là bộ sưu tập không thể thiếu đối với "dân văn phòng". Bởi hình dáng nhỏ nhắn - xinh tươi mà sen đá và xương rồng rất được dân văn phòng yêu chuộng. '
        break;    
      case "HP71746869":
        title="CÂY CHẬU TREO";
        content = "Đừng bỏ quên ban công hay cửa sổ, sự lãng mạn nên thơ có thể toát lên ở những nơi đây chỉ bằng các chậu treo đơn giản, tinh tế."
        break;    
      case "FT16188943":
        title="CÂY ĂN TRÁI";
        content = "Các loại cây ăn trái phổ biến như cóc, ổi, xoài, khế... phục vụ nhu cầu trồng tại nhà, sân vườn. Cây được tuyển lựa từ giống cây khoẻ mạnh, không sâu bệnh."
        break;    
      case "TE57322385":
        title="CHẬU ĐẤT NUNG";
          content = "Chậu cây làm từ đất nung chất liệu tốt, mẫu mã đẹp, phù hợp trồng cây xanh phong thủy, cây cảnh để bàn, sen đá, xương rồng,... Chậu đất nung đủ các loại kích cỡ và màu sắc với giá siêu rẻ."
        break;    
      case "CM65743315":
        title="CHẬU XI MĂNG, ĐÁ MÀI";
          content = "Chậu đá mài tại Vườn Cây Việt làm từ đá Granite, đá cẩm thạch và được kết dính hoàn hảo tạo nên sản phẩm có tính thẩm mỹ cao. Chậu có độ bền cao, lâu đổi màu."
        break;    
      case "CR76321574":
        title="CHẬU SỨ";
          content = "Chậu men sứ, men cát với chất liệu gốm tốt, nước men đẹp; đường nét, hoa văn sắc sảo, kiểu dáng thanh lịch, phù hợp với nhiều loại cây cảnh, nội thất hay ngoại thất đều được."
        break;    
      case "CM56931108":
        title="CHẬU COMPOSITE";
          content = "Thiết kế chậu composite kiểu dáng đa dạng, sang trọng, độc đáo. Chậu composite có chất lượng bền bỉ, khó vỡ, khó lỗi thời hoặc đổi màu mà giá cả rất hợp lý."
        break;    
      case "PS59670186":
        title="CHẬU NHỰA";
          content = "Chậu nhựa ABS tại Vườn Cây Việt có độ bóng cao, màu đẹp, không phai màu, chịu nhiệt tốt và thiết kế thông minh, thích hợp trồng các loại cây cảnh nội thất, cây cảnh để bàn,…"
        break;
      default:
        break;
    }
  } else{
    if(category == undefined)
    {
      title="TẤT CẢ CÁC SẢN PHẨM ";
    }else {
      if (category == true) {
          title="CÂY CẢNH";
          content = "Mỗi chậu cây được phối hợp tạo nên vẻ đẹp hài hoà, có ý nghĩa phong thuỷ phù hợp với tuổi, mệnh để bạn dễ dàng lựa chọn."

      } else {
          title="CHẬU CẢNH";
          content = "Tổng hợp các loại chậu cảnh với nhiều kiểu dáng, màu sắc, chất liệu và kích thước khác nhau, khoác lên bộ áo đa dạng cho cây trồng."
      }
    }
  }
  return (
    <div className="list-header">
      <div className="header-title">{title}</div>
      <div className="header-content">{content}</div>
    </div>
  );
}
function formatPrice(price) {
      let strNum ="Đ";
      let phandu;
      let phannguyen=parseInt(price)
      while (phannguyen/1000>=1) {
          phandu = phannguyen%1000;
          phannguyen = (phannguyen-phandu)/1000;
          if (phandu===0) {
            strNum= ",000"+strNum;
          }
          else
          { 
              if(phandu.toString().length===3)
                strNum= ","+phandu.toString()+strNum;
              else if(phandu.toString().length===2)
                strNum= ",0"+phandu.toString()+strNum;
              else strNum= ",00"+phandu.toString()+strNum;
          }

      }
      strNum= phannguyen.toString()+strNum;
      return strNum;
}

export default ProductListComponent;
