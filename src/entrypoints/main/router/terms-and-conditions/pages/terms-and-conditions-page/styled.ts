import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import AlertBase from '@fellesdatakatalog/alert';

const Breadcrumbs = styled.nav`
  margin-top: -${theme.spacing('S16')};
  margin-bottom: ${theme.spacing('S16')};
  padding: ${theme.spacing('S10')} 0;
  border-bottom: 1px solid ${theme.colour(Colour.NEUTRAL, 'N30')};
`;

const Page = styled.div`
  width: 100%;
  max-width: 1140px;
  flex-grow: 1;
  margin-top: 40px;
  margin: 0 auto;
  overflow-wrap: break-word;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const TermsAndConditions = styled.section`
  & h2 {
    margin-top: 40px;
    font-size: 24px;
    font-weight: bold;
  }

  & p {
    margin-top: 20px;

    & a {
      border-bottom: 1px solid ${({ theme: t }) => t.fdk.colors.text.default};
      color: ${({ theme: t }) => t.fdk.colors.text.default};

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const Agreement = styled.div`
  margin-top: 40px;
  user-select: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin: ${theme.spacing('S24')} 0;

  & > *:nth-of-type(n + 2) {
    margin-left: 8px;
  }
`;

const Alert = styled(AlertBase)`
  margin-top: 40px;
`;

export default {
  Breadcrumbs,
  Page,
  Title,
  TermsAndConditions,
  Agreement,
  ButtonGroup,
  Alert
};
