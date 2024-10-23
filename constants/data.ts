import { NavItem } from '@/types';
import { useTranslations } from 'next-intl';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Employee',
    url: '/dashboard/employee',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen'
      },
      {
        title: 'Login',
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    isActive: false,
    items: [] // No child items
  }
];

export const adminNavItems = (t: (key: string) => string): NavItem[] => [
  {
    title: t('dashboard'),
    url: '/admin',
    icon: 'dashboard',
    label: t('dashboard'),
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: t('employee'),
    url: '/admin/employee',
    icon: 'user',
    label: t('employee'),
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: t('product'),
    url: '/admin/package',
    icon: 'product',
    label: t('product'),
    isActive: true
  }
];

export const customerNavItems = (t: (key: string) => string): NavItem[] => [
  {
    title: t('dashboard'),
    url: '/customer',
    icon: 'dashboard',
    label: t('dashboard')
  },
  {
    title: t('package.title'),
    url: 'gift',
    icon: 'gift',
    isActive: false,
    items: [
      {
        title: t('package.subItems.created'),
        url: '/customer/package/created',
        icon: 'money'
      },
      {
        title: t('package.subItems.inwarehouse'),
        url: '/customer/package/inwarehouse',
        icon: 'money'
      }
    ]
  },
  {
    title: t('parcel.title'),
    url: 'package',
    icon: 'package',
    isActive: false,
    items: [
      {
        title: t('parcel.subItems.created'),
        url: '/customer/parcel/created',
        icon: 'money'
      },
      {
        title: t('parcel.subItems.intransit'),
        url: '/customer/parcel/intransit',
        icon: 'money'
      },
      {
        title: t('parcel.subItems.arrived'),
        url: '/customer/parcel/arrived',
        icon: 'money'
      },
      {
        title: t('parcel.subItems.delivered'),
        url: '/customer/parcel/delivered',
        icon: 'money'
      }
    ]
  },
  {
    title: t('address.title'),
    url: 'mapPin',
    icon: 'mapPin',
    isActive: false,
    items: [
      {
        title: t('address.subItems.foreignaddress'),
        url: '/customer/address/foreignaddress',
        icon: 'globus'
      },
      {
        title: t('address.subItems.customeraddress'),
        url: '/customer/address/customeraddress',
        icon: 'school'
      }
    ]
  },
  {
    title: t('payments.title'),
    url: 'wallet',
    icon: 'wallet',
    isActive: false,
    items: [
      {
        title: t('payments.subItems.deliverypayments'),
        url: '/customer/deliverypayments',
        icon: 'money'
      },
      {
        title: t('payments.subItems.ransompayments'),
        url: '/customer/ransompayments',
        icon: 'money'
      }
    ]
  }
];
