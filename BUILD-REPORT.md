# Build and verification report

Verified on 2026-10-23 (Asia/Jakarta).

- React/Vinext production build: PASS (all seven route families generated).
- TypeScript noEmit: PASS.
- D1 schema generation and local migration: PASS.
- Homepage, six case studies, three collection routes, admin gate, social preview PNG: HTTP 200.
- Unknown case study: HTTP 404.
- Unauthorized content API: HTTP 403.
- In-app browser: deck next navigation, Play/Focus preference across routes, search match, empty search, clearing filters, category filtering, case-study route, collection content, copy-link confirmation, contact configuration notice, admin access gate: verified.
- Visual inspection: in-app viewport, dark editorial layout and project deck. Small-phone and full-desktop emulation were not available through the connected browser surface.

Not verified: hosted owner login, persistent admin CRUD, R2 uploads, real video playback, native OS share sheet, physical mobile browsers, Lighthouse, automated contact delivery, and slow-network/reduced-motion emulation. The source implements these integrations where applicable; setup and limitations are documented in README.md. Contact uses an email-draft fallback, not server delivery.
