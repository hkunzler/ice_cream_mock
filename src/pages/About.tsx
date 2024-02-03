import { Card, Typography } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const AboutContainer = styled(Card)`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const AboutPage: React.FC = () => {
  return (
    <AboutContainer>
      <Title level={2}>About Our Ice Cream Shop</Title>
      <Paragraph>
        Welcome to our Ice Cream Shop, a place where sweet dreams come true and
        flavors are always in bloom! Founded in 2023, our shop has been serving
        the community with the finest handcrafted ice cream made from locally
        sourced, organic ingredients{" "}
      </Paragraph>
      <Paragraph>
        Our mission is to bring joy to all through our delicious ice cream. We
        believe in creating unique flavors that can't be found anywhere else,
        along with all the classic favorites. Every scoop from our shop is a
        perfect blend of innovation, tradition, and, most importantly,
        happiness.
      </Paragraph>
      <Title level={3}>Our Values</Title>
      <Paragraph style={{ textAlign: "left" }}>
        <ul>
          <li>
            <strong>Quality</strong>: Only the best ingredients go into our ice
            cream.
          </li>
          <li>
            <strong>Creativity</strong>: New, exciting flavors are the heart of
            our menu.
          </li>
          <li>
            <strong>Community</strong>: We're proud to be a part of and serve
            our local community.
          </li>
        </ul>
      </Paragraph>
      <Paragraph>
        Come visit us and taste the difference for yourself. We can't wait to
        share our passion for ice cream with you!
      </Paragraph>
    </AboutContainer>
  );
};

export default AboutPage;
