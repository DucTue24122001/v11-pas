"use client";
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import GlobalSwrConfig from './providers/GlobalSwrProvider';
import { TenancyProvider } from './providers/TenancyProvider';
import { ViewportProvider } from './providers/ViewportProvider';
import Navbar from '@/components/layouts/Navbar';
import baseTheme from './chakra-ui/base-theme';
import LanguageModal from '@/components/layouts/LanguageModal';
import CheckTokenProvider from './providers/CheckTokenProvider';
import SideMenu from '@/components/layouts/SideMenu';
import RouterListener from '@/constants/hooks/RouterListener';
import Footer from '@/components/layouts/Footer';
import LoginAndRegisterModal from '@/components/layouts/navbar/LoginAndRegisterModal';
import ForgotPwModal from '@/components/layouts/navbar/ForgotPwModal';

type TMain = {
  children: React.ReactNode;
}

const Main = ({children}: TMain) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={baseTheme}>
        <ViewportProvider>
          <GlobalSwrConfig>
            <TenancyProvider>
              <CheckTokenProvider>
                <SideMenu/>
                <Navbar/>
                {children}
                <Footer />
                <LoginAndRegisterModal />
                <ForgotPwModal/>
                <LanguageModal/>
                <RouterListener/>
              </CheckTokenProvider>
            </TenancyProvider>
          </GlobalSwrConfig>
        </ViewportProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default Main