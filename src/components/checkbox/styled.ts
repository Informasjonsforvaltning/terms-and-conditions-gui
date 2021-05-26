import styled, { css } from 'styled-components';
import CheckIcon from '@material-ui/icons/CheckOutlined';

const Checkbox = styled.div``;

const Label = styled.label`
  display: flex;
  align-items: flex-start;
`;

const Tick = styled(CheckIcon)<{ checked?: boolean; disabled?: boolean }>`
  height: 20px !important;
  width: 20px !important;
  margin-right: 10px;
  border: 2px solid ${({ theme }) => theme.fdk.colors.neutrals.darker};
  border-radius: 3px;
  background: white;
  cursor: pointer;

  & > path {
    color: white;
  }

  ${({ checked }) =>
    checked &&
    css`
      background: ${({ theme }) => theme.fdk.colors.neutrals.darker};

      & > path {
        color: white;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background: #d2d3d6;
      border-color: #d2d3d6;
    `}
`;

const Input = styled.input`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
  cursor: pointer;
`;

export default { Checkbox, Label, Tick, Input };
