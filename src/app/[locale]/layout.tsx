import type { ReactNode } from 'react';
import Loading from '@/app/[locale]/loading';
import { routing } from '@/i18n/i18nNavigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Script from 'next/script';
// import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import '@/styles/globals.css';
import { SubscriptionProvider } from '@/contexts/subscription-context';
// import Footer from '@/components/Footer';
// import NotificationSnackbar from '@/components/notification';
import { Inter, Tajawal } from 'next/font/google';
import dynamic from 'next/dynamic';
import WharsappBtn from '@/components/WharsappBtn';
const Navbar = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));
const NotificationSnackbar = dynamic(() => import("@/components/notification"));

// const inter = Inter({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: '400',
  display: 'swap',

});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? tajawal.className : inter.className;
  // const dispalyFooterAndHeader=
  return (
    <html lang={locale} dir={direction} >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-PKW20FH917"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PKW20FH917');
</script>
      </head>
      <body className={fontClass}>
        <NextIntlClientProvider messages={messages}>
        <SubscriptionProvider>
          <Navbar/>
          <NotificationSnackbar/>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
          <WharsappBtn/>
          </SubscriptionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
