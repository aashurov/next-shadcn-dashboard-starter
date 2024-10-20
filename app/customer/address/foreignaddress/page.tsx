import { SearchParams } from 'nuqs/parsers';
import AddressViewPage from '@/app/customer/address/_components/address-view-page';
import { auth } from '@/auth';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Profile'
};

export default async function Page({ searchParams }: pageProps) {
  const session = await auth();

  return <AddressViewPage session={session} />;
}
