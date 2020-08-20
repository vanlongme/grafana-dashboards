import React, { FC } from 'react';
import {
  useTheme,
  LinkButton,
} from '@grafana/ui';
import { Field } from 'react-final-form';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './TermsAgreementCheckbox.styles';
import { Messages } from './TermsAgreementCheckbox.messages';
import { TERMS_OF_SERVICE_URL, PRIVACY_POLICY_URL, NOTIFICATION_SETTINGS_URL } from './TermsAgreementCheckbox.constants';
import { CheckboxFieldAdapter } from '..';

export const TermsAgreementCheckbox: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const CheckboxLabel = () => (
    <span data-qa="sign-up-agreement-checkbox-label" className={styles.checkboxLabel}>
      {Messages.agreementFirstPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href={TERMS_OF_SERVICE_URL}>{Messages.termsOfService}</LinkButton>
      {', '}
      <LinkButton className={styles.link} variant="link" href={PRIVACY_POLICY_URL}>{Messages.privacyPolicy}</LinkButton>
      {', '}
      {Messages.agreementSecondPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href={NOTIFICATION_SETTINGS_URL}>{Messages.notificationSettings}</LinkButton>
    </span>
  );

  return (
    <Field
      data-qa="sign-up-agreement-checkbox"
      className={styles.checkboxWrapper}
      label={<CheckboxLabel />}
      name="agreement"
      component={CheckboxFieldAdapter}
      validate={validators.requiredTrue}
      type="checkbox"
    />
  );
};
