/**
 * An array of routes that are public
 * These routes are accessible to everyone
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are protected
 * These routes are only accessible to authenticated users
 * @type {string[]}
 */
export const authRouters = ["/signin", "/signup", "/error"];

/**
 * The prefix for the API routes
 * Routers that start with this prefix are considered API routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect route after a user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
