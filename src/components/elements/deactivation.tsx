import styled from "styled-components";

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const Title = styled.h2`
  font-weight: 900;
  font-size: 4em;
  text-align: center;
`;

const Subtitle = styled.h3`
  color: var(--yellow-color);
  font-weight: 900;
  font-size: 3em;
`;

export default function Deactivation({
  hour,
  minute,
}: {
  hour: number | undefined;
  minute: number | undefined;
}) {
  return (
    <Main>
      <Title>
        Alarm at {hour ?? "00"}.{minute ?? "00"}
      </Title>
      <Subtitle>Deactivated</Subtitle>
    </Main>
  );
}
