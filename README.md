# The Living Portfolio

A custom editorial portfolio built with React 19, TypeScript, Vinext (Next.js App Router APIs), CSS, Cloudflare D1, and R2. Sites supplies hosted ChatGPT authentication.

## Routes
- `/`: hero, swipe/drag deck, searchable Atlas, collections, profile, capabilities, contact.
- `/work/[slug]`: published case studies, image gallery, aspect-ratio-aware video, sharing, next project.
- `/collections/[slug]`: filtered collection with search, category filters and ordering.
- `/admin/login`, `/admin`, `/admin/projects`, `/admin/collections`, `/admin/profile`, `/admin/settings`: owner-only creator studio.
- `/api/content`, `/api/upload`: authorized, origin-checked writes.
- `/media/[key]`: stored media; unpublished media requires owner authorization.

## Production configuration
The registered Site is private. Sharing was not changed. Publishing a private Site does not make it accessible to prospective clients.

1. Sign in at the hosted `/admin` route. It displays your verified Site-specific identity when editing is not configured.
2. Set runtime secret `ADMIN_USER_ID` to that identity with Sites runtime environment tools. Never put it in public client code. Re-deploy if required by the hosting control plane.
3. D1 binding `DB` and R2 binding `BUCKET` are declared in `.openai/hosting.json`; Sites provisions them and applies committed schema migrations during publication.
4. In the creator studio replace demo work, configure a real creator name, bio, profile photo, email, and any social destinations. Leave unused channels blank. Save changes.
5. Keep the demo label enabled until all sample claims and projects are replaced. The project examples are original compositions, not client commissions or performance claims.
6. Verify uploads, persistent edits, and video playback with your real media. Uploaded media supports JPG, PNG, WebP, MP4, WebM, 25 MB maximum. Direct HTTPS media URLs are also supported.

Contact currently uses a clearly labeled `mailto:` draft fallback. It does not send or store contact messages. No email delivery provider or recipient was supplied. A server-delivered contact form and spam prevention would require a configured provider and endpoint.

## Local development
Requires Node 22.13+ and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm exec drizzle-kit generate # only after changing the schema
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_minor_kid_colt.sql
pnpm dev
```
Apply each migration once per local database. The server normally listens at http://127.0.0.1:5173. Local and production databases are separate.

The starter's development-only sign-in uses `local_seedy`; to exercise the local editor, set `ADMIN_USER_ID=local_seedy` in ignored `.dev.vars` and restart dev. Never use this value for production. Hosted authentication remains managed by Sites.

On this Windows runtime the bundled pnpm CMD shim has an invalid relative path. Run pnpm's `bin/pnpm.cjs` with Node or set `SITES_PNPM_BIN` to that verified file for Sites build helpers.

## Publication
Preserve the registered project ID in `.openai/hosting.json`. Use the Sites skill's source workflow helper to commit/push the exact source and package its `dist` output, then save and deploy to the existing private Site. Do not create a second Site. Reuse immutable committed migrations.

## Security and behavior
- Authorization compares the authenticated Site user ID with a server-only allowlist value for every protected API request. It fails closed when unconfigured.
- Writes require same-origin requests, schema validation, unique slugs, valid collection references, and optimistic revision checks to prevent lost updates.
- Public queries include published projects only. Draft media requires owner access.
- User content renders as React text, not injected HTML. Media URLs allow HTTPS or managed media paths. Uploads reject unsupported types and oversized files.
- Preference persistence uses localStorage only; portfolio content uses D1, media uses R2.
- The deck clamps drag bounds, snaps home or advances, offers arrows and keyboard controls, and has Reset Layout. Focus mode exposes every filtered project without dragging.
- Reduced-motion CSS disables transforms and transitions. Native video controls remain available alongside custom controls. Videos pause when offscreen.

## Verification observed
- Production build succeeded before final polish; final build result is recorded in BUILD-REPORT.md.
- TypeScript `--noEmit` passed.
- Local D1 migration applied successfully.
- HTTP checks: homepage, six project routes, three collection routes, admin gate and share image returned 200; unknown project returned 404; unauthorized content API returned 403.
- Browser checks: Play/Focus switching, next-project navigation, search, empty state, category filtering, case-study navigation, collection contents, copy-link success, and contact-unconfigured state.

## Remaining limitations
- Production owner access, real uploads, and persistent editing require ADMIN_USER_ID configuration and were not verified with the owner's hosted identity.
- No real creator photo, client assets, email, phone or social handles were supplied.
- Video controls are implemented, but playback is not verified without a supplied video file. No fictional video success is claimed.
- Browser QA used the available in-app viewport. Physical iOS/Android devices, all requested viewport sizes, Lighthouse, slow-network simulation and reduced-motion emulation were not available for verification.
- Shared-element transitions, free-placement physics, a pointer cursor effect, and automated server-side contact delivery are not implemented. The gallery intentionally uses bounded drag and snap behavior.
- Uploaded files not referenced by published content remain owner-only; removing projects does not automatically delete stored files.
