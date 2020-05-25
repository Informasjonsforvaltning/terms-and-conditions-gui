import React, { memo, FC, PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';

import SC from './styled';

const Root: FC<PropsWithChildren<any>> = ({ children, ...props }) => (
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

export default memo(Root);
