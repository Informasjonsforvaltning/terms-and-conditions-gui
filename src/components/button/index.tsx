import React, {
  memo,
  FC,
  PropsWithChildren,
  ButtonHTMLAttributes,
  ComponentType
} from 'react';

import SC from './styled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'anchor' | 'default';
  icon?: ComponentType;
}

const Button: FC<PropsWithChildren<Props>> = ({
  variant,
  icon: Icon,
  onClick,
  type,
  children,
  ...rest
}) => (
  <SC.Button
    type={type ?? 'button'}
    variant={variant}
    onClick={onClick}
    {...rest}
  >
    {Icon && <Icon />}
    {children}
  </SC.Button>
);

export default memo(Button);
