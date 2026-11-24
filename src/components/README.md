# Component organization

- `ui/` contains reusable interface building blocks such as buttons, fields, dialogs, cards, and chart primitives. Import these from `@/components/ui`.
- `layout/` contains navigation chrome that belongs to a specific portal. Import it from `@/components/layout`.
- `admin-institusi/`, `super-admin/`, and `landing-page/` contain composed, domain-specific widgets. Import them from their domain barrel, for example `@/components/super-admin`.
- `auth/` contains components shared by authentication routes. Import from `@/components/auth`.
- `pages/` should compose domain widgets and shared UI. Keep page-specific markup there only when it is genuinely unique; when a control repeats, extend `ui/` and reuse it instead of copying its markup and styles.
- `layouts/` compose whole route shells. They are separate from `components/layout/`, which contains the navigation pieces inside those shells.

Use the `@/` source alias for imports. Add new exports to the nearest `index.js` barrel so page files do not need to know the internal folder layout.
