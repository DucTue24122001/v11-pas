import type { Metadata } from "next";
import "./globals.css";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'react-calendar/dist/Calendar.css';
import { CookiesProvider } from "next-client-cookies/server";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";
import { Loading } from "@/components/utils/Loading";
import Main from "@/configs/Main";

export const metadata: Metadata = {
  title: 'Exploring Cockfight, Mimi Gaming Slots, JiLi Fishing, and Sexy Baccarat',
  description: `In the world of online entertainment, there is an abundance of options to choose from. Whether you're a fan of thrilling cockfights, exciting slot games, underwater adventures, or sophisticated baccarat, there's something for everyone. In this comprehensive guide, we will delve into the exciting realms of Cockfight, Mimi Gaming Slots, JiLi Fishing, and Sexy Baccarat`,
  openGraph: {
    type: "website",
    title: "Exploring Cockfight, Mimi Gaming Slots, JiLi Fishing, and Sexy Baccarat",
    description: "In the world of online entertainment, there is an abundance of options to choose from. Whether you're a fan of thrilling cockfights, exciting slot games, underwater adventures, or sophisticated baccarat, there's something for everyone. In this comprehensive guide, we will delve into the exciting realms of Cockfight, Mimi Gaming Slots, JiLi Fishing, and Sexy Baccarat",
    siteName: "v11-pas",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <head>
        <meta data-n-head="5" data-hid="theme-color" name="theme-color" content={"#151515"}/>
      </head>
      <body>
        <CookiesProvider>
          <NextIntlClientProvider messages={messages} >
            <Suspense fallback={<Loading/>}>
              <Main>
                {children}
              </Main>
            </Suspense>
          </NextIntlClientProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
