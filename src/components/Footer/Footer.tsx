import { StyledFooter } from "./Footer.styles";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      ©{new Date().getFullYear()} Ice Cream Shop. All Rights Reserved.
    </StyledFooter>
  );
};

export default Footer;
