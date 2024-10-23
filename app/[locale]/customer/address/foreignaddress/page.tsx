import { SearchParams } from 'nuqs/parsers';
import AddressViewPage from '@/app/[locale]/customer/address/_components/address-view-page';
import { auth } from '@/auth';
import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

type pageProps = {
  searchParams: SearchParams;
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'Titles' });

  return {
    title: t('AddressViewPageTitle'),
    description: t('AddressViewPageDescription')
  };
}

export default async function Page({ searchParams }: pageProps) {
  const session = await auth();

  return <AddressViewPage session={session} />;
}
