import React from 'react';
import sqlFormatter from 'sql-formatter';
import { ReactJSON } from 'shared/components/Elements/ReactJSON/ReactJSON';
import { Databases } from '../Details.types';
import { HighlightWrapper } from '../../HighlightWrapper/HighlightWrapper';

export const getExample = (databaseType) => (example: any): any => {
  if (databaseType === Databases.mongodb) {
    return <ReactJSON key={example || ''} json={JSON.parse(example)} />;
  }

  return (
    <HighlightWrapper key={example || ''} language="sql">
      {sqlFormatter.format(example || '')}
    </HighlightWrapper>
  );
};
