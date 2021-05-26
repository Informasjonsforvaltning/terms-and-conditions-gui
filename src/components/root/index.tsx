import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import SC from './styled';

interface Props {}

const Root: FC<Props> = ({ children, ...props }) => (
  <>
    <Helmet>
      <title>Felles datakatalog | Vilkår og betingelser</title>
      <meta
        name='description'
        content='Vilkår og betingelser for Felles datakatalog.'
      />
    </Helmet>
    <SC.Root {...props}>{children}</SC.Root>
  </>
);

export default compose<FC>(memo)(Root);
