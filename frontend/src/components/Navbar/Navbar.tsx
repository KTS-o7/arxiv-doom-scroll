import {
  StyledNav,
  Title,
  Acknowledgement,
  DoomName,
  ColorLink,
} from "./Navbar.styles";

const Navbar = () => {
  return (
    <StyledNav>
      <Title>ArXiv Doom Scroll</Title>
      <Acknowledgement>
        Content provided by arXiv.org - Find the latest research papers
      </Acknowledgement>
      <DoomName>
        Built by your fellow Doom Scroller:&nbsp;&nbsp;
        <ColorLink href="https://github.com/KTS-o7">KTS</ColorLink>
      </DoomName>
    </StyledNav>
  );
};

export default Navbar;
