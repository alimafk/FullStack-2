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

<img width="1919" height="907" alt="Screenshot 2026-04-28 161849" src="https://github.com/user-attachments/assets/792ac68a-c8dc-43ec-abd7-8184283d0767" />
<img width="1919" height="913" alt="Screenshot 2026-04-28 161907" src="https://github.com/user-attachments/assets/471b11ae-15ed-4a0e-98a3-1a89b3e4a024" />
<img width="1600" height="900" alt="WhatsApp Image 2026-04-28 at 4 23 46 PM" src="https://github.com/user-attachments/assets/fa22fbdd-8e6e-4ea8-ba0a-75619359141e" />
<img width="1600" height="916" alt="WhatsApp Image 2026-04-28 at 4 23 47 PM" src="https://github.com/user-attachments/assets/af11c9b6-5783-4f1d-82db-2db50ecfe566" />

