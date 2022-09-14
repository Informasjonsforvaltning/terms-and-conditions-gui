import React, { memo, FC } from 'react';
import { compose } from 'redux';
import HeaderBase from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';
import { ThemeProfile } from '@fellesdatakatalog/theme';

import env from '../../env';

import { withAuth } from '../../providers/auth';
import { authService } from '../../services/auth/auth-service';

const {
  ADMIN_GUI_HOST,
  FDK_REGISTRATION_BASE_URI,
  SEARCH_HOST,
  SKE_THEME_PROFILE
} = env;

const Header = () => {
  const signOut = () => authService.logout();

  const isSkatteetatenThemeProfile =
    authService
      .getResourceRoles()
      .some(({ resourceId }) =>
        SKE_THEME_PROFILE?.split(',').includes(resourceId)
      ) || !!localStorage.getItem('skeProfile');

  const themeProfile = isSkatteetatenThemeProfile
    ? ThemeProfile.SKE
    : ThemeProfile.FDK;

  return (
    <HeaderBase
      homeUrl={FDK_REGISTRATION_BASE_URI}
      themeProfile={themeProfile}
      username={authService.getUser()?.name}
      onLogout={signOut}
      skeHomeText='Bruksvilkår'
    >
      <Link href={`${SEARCH_HOST}/guidance`}>Registrere data</Link>
      <Link href={ADMIN_GUI_HOST}>Høste data</Link>
      <Link href={SEARCH_HOST} external>
        Søk i Felles datakatalog
      </Link>
    </HeaderBase>
  );
};

export default compose<FC>(memo, withAuth)(Header);
