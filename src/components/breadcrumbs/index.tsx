import React, { memo, FC } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import SC from './styled';

interface Breadcrumb {
  url?: string;
  title?: string;
  current?: boolean;
  external?: boolean;
}

interface Props extends RouteComponentProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => (
  <SC.Breadcrumbs
    separator={<NavigateNextIcon fontSize='small' />}
    aria-label='breadcrumb'
  >
    {breadcrumbs.map(
      ({
        url = location.href,
        title = '',
        current = false,
        external = false
      }) => {
        if (current) {
          return <span key={`${url}-${title}-${current}`}>{title}</span>;
        }

        return external ? (
          <a href={url} key={`${url}-${title}-${current}`}>
            {title}
          </a>
        ) : (
          <Link to={url} key={`${url}-${title}-${current}`}>
            {title}
          </Link>
        );
      }
    )}
  </SC.Breadcrumbs>
);

export default memo(withRouter(Breadcrumbs));
