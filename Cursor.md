# Cursor Rules - LandmarketThai

## Development Server Rules

NEVER start a new development server if one is already running.

Before running:

* bun run dev
* npm run dev
* next dev

Always check for an existing server first.

Reuse the existing localhost server whenever possible.

Do not create additional localhost ports.

Do not start localhost:3001, 3002, 3003, etc. unless explicitly requested.

If testing is required:

* Use the currently running server.
* Ask before creating a new dev server.

## Scope Control

Focus only on the requested task.

Do not refactor unrelated files.

Do not modify backend logic unless explicitly requested.

Do not introduce new libraries or dependencies unless necessary.

## LandmarketThai Content Rules

Thai-first UI.

Do not introduce English user-facing copy unless explicitly requested.

Do not invent property data.

Use only verified property information.

## Property Pages

109 Rai and 37 Rai pages must maintain consistent structure:

* Hero
* Property Facts
* Highlights
* Gallery
* CTA

Do not create different layouts for similar property types.

## Placeholder Rules

Do not use:

* Lorem Ipsum
* Fake testimonials
* Fake payout claims
* Fake statistics
* Fake contact information

Only use real project data.

## Contact Rules

LINE OA is primary.

Phone is secondary.

Do not display inactive email addresses.

## Build Rules

Before completing a task:

* Run lint
* Run build

Report any warnings separately from errors.

## Git Safety

Do not delete files unless explicitly requested.

Do not rename routes without approval.

Do not change navigation structure without approval.
