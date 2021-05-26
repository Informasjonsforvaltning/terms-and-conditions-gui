import React, { memo, FC, ComponentPropsWithoutRef } from 'react';
import { compose } from 'redux';

import SC from './styled';

interface ExternalProps extends ComponentPropsWithoutRef<'input'> {}

interface Props extends ExternalProps {}

const Checkbox: FC<Props> = ({
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

export default compose<FC<ExternalProps>>(memo)(Checkbox);
