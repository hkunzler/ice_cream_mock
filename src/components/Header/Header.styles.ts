import { Layout } from "antd";
import styled from "styled-components";

const { Header: AntHeader } = Layout;

export const StyledHeader = styled(AntHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  box-shadow: 0 2px 8px #f0f1f2;
`;

export const Logo = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background-image: url("https://source.unsplash.com/random/120x31?ice-cream");
  background-size: cover;
  background-position: center;
`;


export const NeonStyle = styled.span`
  color: #f900b3,
  textShadow: 
    0 0 5px #ff77ff, 
    0 0 10px #ff77ff, 
    0 0 20px #ff77ff, 
    0 0 40px #ff00ff, 
    0 0 80px #ff00ff, 
    0 0 90px #ff00ff, 
    0 0 100px #ff00ff, 
    0 0 150px #ff00ff,
  fontWeight: bold,
  fontSize: 1.5rem,
`;