import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const centeredButton = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  legend: css`
    color: ${(theme.colors as any).formLegend};
    font-size: ${theme.typography.heading.h3};
    font-weight: ${theme.typography.weight.regular};
    margin: ${(theme.spacing as any).formLegendMargin};
    text-align: center;
  `,
  formWrapper: css`
    align-items: start;
    display: flex;
    flex-direction: column;
    margin-right: 60px;
  `,
  form: css`
    max-width: 300px;
    min-width: 150px;
    width: 100%;
  `,
  submitButton: css`
    ${centeredButton}
    margin-bottom: ${theme.spacing.formInputMargin};
  `,
  signInButton: css`
    ${centeredButton}
  `,
  signUpButton: css`
    ${centeredButton}
  `,
}));
