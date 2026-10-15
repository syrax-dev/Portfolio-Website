# SYRAX — Nayan Patel Portfolio

A minimal, editorial, black-and-purple developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, and React Router. All professional content (skills, experience, education, certifications, project links) is sourced from the attached resume.

## Contact form

The contact form validates required fields, email format, and input lengths before sending messages through Web3Forms. To enable delivery to `syraxdev69@gmail.com`:

1. Generate a Web3Forms access key for `syraxdev69@gmail.com` at [web3forms.com](https://web3forms.com/).
2. Set `VITE_WEB3FORMS_ACCESS_KEY` in a local `.env` file (see `.env.example`) and in your hosting provider's environment variables.
3. Rebuild and redeploy the site so Vite includes the configured key.

Web3Forms access keys are used by the browser form submission, so configure the key's domain restrictions and spam protection in Web3Forms before deploying publicly.
