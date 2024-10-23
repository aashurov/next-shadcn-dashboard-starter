import AppSidebar from '@/components/layout/app-sidebar';
import { customerNavItems } from '@/constants/data';
import { useTranslations } from 'next-intl';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('NavItems');
  return (
    <>
      <AppSidebar navItems={customerNavItems(t)}>{children}</AppSidebar>
    </>
  );
}
