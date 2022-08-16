import Header from "../elements/header";
import { ReactNode } from "react";
import styled from "styled-components";

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
`;

const ChildrenContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`;

export default function BaseLayout({
  children,
  showAccount,
}: {
  children?: JSX.Element;
  showAccount?: boolean;
}) {
  return (
    <Main>
      <Header showAccount={showAccount ?? false} />
      <ChildrenContainer>{children}</ChildrenContainer>
    </Main>
  );
}
