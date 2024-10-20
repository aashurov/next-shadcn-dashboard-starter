import OverViewPage from './_components/overview';
import { auth } from '@/auth';

export const metadata = {
  title: 'Dashboard : Управление'
};

export default function page() {
  return <OverViewPage />;
}
