import { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

export default css`
  html,
  body {
    height: 100%;
  }

  body {
    overflow-x: hidden;
    overflow-y: scroll;
    background: ${theme.colour(Colour.NEUTRAL, 'N10')};
    line-height: 1.5;
  }

  body,
  #root {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  body.no-scroll {
    overflow: hidden;
  }

  * {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }
`;
