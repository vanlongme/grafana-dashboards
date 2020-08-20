import React, { FC, useState } from 'react';
import { SignUp, SignIn } from './components';

interface PlatformAccount {
  userEmail: string | undefined;
}

export const PlatformAccount: FC<PlatformAccount> = ({ userEmail }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState(userEmail);

  const form = showSignUp ? <SignUp /> : <SignIn />;

  return (
    <>
      {userEmail != null ? <div>logged in</div> : form}
    </>
  );
};
