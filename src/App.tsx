import { ConfigProvider, Flex, Layout } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { styled } from "styled-components";
import "./App.css";
import banner from "./assets/images/ice_cream_banner.jpeg";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AboutPage from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";

const { Content } = Layout;

const HeroContainer = styled.div`
  background: url(${banner}) center / cover no-repeat scroll;
  height: 500px;
  width: 100vw;
  text-align: center;
`;

const ContentContainer = styled(Content)`
  padding: 2rem;
  min-height: 100vh;
`;

const TextOverlay = styled(Flex)`
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  color: #f900b3;
  text-shadow: 0 0 5px #ff77ff, 0 0 10px #ff77ff, 0 0 20px #ff00ff;
  font-size: 5rem;

  font-family: "Tilt Neon", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "XROT" 0, "YROT" 0;
  letter-spacing: 0.5rem;
  span {
    font-family: "Neonderthaw", cursive;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0;
  }
`;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f900b3",
          colorTextBase: "#f1d3f1",
          colorBgBase: "#2b0520",
          fontSize: 16,
          wireframe: true,
        },
        components: {
          Menu: {
            darkItemBg: "rgb(31 4 23)",
            darkItemColor: "#f1d3f1",
          },
          Card: {
            colorBgContainer: "#f9f0f9",
            colorText: "#160d0d",
            colorTextHeading: "#160d0d",
            colorBorderSecondary: "transparent",
            borderRadiusSM: 0,
          },
          Typography: {
            colorTextHeading: "#160d0d",
            colorText: "#160d0d",
          },
          Checkbox: {
            colorText: "#160d0d",
          },
        },
      }}
    >
      <Router>
        <Layout>
          <Header />
          <HeroContainer>
            <TextOverlay align="center" justify="center" vertical>
              ICE CREAM <br /> SOLVES <br /> <span>everything</span>
            </TextOverlay>
          </HeroContainer>
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </ContentContainer>
          <Footer />
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
