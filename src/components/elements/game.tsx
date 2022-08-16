import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "./card";
import {
  ICard,
  ICardWithID,
  possibleSymbolList,
  Urgency,
} from "../../types/types";
import { checkIfSameShape, shuffleArray } from "../../utils/utilities";
import configUX from "../../config/configUX";

type GameProps = {
  alarm_id: number;
  urgency: Urgency;
  runOnDone: () => void;
};

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  gap: 1em;
  padding: 1rem;
  width: 100%;

  /* border: solid 1px white; */
`;

const ScoreBoard = styled.h2`
  display: block;
`;

const GameContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  padding: 1rem;
  width: 100%;
`;

const Division = styled.div`
  background-color: #ffd35c;
  height: 100%;
  width: 100%;
`;

function cardArrayGenerator() {
  return shuffleArray<ICard>(
    possibleSymbolList
      .map((symbol) => {
        return Array.from({ length: 4 }, (_, i) => {
          return {
            symbol,
          } as ICard;
        });
      })
      .reduce((accumulatedArray: ICard[], arrayToMerge: ICard[]) => {
        return [...accumulatedArray, ...arrayToMerge];
      })
  ).map((card, i) => {
    return { ...card, id: i } as ICardWithID;
  });
}

export default function GamePage({ alarm_id, runOnDone, urgency }: GameProps) {
  const [hydrated, setHydrated] = useState(false);
  const [remainingRound, setRemainingRound] = useState(
    configUX.urgencyToRound[urgency]
  );
  const [allCardSet, setAllCardSet] = useState(cardArrayGenerator());
  const [openedCard, setOpenedCard] = useState([] as ICardWithID[]);
  const hiddenCard = useRef([] as ICardWithID[]);
  const suspendClicking = useRef(false);

  function reset() {
    setAllCardSet(cardArrayGenerator());
    setOpenedCard([] as ICardWithID[]);
    hiddenCard.current = [] as ICardWithID[];
  }

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (openedCard.length === 4) {
      suspendClicking.current = true;
      setTimeout(() => {
        if (checkIfSameShape(openedCard)) {
          hiddenCard.current = [...hiddenCard.current, ...openedCard];
        }
        setOpenedCard([] as ICardWithID[]);
        suspendClicking.current = false;
      }, 1000);
    }
  }, [openedCard]);

  useEffect(() => {
    if (hiddenCard.current.length === 16) {
      if (remainingRound > 1) {
        setRemainingRound((prevRemainingRound) => prevRemainingRound - 1);
        reset();
      } else {
        runOnDone();
      }
    }
  }, [hiddenCard.current, remainingRound, runOnDone]);

  useEffect(() => {
    if (remainingRound === 0) {
      runOnDone();
    }
  }, [remainingRound, runOnDone]);

  if (!hydrated) {
    return null;
  }

  return (
    <Main>
      <ScoreBoard>
        {remainingRound} {remainingRound > 1 ? "rounds" : "round"} remaining
      </ScoreBoard>
      <GameContainer>
        {allCardSet.map(({ id, symbol }: ICardWithID) => {
          const isOpen = openedCard.some((card) => card.id === id);
          const isHidden = hiddenCard.current.some((card) => card.id === id);
          return (
            <Card
              isHidden={isHidden}
              key={id}
              isOpen={isOpen}
              shape={symbol}
              onClickFunction={() => {
                if (isOpen || suspendClicking.current || isHidden) {
                  return;
                }
                setOpenedCard((prevOpenedCard) => {
                  return [...prevOpenedCard, { id, symbol }];
                });
              }}
            />
          );
        })}
      </GameContainer>
    </Main>
  );
}
