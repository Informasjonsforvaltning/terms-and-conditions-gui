import styled from 'styled-components';

import LinkBase from '../anchor';
import Common from '../common/styled';

import FooterIllustrationSVG from '../../images/fdk-footer-illustration.svg';

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 200px;
  margin-top: 80px;
  padding: 50px 0;
  background: ${({ theme }) => theme.fdk.colors.neutrals.darker};
`;

const Illustration = styled(FooterIllustrationSVG)`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  transform: rotate(180deg);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled(Common.Container)`
  display: flex;
  justify-content: space-between;
  color: white;
  z-index: 2;

  & > ${Column}:first-of-type {
    flex-basis: 50%;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 8px;
    font-size: 100%;
  }

  &:nth-of-type(n + 2) {
    margin-top: 15px;
  }
`;

const Link = styled(LinkBase)`
  color: white;
  border-bottom: 1px solid white;

  & svg > path {
    fill: white;
  }

  &:nth-of-type(n + 2) {
    margin-top: 15px;
  }
`;

export default { Footer, Illustration, Content, Column, LinkWrapper, Link };
