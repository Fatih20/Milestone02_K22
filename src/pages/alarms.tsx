import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AlarmComponent from "../components/elements/alarm";
import AlarmForm from "../components/elements/alarmForm";
import Deactivation from "../components/elements/deactivation";
import GamePage from "../components/elements/game";
import LoadingRotation from "../components/elements/loading";
import BaseLayout from "../components/layout/base";
import { Alarm, TimeWhitelist } from "../types/types";
import { addAlarm, deleteAlarm, getMyAlarm } from "../utils/api";

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 1em 0;
  gap: 1em;
  justify-content: center;

  @media (min-width: 1366px) {
    flex-direction: row;
  }
`;

const AlarmList = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  width: 100%;
`;

export default function AlarmPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [alarmActive, setAlarmActive] = useState(null as null | number);
  const [hydrated, setHydrated] = useState(false);
  const [alarmSound, setAlarmSound] = useState(null as any);
  const temporarilyWhitelisted = useRef({
    hour: null,
    minute: null,
  } as TimeWhitelist);

  const {
    data: alarmList,
    status,
    error,
  } = useQuery<Alarm[] | undefined>(["myAlarms"], getMyAlarm, {
    retry: 1,
    onError: () => {
      router.push("/login");
    },
  });

  function alarmChecker(
    alarmList: Alarm[],
    { hour: hourWhitelist, minute: minuteWhitelist }: TimeWhitelist
  ) {
    if (!alarmList) {
      return;
    }
    const time = new Date();
    const hourNow = time.getHours();
    const minuteNow = time.getMinutes();

    if (hourNow === hourWhitelist && minuteNow === minuteWhitelist) {
      return;
    }
    // console.log(alarmList);
    const alarmGoingOff = alarmList.find(
      ({ Hour, Minute }) => Hour === hourNow && Minute === minuteNow
    );

    if (alarmGoingOff) {
      temporarilyWhitelisted.current = { hour: hourNow, minute: minuteNow };
      setAlarmActive(alarmGoingOff.alarm_id);
    }
  }

  useEffect(() => {
    setHydrated(true);
    setAlarmSound(new Audio("/alarmSound.mp3"));
  }, []);

  // useEffect(() => {
  //   if (hydrated) {
  //     setAlarmSound(new Audio("/alarmSound.mp3"));
  //   }
  // }, [hydrated]);

  useEffect(() => {
    if (status === "success" && alarmList && hydrated) {
      const checkAlarmInterval = setInterval(
        () => alarmChecker(alarmList, temporarilyWhitelisted.current),
        1000
      );
      return () => clearInterval(checkAlarmInterval);
    }
  }, [status, alarmList, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (alarmActive !== null) {
      alarmSound.loop = true;
      alarmSound.play();
      return () => alarmSound.pause();
    } else {
      alarmSound.pause();
    }
  }, [alarmActive, alarmSound, hydrated]);

  const { mutateAsync: addAlarmAndMutate } = useMutation(addAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(["myAlarms"]);
    },
  });

  const { mutateAsync: deleteAlarmAndMutate } = useMutation(deleteAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(["myAlarms"]);
    },
  });

  if (status === "loading") {
    return (
      <BaseLayout>
        <LoadingRotation />
      </BaseLayout>
    );
  }

  if (status === "error") {
    console.log(error);
  }

  if (alarmActive && alarmList) {
    const activeAlarm = alarmList.find(
      ({ alarm_id }) => alarm_id === alarmActive
    );
    return (
      <BaseLayout>
        <GamePage
          hour={activeAlarm?.Hour}
          minute={activeAlarm?.Minute}
          alarm_id={alarmActive}
          runOnDone={() => {
            alarmSound.pause();
            setTimeout(() => setAlarmActive(null), 1000);
          }}
          urgency={
            alarmList.find(({ alarm_id }) => alarm_id === alarmActive)
              ?.Difficulty ?? "low"
          }
        />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout showAccount={true}>
      <Main style={{ color: "white" }}>
        <AlarmList>
          {(alarmList ?? []).map((alarm) => (
            <AlarmComponent
              key={JSON.stringify(alarm)}
              alarm={alarm}
              functionToDelete={async () =>
                deleteAlarmAndMutate(alarm.alarm_id)
              }
            />
          ))}
        </AlarmList>
        <AlarmList>
          <AlarmForm functionToAdd={addAlarmAndMutate} />
        </AlarmList>
      </Main>
    </BaseLayout>
  );
}
