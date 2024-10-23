'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// // This allows to add custom title as well
// const routeMapping: Record<string, BreadcrumbItem[]> = {
//   '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
//   '/dashboard/employee': [
//     { title: 'Dashboard', link: '/dashboard' },
//     { title: 'Employee', link: '/dashboard/employee' }
//   ],
//   '/dashboard/product': [
//     { title: 'Dashboard', link: '/dashboard' },
//     { title: 'Product', link: '/dashboard/product' }
//   ]
//   // Add more custom mappings as needed
// };

const routeMapping = (
  t: (key: string) => string
): Record<string, BreadcrumbItem[]> => ({
  '/dashboard': [{ title: t('dashboardTitle'), link: '/dashboard' }],
  '/dashboard/employee': [
    { title: t('dashboardTitle'), link: '/dashboard' },
    { title: t('employeeTitle'), link: '/dashboard/employee' }
  ],
  '/dashboard/product': [
    { title: t('dashboardTitle'), link: '/dashboard' },
    { title: t('productTitle'), link: '/dashboard/product' }
  ]
  // Add more custom mappings as needed
});

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Check if we have a custom mapping for this exact path
    if (routeMapping[pathname as keyof typeof routeMapping]) {
      return routeMapping[pathname as keyof typeof routeMapping];
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
