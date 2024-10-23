import OverViewPage from './_components/overview';
import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { auth } from '@/auth';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'Titles' });

  return {
    title: t('OverViewPageTitle'),
    description: t('OverViewPageDescription')
  };
}

export default async function page() {
  const session = await auth();

  const user = {
    fullName: session?.user?.fullName ?? 'Unknown User'
  };

  return <OverViewPage user={user} />;
}
