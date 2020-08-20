import React, {
  FC,
  useState
} from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';
import {
  Button,
  useTheme,
} from '@grafana/ui';
import { showSuccessNotification, showErrorNotification } from 'shared/components/helpers';
import { ButtonWithSpinner } from 'shared/components/Form';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './SignIn.styles';
import { Messages } from '../../PlatformAccount.messages';
import { InputFieldAdapter, LoggedIn } from '..';
import { SignInData, SignInProps } from './types';


const signIn = async (signInData: SignInData) => {
  // XXX: stub for the actual sign in API call
  signInData;
  await new Promise((resolve) => setTimeout(resolve, 1500));
};

export const SignIn: FC<SignInProps> = ({ userEmail }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [loggedInEmail, setLoggedInEmail] = useState(userEmail);

  const handleSignInFormSubmit = async (signInData: SignInData) => {
    try {
      await signIn(signInData);
      setLoggedInEmail(signInData.email);
      showSuccessNotification({ message: Messages.signInSucceeded });
    } catch (e) {
      console.error(e);
      showErrorNotification({ message: Messages.errors.signInFailed });
    }
  };

  const InnerForm: FC<FormRenderProps<SignInData>> = ({
    pristine, submitting, valid, handleSubmit
  }) => (
    <form data-qa="sign-in-form" className={styles.form} onSubmit={handleSubmit}>
      <legend className={styles.legend}>
        {Messages.signIn}
      </legend>
      <Field
        data-qa="sign-in-email-input"
        name="email"
        label={Messages.emailLabel}
        component={InputFieldAdapter}
        validate={validators.compose(validators.required, validators.validateEmail)}
      />
      <Field
        data-qa="sign-in-password-input"
        name="newPassword"
        label={Messages.passwordLabel}
        type="password"
        component={InputFieldAdapter}
        validate={validators.required}
        autoComplete="on"
      />
      <ButtonWithSpinner
        data-qa="sign-in-submit-button"
        className={styles.submitButton}
        type="submit"
        disabled={!valid || submitting || pristine}
        isLoading={submitting}
      >
        {Messages.signIn}
      </ButtonWithSpinner>
      <Button
        data-qa="sign-in-to-sign-up-button"
        className={styles.signUpButton}
        type="button"
        variant="destructive"
      >
        {Messages.signUp}
      </Button>
    </form>
  );

  return (
    // TODO (nicolalamacchia): improve this once the sign in component is ready
    <>
      {loggedInEmail != null
        ? <LoggedIn email={loggedInEmail} />
        : (
          <div data-qa="sign-in-form-wrapper" className={styles.formWrapper}>
            <Form
              onSubmit={handleSignInFormSubmit}
              render={InnerForm}
            />
          </div>
        )}
    </>
  );
};
