import HomePage from "../pages/HomePage/HomePage.jsx";
import IntroducePage from "../pages/IntroducePage/IntroducePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import AccountPage from "../pages/AccountPage/AccountPage.jsx";
import CartPage from "../pages/CartPage/CartPage.jsx";
import PayPage from "../pages/PayPage/PayPage.jsx";
import SettingPage from "../pages/SettingPage/SettingPage.jsx";
import ProductPage from "../pages/ProductPage/ProductPage.jsx";
import AdminLayout from "../layouts/adminlayout/AdminLayout";
import ProductTypesAdmin from "../pages/ProductTypesAdmin/ProductTypesAdmin.js";
import Customers from "../pages/Customers/Customers";
import DashBoard from "../pages/DashBoard/DashBoard";
import Inventory from "../pages/Inventory/Inventory";
import AdminSignInPage from "../pages/SignInPage/AdminSignInPage";
import OrderPageAdmin from "../pages/OrderPageAdmin/OrderPageAdmin.js";
import ConfirmPage from "../pages/ConfirmPage/ConfirmPage.jsx";
import ConfirmPayMentPage from "../pages/ConfirmPayMentPage/ConfirmPayMentPage.jsx";
import CategoryAdmin from "../pages/Category/CategoryAdmin.js";
export const routes = [
  {
    path: "/",
    page: IntroducePage,
  },
  {
    path: "/xac-minh",
    page: ConfirmPage,
  },
  {
    path: "/xac-minh-thanh-toan",
    page: ConfirmPayMentPage,
  },
  {
    path: "/gioi-thieu",
    page: IntroducePage,
  },
  {
    path: "/thong-tin-ca-nhan",
    page: SettingPage,
    log: true,
    choice: 0,
  },
  {
    path: "/doi-mat-khau",
    page: SettingPage,
    log: true,
    choice: 1,
  },
  {
    path: "/lich-su-mua-hang",
    page: SettingPage,
    log: true,
    choice: 2,
    list: [],
  },
  {
    path: "/dang-nhap",
    page: AccountPage,
    type: 0,
  },
  {
    path: "/thanh-toan",
    page: PayPage,
    log: true,
  },
  {
    path: "/dang-ky",
    page: AccountPage,
    type: 1,
  },
  {
    path: "/quen-mat-khau",
    page: AccountPage,
    type: 2,
  },
  {
    path: "/gio-hang",
    page: CartPage,
    list: [],
  },
  {
    path: "/trang-chu",
    page: HomePage,
    category: undefined,
  },
  {
    path: "/chuyen-muc/cay-canh",
    page: HomePage,
    category: true,
  },
  {
    path: "/chuyen-muc/chau-canh",
    page: HomePage,
    category: false,
  },
  {
    path: "/chuyen-muc/:tenloai/:maloai",
    page: HomePage,
  },
  {
    path: "/san-pham/:tensp/:maloai/:masp",
    page: ProductPage,
  },

  {
    path: "/Admin",
    page: AdminSignInPage,
    admin: false,
    loggedIn: true,
  },

  {
    path: "/Admin/login",
    page: AdminSignInPage,
    admin: false,
    loggedIn: true,
  },

  {
    path: "/Admin/dash",
    page: DashBoard,
    admin: true,
  },
  {
    path: "/Admin/inventory",
    page: Inventory,
    admin: true,
  },
  {
    path: "/Admin/customers",
    page: Customers,
    admin: true,
  },
  {
    path: "/Admin/orders",
    page: OrderPageAdmin,
    admin: true,
  },
  {
    path: "/Admin/producttype",
    page: ProductTypesAdmin,
    admin: true,
  },
  {
    path: "/Admin/category",
    page: CategoryAdmin,
    admin: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
