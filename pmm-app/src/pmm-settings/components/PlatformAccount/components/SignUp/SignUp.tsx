import React, {
  FC,
  useState
} from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import {
  Button,
  useTheme,
} from '@grafana/ui';
import { showSuccessNotification, showErrorNotification } from 'shared/components/helpers';
import { ButtonWithSpinner } from 'shared/components/Form';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './SignUp.styles';
import { Messages } from './SignUp.messages';
import {
  FormWrapper, InputFieldAdapter, LoggedIn, TermsAgreementCheckbox,
} from '..';
import { SignUpData, SignUpProps } from './types';

const signUp = async (signUpData: SignUpData) => {
  // XXX: stub for the actual sign up API call
  signUpData;
  await new Promise((resolve) => setTimeout(resolve, 1500));
};

export const SignUp: FC<SignUpProps> = ({ userEmail }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [loggedInEmail, setLoggedInEmail] = useState(userEmail);

  const handleSignUpFormSubmit = async (signUpData: SignUpData) => {
    try {
      await signUp(signUpData);
      setLoggedInEmail(signUpData.email);
      showSuccessNotification({ message: Messages.signUpSucceeded });
    } catch (e) {
      console.error(e);
      showErrorNotification({ message: Messages.errors.signUpFailed });
    }
  };

  const Fields = ({
    pristine, submitting, valid
  }) => (
    <>
      <Field
        data-qa="sign-up-email-input"
        name="email"
        label={Messages.emailLabel}
        component={InputFieldAdapter}
        validate={validators.compose(validators.required, validators.validateEmail)}
      />
      <Field
        data-qa="sign-up-password-input"
        name="newPassword"
        label={Messages.passwordLabel}
        type="password"
        component={InputFieldAdapter}
        validate={validators.required}
        autoComplete="on"
      />
      <TermsAgreementCheckbox />
      <ButtonWithSpinner
        data-qa="sign-up-submit-button"
        className={styles.submitButton}
        type="submit"
        disabled={!valid || submitting || pristine}
        isLoading={submitting}
      >
        {Messages.signUp}
      </ButtonWithSpinner>
      <Button
        data-qa="sign-up-to-sign-in-button"
        className={styles.signInButton}
        type="button"
        variant="destructive"
      >
        {Messages.signIn}
      </Button>
    </>
  );

  const InnerForm: FC<FormRenderProps<SignUpData>> = ({
    pristine, submitting, valid, handleSubmit
  }) => (
    <form data-qa="sign-up-form" className={styles.form} onSubmit={handleSubmit}>
      <legend className={styles.legend}>
        {Messages.signUp}
      </legend>
      <Field
        data-qa="sign-up-email-input"
        name="email"
        label={Messages.emailLabel}
        component={InputFieldAdapter}
        validate={validators.compose(validators.required, validators.validateEmail)}
      />
      <Field
        data-qa="sign-up-password-input"
        name="newPassword"
        label={Messages.passwordLabel}
        type="password"
        component={InputFieldAdapter}
        validate={validators.required}
        autoComplete="on"
      />
      <TermsAgreementCheckbox />
      <ButtonWithSpinner
        data-qa="sign-up-submit-button"
        className={styles.submitButton}
        type="submit"
        disabled={!valid || submitting || pristine}
        isLoading={submitting}
      >
        {Messages.signUp}
      </ButtonWithSpinner>
      <Button
        data-qa="sign-up-to-sign-in-button"
        className={styles.signInButton}
        type="button"
        variant="destructive"
      >
        {Messages.signIn}
      </Button>
    </form>
  );

  return (
    // TODO (nicolalamacchia): improve this once the sign in component is ready
    <>
      {loggedInEmail != null
        ? <LoggedIn email={loggedInEmail} />
        : (
          <FormWrapper onSubmit={handleSignUpFormSubmit} render={Fields} title={Messages.signIn} />
        )}
    </>
  );
};
