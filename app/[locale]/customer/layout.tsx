import AppSidebar from '@/components/layout/app-sidebar';
import type { Metadata } from 'next';
import { customerNavItems } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic admin with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar navItems={customerNavItems}>{children}</AppSidebar>
    </>
  );
}
