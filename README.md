# Freelance Job Marketplace

A full-stack marketplace frontend built with React and Vite.

## Features

- Login and registration pages with client and freelancer roles
- Dashboard after login showing user role and quick job information
- Client job posting UI with title, description, and budget fields
- Job listing page with all active jobs
- Freelancer application flow via "Apply" buttons
- Auth persistence using `localStorage`
- API integration layer in `src/api.js`
- React Router navigation for separate pages
- Error handling for login/register and job actions

## Mock Backend

This frontend includes a local mock API implementation, so no backend server is required.

- Auth and job data are stored in browser `localStorage`
- Register and login work with email/password
- Jobs can be created and viewed locally
- Freelancer applications are mocked with a success response

## Scripts

- `npm install` — install dependencies
- `npm run dev` — start local development server
- `npm run build` — build production assets
- `npm run preview` — preview the production build

## Notes

If your backend uses JWT or a different auth response shape, update `src/api.js` accordingly.
