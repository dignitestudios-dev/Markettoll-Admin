import Auth from "../components/Global/Auth";
import Layout from "../components/Global/Layout";
import UserInfo from "../components/UserDetails/UserInfo";
import Category from "../pages/Category/Category";
import CreateCategory from "../pages/Category/CreateCategory";
import EditCategory from "../pages/Category/EditCategory";
import Customer from "../pages/CustomerSupport";
import Dashboard from "../pages/Dashboard";
import DeletedAccounts from "../pages/DeletedAccounts";
import Login from "../pages/Login";
import Notifications from "../pages/Notifications";
import Order from "../pages/Order";
import Plans from "../pages/Plans";
import Products from "../pages/Products";
import ReportDetails from "../pages/ReportDetails";
import Reports from "../pages/Reports";
import ResetPassword from "../pages/ResetPassword";
import Revenue from "../pages/Revenue";
import CreateSubCategory from "../pages/SubCategory/CreateSubCategory";
import EditSubCategory from "../pages/SubCategory/EditSubCategory";
import SubCategory from "../pages/SubCategory/SubCategory";
import Users from "../pages/Users";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyOtp from "../pages/VerifyOtp";

export const AppRoutes = [
  {
    Title: "Dashboard Page",
    url: "/",
    page: <Layout pages={<Auth />} />,
  },
  {
    Title: "Dashboard Page",
    url: "/dashboard",
    page: <Layout pages={<Dashboard />} />,
  },
  {
    Title: "Subscription Plans Page",
    url: "/plans",
    page: <Layout pages={<Plans />} />,
  },
  {
    Title: "Users Page",
    url: "/users",
    page: <Layout pages={<Users />} />,
  },
  {
    Title: "Products",
    url: "/products",
    page: <Layout pages={<Products />} />,
  },
  {
    Title: "Order Page",
    url: "/order",
    page: <Layout pages={<Order />} />,
  },
  
  {
    Title: "Category",
    url: "/category",
    page: <Layout pages={<Category />} />,
  },
  {
    Title: "CreateCategory",
    url: "/createcategory",
    page: <Layout pages={<CreateCategory />} />,
  },
  {
    Title: "EditCategory",
    url: "/editcategory",
    page: <Layout pages={<EditCategory />} />,
  },


  {
    Title: "SubCategory",
    url: "/subcategory",
    page: <Layout pages={<SubCategory />} />,
  },
  {
    Title: "SubCreateCategory",
    url: "/subcreatecategory",
    page: <Layout pages={<CreateSubCategory />} />,
  },
  {
    Title: "SubEditCategory",
    url: "/subeditcategory",
    page: <Layout pages={<EditSubCategory />} />,
  },
  {
    Title: "Customer",
    url: "/customer",
    page: <Layout pages={<Customer />} />,
  },

  {
    Title: "Deleted",
    url: "/deleted",
    page: <Layout pages={<DeletedAccounts />} />,
  },
  {
    Title: "User Information Page",
    url: "/user/12323",
    page: <Layout pages={<UserInfo />} />,
  },
  {
    Title: "Subscriptions Page",
    url: "/revenue",
    page: <Layout pages={<Revenue />} />,
  },
  {
    Title: "Notifications Page",
    url: "/notifications",
    page: <Layout pages={<Notifications />} />,
  },
  {
    Title: "Reports Page",
    url: "/reports",
    page: <Layout pages={<Reports />} />,
  },
  {
    Title: "Report Details Page",
    url: "/reports/1234",
    page: <Layout pages={<ReportDetails />} />,
  },
  {
    Title: "Dashboard Page",
    url: "/login",
    page: <Login />,
  },
  {
    Title: "Dashboard Page",
    url: "/verify-email",
    page: <VerifyEmail />,
  },
  {
    Title: "Dashboard Page",
    url: "/verify-otp",
    page: <VerifyOtp />,
  },
  {
    Title: "Dashboard Page",
    url: "/reset-password",
    page: <ResetPassword />,
  },
];
