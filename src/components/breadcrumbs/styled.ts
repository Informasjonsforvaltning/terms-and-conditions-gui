import styled from 'styled-components';
import { Breadcrumbs as BreadcrumbsBase } from '@material-ui/core';

const Breadcrumbs = styled(BreadcrumbsBase)`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto !important;
  margin-bottom: 40px !important;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lighter};
  font-size: 16px;

  & a {
    border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
    color: ${({ theme }) => theme.fdk.colors.text.default};

    &:hover {
      text-decoration: none;
    }
  }

  & li:last-of-type {
    flex: 1 1 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default { Breadcrumbs };
