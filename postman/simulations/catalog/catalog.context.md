# DramasticDecor catalog simulation

Created 2026-10-26 from the official Google Sheets values.get and Drive files.get contracts. No owner-supplied mock was available; no Postman cloud resources were created.

## Purpose

Run the actual catalog parser, Google HTTP client and Drive photo publisher against local Google stand-ins. Request shapes and sample responses live in `postman/mocks/google/default.js`.

## Execution

1. `postman simulation run postman/simulations/catalog/catalog.sim.yaml --port 4991 --no-history --output ndjson`
2. Take the `/google` address from the listening event.
3. `SIMULATION_URL=http://localhost:4991/google npm test`
4. Verify Sheets reads, Drive metadata and media downloads appear in the simulation request log. Stop with Ctrl-C.

## Assumptions

- Google authentication and Blob uploads are not exercised. The test supplies a fake access token and an in-memory image store. Live credentials, Google access grants and Vercel Blob permissions still need verification before launch. (observed 2026-10-26)

## Observations

<!-- begin:observations -->
2026-10-26: the Google member served Sheets reads, Drive metadata and one media download. A second catalog load reused the stored image. A Sheets 503 was surfaced; a photo from the wrong folder was rejected.
<!-- end:observations -->

## What didn't work

- 2026-10-26: CLI required `version: 1` and scenario `path` in the mock manifest. Corrected in `config.yaml` before the successful run.
