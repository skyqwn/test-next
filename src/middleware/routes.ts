export const publicUrls: Record<string, boolean> = {
  "/login": true,
};

export function isPublicRoute(pathname: string): boolean {
  return !!publicUrls[pathname];
}
