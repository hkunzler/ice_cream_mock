import { Layout } from "antd";
import { styled } from "styled-components";

const { Footer: AntFooter } = Layout;

export const StyledFooter = styled(AntFooter)`
  text-align: center;
  padding: 20px 50px;
  background: rgb(31, 4, 23);
  box-shadow: 0 -5px 10px rgba(240, 242, 245, 0.1);
`;
