import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  link: css`
    font-size: 1em;
    height: 1em;
    padding: 0;
    vertical-align: baseline;
  `,
  checkboxWrapper: css`
    label {
      text-align: left
    }

    &.invalid input + span {
      box-shadow: inset 0 0 5px ${(theme.colors as any).red};
    }
  `,
  checkboxLabel: css`
    display: inline-block;
    line-height: 1.7;
    padding-right: ${theme.spacing.formInputPaddingHorizontal};
  `,
}));
