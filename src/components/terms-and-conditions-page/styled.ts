import styled from 'styled-components';

import Common from '../common/styled';
import BannerBase from '../banner';

const Container = styled(Common.Container)`
  flex-grow: 1;
  margin-top: 40px;
  margin: 0 auto;
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
      border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
      color: ${({ theme }) => theme.fdk.colors.text.default};

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
  margin-top: 20px;

  & > *:nth-of-type(n + 2) {
    margin-left: 8px;
  }
`;

const Banner = styled(BannerBase)`
  margin-top: 40px;
`;

export default {
  Container,
  Title,
  TermsAndConditions,
  Agreement,
  ButtonGroup,
  Banner
};
