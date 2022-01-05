import { useRouter } from 'next/router';
import { ADMINISTRATOR_ROUTES } from './routes-utils';

/**
 * @returns String with the route Title.
 */
export function useRouteTitle(): string {
  const router = useRouter();
  const route = Object.values(ADMINISTRATOR_ROUTES).find(
    (item) => item.path === router.pathname,
  );

  return route?.text ?? '';
}
