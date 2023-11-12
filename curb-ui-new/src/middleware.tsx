export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/car-definitions',
    '/fleet',
    '/whats-new',
  ]
}