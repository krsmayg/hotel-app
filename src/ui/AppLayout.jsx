import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";
import { createContext, useRef } from "react";

const StyledAppContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* grid-template-areas:
    "a a a a  b b b b  b b b b"
    "a a a a  c c c c  c c c c"
    "a a a a  c c c c  c c c c"
    ; */
`;
const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
  overflow-y: scroll;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const ScrollContext = createContext();
const AppLayout = () => {
  const scrollRef = useRef(null);
  return (
    <ScrollContext.Provider value={{scrollRef}}>
      <StyledAppContainer>
        <Header />
        <SideBar />
        <Main ref={scrollRef}>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppContainer>
    </ScrollContext.Provider>
  );
};

export default AppLayout;
