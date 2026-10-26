# DramasticDecor

One-page bedsheet showcase built with Next.js App Router, TypeScript, Tailwind CSS and shadcn/ui. Products come from Google Sheets; Google Drive photos are copied to Vercel Blob and displayed with Next.js Image. Inquiries open WhatsApp with the selected product and bed size.

## Local development

Use Node.js 22 or newer. Install dependencies with `npm install`, then run `npm run dev`. The preview is at http://127.0.0.1:4173/.

`.env.local` contains blank connection settings and is ignored by Git. `.env.example` documents the same variables. The local default is `CATALOG_MODE=demo`, with clearly labeled sample designs. Set `CATALOG_MODE=sheets` to read your real catalog. The app creates no Google Sheet, Drive folder, or Blob store.

## Connection setup

When ready to connect your own resources:

1. Create a Google Sheet with a tab named `Products`. Import `docs/catalog-template.csv`, or use its exact headings.
2. Turn `Show on website`, `Single`, `Queen` and `King` into Google Sheets checkboxes. Add dropdowns for Fabric and Theme. Freeze row 1. Copy a complete row when adding a product so its controls remain available.
3. Create a dedicated Google Drive folder for product photos. Upload JPG, PNG or WebP images, at most 10 MB each, directly into that folder. Paste each file's normal Drive sharing link into `Photo link`. Images in subfolders or Drive shortcuts are not supported.
4. Create a Google Cloud service account with Google Sheets API and Google Drive API enabled. Share the Sheet and photo folder with its email as **Viewer**. Public sheet sharing is optional with this server-side setup. Neither public edit access nor publicly sharing the photo folder is required.
5. Fill `GOOGLE_SHEET_URL`, `GOOGLE_SHEET_TAB`, `GOOGLE_DRIVE_FOLDER_URL`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` in `.env.local`. The private key may contain literal `\n` sequences inside a quoted value.
6. Create a **public** Vercel Blob store and set its `BLOB_READ_WRITE_TOKEN`. Keep the token and Google key server-side; never use a `NEXT_PUBLIC_` prefix.
7. Replace `WHATSAPP_NUMBER` with your full business number, digits including country code. Set `SITE_URL` to the production origin and keep `INSTAGRAM_HANDLE` as the username only.
8. Set `CATALOG_MODE=sheets` and restart local development. For production, set the same environment variables in Vercel.

## Owner updates

One row is one product. Tick the available sizes and `Show on website`. Use one of these themes: `Florals`, `Botanicals`, `Geometrics`, `Solids`, `Other`. Fabric is free text, so a dropdown is optional. Leave the price blank for “Price on request”; enter a number in rupees to show a price. A missing photo displays a placeholder without hiding the product.

Upload a photo to the dedicated folder, copy its Drive file link and paste it into the row. Do not paste a folder link. Updating the same Drive file creates a fresh versioned website copy. Deleting or moving a Drive photo removes it from future syncs; previous public Blob copies are retained. Removing old copies requires a separate, deliberate cleanup.

Keep the column headings. Columns and product rows may be reordered. The catalog supports up to 1000 product rows. Incomplete or invalid visible rows are skipped with a server-log message. Hidden rows are not rendered, but they are still readable by anyone with access to the Sheet; never put customer information or secrets there.

## Refresh and failure behavior

The server caches the catalog for five minutes. After that, a website visit triggers background refresh; the first visitor can still see the previous version, so refresh again after the update finishes. It is not an instant push or a scheduled sync, and editing the Sheet does not require redeployment. The cache may continue serving the last successful catalog if Google is temporarily unavailable. On a cold-cache connection failure, the website shows an unavailable message with a WhatsApp link, never fake live products.

New/changed images are synced with four concurrent workers. File type, file size, actual image bytes and membership in the configured folder are checked before upload. Unchanged Blob images are reused. Large initial catalogs may need longer function timeouts than the configured 60 seconds; begin with a small batch and verify your Vercel plan's execution limits before increasing them.

## Vercel deployment

Import this repository into Vercel and select the Next.js framework preset. Leave the output directory at its default and use Node.js 22 or newer. Add the environment variables above with `CATALOG_MODE=sheets`. Do not upload `.env.local` to Git. Vercel detects the build command from the package scripts.

No production build, lint run, commit or deployment was performed as part of this migration, following the project rules. Request a commit when ready for build/lint verification.

## Testing & Verification

- `npm test`: catalog validation, checkbox visibility, column reordering, price parsing, filtering, WhatsApp links, URL validation, photo validation and synchronization behavior.
- `npm run typecheck`: TypeScript verification without a production build.
- Google integration test: start `postman simulation run postman/simulations/catalog/catalog.sim.yaml --port 4991 --no-history --output ndjson`, then run `SIMULATION_URL=http://localhost:4991/google npm test`.
- The integration uses real HTTP calls to local Google stand-ins and an in-memory image-store adapter. It does not authenticate with Google or upload to Vercel Blob. Actual credentials, live permissions, the Blob SDK and production caching must be verified before launch.
- Lint runs only when a commit is requested. Scope any lint fixes to touched files. If an unrelated pre-push hook fails, ask before bypassing it.

## Code layout

- `src/app`: page, layout, error boundary and responsive styles.
- `src/components`: catalog, image presentation, WhatsApp icon and shadcn button.
- `src/lib/catalog.ts`: pure catalog parsing, filtering and inquiry links.
- `src/lib/config.ts`: environment and Google URL validation.
- `src/lib/google-api.ts`: Google Sheets and Drive HTTP client.
- `src/lib/photos.ts` and `src/lib/sync-catalog.ts`: image validation and synchronization through a storage interface.
- `src/lib/server`: server-only Google credentials, Vercel Blob adapter and catalog cache.

## API contracts

The local Google stand-in follows the read-only operations used by the app:

- [Google Sheets values.get](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get)
- [Google Drive files.get](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get)
- [Vercel Blob SDK](https://vercel.com/docs/vercel-blob/using-blob-sdk)

The generated bedroom photo and sample swatches are illustrative. Replace them as real stock photography becomes available.
