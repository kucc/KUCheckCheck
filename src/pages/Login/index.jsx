import React from "react";
import LoginForm from "./components/LoginForm";
import Description from "../../components/Description";
import { StyledRow, StyledCol, Wrapper } from "./style";
import { useHistory } from "react-router";

function Login() {
  const history = useHistory();

  return (
    <StyledRow>
      <StyledCol span={6} offset={8}>
        <Wrapper>
          <Description />
          <LoginForm />
          <a
            href="/signup"
            style={{
              textAlign: "center",
              textDecoration: "none",
              display: "block",
            }}
          >
            JOIN
          </a>
        </Wrapper>
      </StyledCol>
    </StyledRow>
  );
}
export default Login;
