import { Layout } from "antd";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <HeaderLayout />
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumbs />
        <Outlet />
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default MainLayout;
