import SignInViewPage from '../_components/sigin-view';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'Titles' });

  return {
    title: t('SignInViewPageTitle'),
    description: t('SignInViewPageDescription')
  };
}

export default function Page() {
  return <SignInViewPage />;
}
