import {
  Home as HomeIcon,
  Shop as ShopIcon,
  Group as GroupIcon,
  Web as WebIcon,
  Category as CategoryIcon,
  // Announcement as AnnouncementIcon,
  Settings as SettingsIcon,
  AccountBox as AccountBoxIcon
} from '@material-ui/icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Route<T extends string | number | symbol = any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: string;
  path: `/${string}`;
  permission?: string;
  internalPaths?: Record<T, Route>;
  icon?: any;
}
type Routes = Record<string, Route>;
type RoutesOutput<T extends Routes> = Record<
  keyof T,
  Route<keyof T[keyof T]['internalPaths']>
  >;

/**
 * @param routesInput - Routes.
 * @returns Routes.
 */
export function createRoutes<T extends Routes>(
  routesInput: T,
): RoutesOutput<T> {
  return routesInput;
}

export const ROUTES = createRoutes({
  HOME: {
    text: 'Inicio',
    path: '/',
  },
  PRODUCTS:{
    text: 'Productos',
    path: '/products',
    internalPaths:{
      DETAILS:{
        text: 'Details',
        path: '/product',
      },
    }
  },
  ORDERS:{
    text: 'Pedidos',
    path: '/orders',
  },
  ABOUT_US:{
    text: 'Nosotros',
    path: '/about-us',
  }
});

export const SETTINGS_ROUTES = createRoutes({
  SYSTEM:{
    text: 'System',
    path: '/admin/settings',
    icon: SettingsIcon,
  },
  PROFILE:{
    text: 'Profile',
    path: '/admin/settings/profile',
    icon: AccountBoxIcon,
  },
});

export const ADMINISTRATOR_ROUTES = createRoutes({
  DASHBOARD:{
    text: 'Dashboard',
    path: '/admin/dashboard',
    icon: HomeIcon
  },
  USERS:{
    text: 'Users',
    path: '/admin/users',
    icon: GroupIcon
  },
  PRODUCTS:{
    text: 'Products',
    path: '/admin/products',
    icon: ShopIcon
  },
  CATEGORIES:{
    text: 'Categories',
    path: '/admin/categories',
    icon: CategoryIcon
  },
  SETTINGS:{
    text: 'Settings',
    path: '/admin/settings',
    icon: SettingsIcon,
  },
  WEBSITE:{
    text: 'Website',
    path: '/',
    icon: WebIcon
  }
});

