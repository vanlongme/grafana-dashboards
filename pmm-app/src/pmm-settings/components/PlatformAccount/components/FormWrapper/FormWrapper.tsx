import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { getStyles } from './FormWrapper.styles';

export interface SignUpData {
  email: string;
  newPassword: string;
  agreement: boolean;
}

export interface SignInData {
  email: string;
  newPassword: string;
  agreement: boolean;
}

export const FormWrapper: FC<{onSubmit: (formData: any) => Promise<void>, render: (props: Omit<FormRenderProps<any>, 'handleSubmit'>) => React.ReactNode, title: string}> = ({ onSubmit, render, title }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const InnerForm: FC<FormRenderProps<any>> = ({
    handleSubmit, ...props
  }) => (
    <form data-qa="sign-in-form" className={styles.form} onSubmit={handleSubmit}>
      <legend className={styles.legend}>
        {title}
      </legend>
      {render(props)}
    </form>
  );

  return (
    <div data-qa="sign-up-form-wrapper" className={styles.formWrapper}>
      <Form
        onSubmit={onSubmit}
        render={InnerForm}
      />
    </div>
  );
};
