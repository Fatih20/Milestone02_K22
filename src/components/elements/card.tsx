import { ReactNode } from "react";
import styled from "styled-components";
import { Symbol } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faSquare,
  faCircle,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

interface ICardComponent {
  isHidden: boolean;
  isOpen: boolean;
  colorInner: string;
}

const Main = styled.div<ICardComponent>`
  align-items: center;
  background-color: ${({ isOpen }) => (isOpen ? "#0784C5" : "#ffd35c")};
  color: ${({ colorInner }) => colorInner};
  display: flex;
  justify-content: center;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  height: 100%;
  width: 100%;
`;

export default function Card({
  shape,
  isOpen,
  isHidden,
  onClickFunction,
}: {
  shape: Symbol;
  isOpen: boolean;
  isHidden: boolean;
  onClickFunction: () => void;
}) {
  const symbolNameToShape = {
    circle: {
      icon: <FontAwesomeIcon icon={faCircle} />,
      color: "#7239b3",
    },
    square: {
      icon: <FontAwesomeIcon icon={faSquare} />,
      color: "#0d52bf",
    },
    shield: {
      icon: <FontAwesomeIcon icon={faShield} />,
      color: "#bc245d",
    },
    star: {
      icon: <FontAwesomeIcon icon={faStar} />,
      color: "#007367",
    },
  } as Record<Symbol, { icon: ReactNode; color: string }>;

  return (
    <Main
      onClick={onClickFunction}
      isHidden={isHidden}
      isOpen={isOpen}
      colorInner={symbolNameToShape[shape].color}
    >
      {isOpen ? symbolNameToShape[shape].icon : <></>}
    </Main>
  );
}
