export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/addresses',
    '/car-definitions',
    '/fleet',
    '/fleet/loans',
    '/guests/blacklisted',
    '/guests/whitelisted',
    '/trip',
    '/trip/current',
    '/trip/upcoming',
    '/trip/past',
    '/whats-new',
  ]
}