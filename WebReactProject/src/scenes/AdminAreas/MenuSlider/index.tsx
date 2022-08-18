//#region  import
import {
  MenuUnfoldOutlined, MenuFoldOutlined, DashboardOutlined, SettingOutlined
} from "@ant-design/icons";
import './index.css'
import { Button, Layout, Menu } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Sider } = Layout;

declare var abp: any;

//#endregion

export interface IMenuSliderAdminProps {
  // đây
  location: any;
}

const key = "menuslideradmin"; // đây

export default function MenuSlider(props: IMenuSliderAdminProps) {

  const [collapsed, setcollapsed] = useState(false);

  return (
    <Sider key="sliderKey" trigger={null} collapsible collapsed={collapsed}>
      <div className="shrtdylg">
        <Button key="collapsed"
          onClick={() => setcollapsed(!collapsed)}
          style={{ width: "100%", margin: "0px 0px", borderRadius: "0" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={["item0_1"]}
          defaultOpenKeys={["item0_1"]}
          mode="inline"
          theme="dark"
          key="Menu"
        >
          <Menu.Item key="item0_1" defaultChecked={true} icon={React.createElement(DashboardOutlined)}>
            <Link to="/admin">Trình điều khiển</Link>
          </Menu.Item>
          <Menu.SubMenu key="menu9999" icon={<SettingOutlined />} title="Cài Đặt">
            <Menu.SubMenu key="menu9999.1" title="Phân quyền">
              <Menu.Item key="menu9999.1.1">
                <Link to="/admin/atomic-resource">Nguồn</Link>
              </Menu.Item>
              <Menu.Item key="menu9999.1.2">
                <Link to="/admin/role-permission">Vai trò</Link>
              </Menu.Item>
              <Menu.Item key="menu9999.1.3">
                <Link to="/admin/setting-role-basic">Phụ thuộc</Link>
              </Menu.Item>
              <Menu.Item key="menu9999.1.4">
                <Link to="/admin/setting-role">Nhóm</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="menu9999.2" title="Menu">
              <Menu.Item key="menu9999.2.1">
                <Link to="/admin/setting-menu">Hiển thị</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu>
      </div>
    </Sider>
  );
}
