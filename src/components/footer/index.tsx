import React, { memo, FC } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import TwitterIcon from '@material-ui/icons/Twitter';

import SC from './styled';

const Footer: FC = () => (
  <SC.Footer>
    <SC.Illustration />
    <SC.Content>
      <SC.Column>
        Digitaliseringsdirektoratet forvalter Felles datakatalog.
      </SC.Column>
      <SC.Column>
        <SC.Link href='https://www.digdir.no/om-oss/personvernerklaering/706'>
          Personvernerklæring
        </SC.Link>
        <SC.Link href='https://www.digdir.no/om-oss/informasjonskapsler/707'>
          Informasjonskapsler
        </SC.Link>
      </SC.Column>
      <SC.Column>
        <SC.LinkWrapper>
          <EmailIcon />
          <SC.Link href='mailto:fellesdatakatalog@digdir.no'>
            fellesdatakatalog@digdir.no
          </SC.Link>
        </SC.LinkWrapper>
        <SC.LinkWrapper>
          <TwitterIcon />
          <SC.Link
            href='https://twitter.com/datakatalogen?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Eprofile%3Adatakatalogen&ref_url=https%3A%2F%2Ffellesdatakatalog.digdir.no%2F'
            external
          >
            Felles datakatalog på Twitter
          </SC.Link>
        </SC.LinkWrapper>
      </SC.Column>
    </SC.Content>
  </SC.Footer>
);

export default memo(Footer);
