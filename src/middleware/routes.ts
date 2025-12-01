export const publicUrls: Record<string, boolean> = {
  "/login": true,
  "/shoot": true,
  "/server-grid-test": true
};

export function isPublicRoute(pathname: string): boolean {
  return !!publicUrls[pathname];
}
