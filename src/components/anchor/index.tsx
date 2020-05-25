import React, { memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

import IconExternal from '../../images/icon-external-link-xs.svg';

interface Props {
  href: string;
  external?: boolean;
}

const Anchor: FC<PropsWithChildren<Props>> = ({
  href,
  external = false,
  children,
  ...props
}) => (
  <SC.Anchor target={external ? '_blank' : undefined} href={href} {...props}>
    {children}
    {external && <IconExternal />}
  </SC.Anchor>
);

export default memo(Anchor);
