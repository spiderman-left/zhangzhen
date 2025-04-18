import { Layout, Menu } from 'antd';
import {
  RadarChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
} from '@ant-design/icons';
import { Link, useLocation, Outlet } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const items = [
  {
    key: '/student',
    icon: <BarChartOutlined />,
    label: <Link to="/student">Student-Aspect CDCD</Link>,
  },
  {
    key: '/exercise',
    icon: <DotChartOutlined />,
    label: <Link to="/exercise">Exercise-Aspect CDCD</Link>,
  },
  {
    key: '/radar',
    icon: <RadarChartOutlined />,
    label: <Link to="/radar">多框架雷达图</Link>,
  },
];

const MainLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh', background: '#0f1b2a' }}>
      <Sider width={250} style={{ background: '#0f1b2a' }}>
        <div
          style={{
            height: 64,
            textAlign: 'center',
            padding: '16px 0',
            color: '#00d4ff',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          XXX可视化系统
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          style={{ background: '#0f1b2a' }}
        />
      </Sider>

      <Layout style={{ background: '#0f1b2a' }}>
        <Header style={{ background: '#142536', padding: 0 }} />
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: '#1f2a38',
            color: '#fff',
            borderRadius: 8,
            overflow: 'auto',
            flex: 1,
            width:'75vw'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
