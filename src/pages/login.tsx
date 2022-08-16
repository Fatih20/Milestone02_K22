import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import BaseLayout from "../components/layout/base";
import { UserLogin } from "../types/types";
import { login } from "../utils/api";

export const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  color: #ffe16b;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
`;

export const FormContainer = styled.div`
  align-items: center;
  border: solid 4px #ffe16b;
  border-radius: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  padding: 0.5em;
  padding-top: 3em;
  color: white;
  margin-top: -2.78em;


`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
  padding: 1rem;

`;

export const InputContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  justify-content: center;
  width: 100%;
  font-weight: 500;
  font-size: 0.75em;
`;

export const InputText = styled.input`
  padding: 0.25em;
  width: 100%;
  background: none;
  border: solid 1px white;
  border-radius: 2em;
  color: white;
`;

export const SubmitButton = styled.button`
  border-radius: 1em;
  background-color: #ffe16b;
  padding: 0.25em 0;
  font-size: 1em;
  margin-top: 2em;
  font-weight: 900

`;

export const Spacer = styled.div`
  flex-grow: 1;
`;

export default function Login() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    data,
    isError,
    error,
    isLoading,
    mutateAsync: loginAndMutate,
  } = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      window.location.href = "./";
    },
    onError: () => {
      setUsername("");
      setPassword("");
    },
  });

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await loginAndMutate({ username, password });
  }

  return (
    <BaseLayout>
      <Main>
        <FontAwesomeIcon icon={faCircleUser} size='4x' />
        <FormContainer>
          <Title>Login to Your Account</Title>
          <FormStyled onSubmit={(e) => handleLogin(e)}>
            <InputContainer>
              <label htmlFor='username' style={{ color: "white"}}>
                Username
              </label>
              <InputText
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label
                htmlFor='password'
                style={{ color: "white", marginTop: "0.5rem" }}
              >
                Password
              </label>
              <InputText
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <SubmitButton type='submit'>Sign In</SubmitButton>
          </FormStyled>
          <p style={{ color: "white", fontSize: "0.6rem" }}>
            Don&apos;t have an account yet?{" "}
            <a
              href='./register'
              style={{ color: "white", textDecoration: "underline" }}
            >
              Register
            </a>
          </p>
        </FormContainer>
      </Main>
    </BaseLayout>
  );
}
