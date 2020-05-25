import React, {
  memo,
  FC,
  ComponentPropsWithoutRef,
  PropsWithChildren
} from 'react';

import SC from './styled';

interface Props extends ComponentPropsWithoutRef<'input'> {}

const Checkbox: FC<PropsWithChildren<Props>> = ({
  id,
  name,
  checked,
  disabled,
  onChange,
  children,
  ...props
}) => (
  <SC.Checkbox {...props}>
    <SC.Label htmlFor={id ?? name}>
      <SC.Tick checked={checked} disabled={disabled} />
      <SC.Input
        id={id ?? name}
        type='checkbox'
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span>{children}</span>
    </SC.Label>
  </SC.Checkbox>
);

export default memo(Checkbox);
