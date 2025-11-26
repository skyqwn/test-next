export const publicUrls: Record<string, boolean> = {
  "/auth/login": true,
  "/shoot": true,
};

export function isPublicRoute(pathname: string): boolean {
  return !!publicUrls[pathname];
}
