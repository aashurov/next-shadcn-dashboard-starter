import AppSidebar from '@/components/layout/app-sidebar';
import type { Metadata } from 'next';
import { useSession } from 'next-auth/react';
import { adminNavItems, customerNavItems } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic admin with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // const { data: session } = useSession();
  // const userRole = session?.user?.role;
  // const navItems = userRole === 'admin' ? adminNavItems : customerNavItems;

  return (
    <>
      {/*<AppSidebar>{children}</AppSidebar>*/}
      <AppSidebar navItems={adminNavItems}>{children}</AppSidebar>
    </>
  );
}
