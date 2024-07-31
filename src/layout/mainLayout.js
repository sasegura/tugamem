import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Footer from "./footer";

export default function MainLayout({ children }) {
  const { Content } = Layout;

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer />
    </Layout>
  );
}
