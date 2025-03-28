import { Login } from '@game-trade/lib/providers/login/login';

import { LoginWrapper, LoginInner } from './style';

export const LoginContainer = () => {
  return (
    <LoginWrapper>
      <LoginInner>
        <Login forAdmin={true} />
      </LoginInner>
    </LoginWrapper>
  );
};
