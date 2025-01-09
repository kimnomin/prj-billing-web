import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

const { Header } = Layout;

function HeaderLayout() {
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/billing/list">Billing List</Link>,
    },
    {
      key: "2",
      label: <Link to="/billing/stats">Billing Stats</Link>,
    },
  ];

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo">LOGO</div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ flex: 1, minWidth: 0 }}
      />
      <div>
        <LoginForm />
      </div>
    </Header>
  );
}

export default HeaderLayout;
