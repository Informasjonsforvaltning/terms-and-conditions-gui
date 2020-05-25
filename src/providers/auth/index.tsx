import React, { FC, PropsWithChildren, memo, useState, useEffect } from 'react';

import service from '../../services/auth';

import Context from './context';

const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [isInitialised, setIsInitialised] = useState(false);

  const init = async () => {
    try {
      await service.init(true);
      setIsInitialised(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return isInitialised ? (
    <Context.Provider value={{ service }}>{children}</Context.Provider>
  ) : (
    <></>
  );
};

export default memo(AuthProvider);
export { withAuth, ServiceProps as Props } from './hook';
