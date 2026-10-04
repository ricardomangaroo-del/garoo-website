# Changelog — website

Chronological log of every feature/fix request made on this project, so a new chat session isn't
blind to what a previous one already did. Read this before making claims about what's done, or before
acting on a request that sounds like something already handled.

Each line: `[OPEN]` / `[DONE]` / `[BLOCKED]` / `[WON'T DO]` — dated, with a one-line summary and
file refs once resolved. This is separate from and complementary to the studio-wide `STATUS.md` (owned
by `studio-secretary`) and this project's own `GAMEPLAN.md`/`PROJECT.md` (architecture record) —
neither of those is a fast "what did the user ask for, is it done" scan.

Started 2026-08-26. History before this date lives in this project's GAMEPLAN.md/PROJECT.md and in
workspace STATUS.md — not backfilled here.

---
- [DONE] 2026-09-23: Pushed the corrected mini-games-privacy.html (drafted by privacy-counsel in pathline/privacy.html) to production — fixed two false statements ("no real-money purchases"/"no network connections of any kind") now that Garoo Arcade ships real-money IAP via Google Play Billing/StoreKit. Preserved the site's own header/nav/footer chrome rather than overwriting with pathline's plain standalone version. Committed (48262e5) and pushed to origin/main; auto-deployed via the linked Vercel/GitHub integration; live at https://garoointeractive.com/mini-games-privacy.html, verified by direct fetch post-deploy (date + new section confirmed present).
- [DONE, deployed] 2026-10-04: "Update the website with all the latest data." Source of truth = STATUS.md. (1) Matter MazeBall is now on the Apple App Store (iTunes releaseDate 2026-09-30, https://apps.apple.com/us/app/matter-mazeball/id6812585829, store-lookup verified 2026-10-01): hero/featured badges, meta/OG/Twitter copy and GAMES data now say Steam, Google Play & App Store; added an App Store button (text button, no Apple badge asset downloaded); featured releaseDate -> 2026-09-30. (2) New #garoo-arcade section for Garoo Arcade (Google Play, Production vc17, console-verified 2026-10-02; com.garoo.pathline) with icon + two store screenshots (assets/arcade-*), nav link, footer link to mini-games-privacy.html. Deliberately NOT claimed: ads/"no ads", prices, IAP (vc18 ads/Remove Ads is not live), Mac App Store, iOS 1.0.1, Tether/Tickwork (not live). Verified in preview at 375x812, no console errors, no horizontal overflow. Deployed at founder request ("deploy"): commit dac4fd8 pushed to origin/main, auto-deployed via Vercel/GitHub; verified live at https://garoointeractive.com (garoo-arcade section present, assets/arcade-icon.png 200). The same commit also carried the previously uncommitted mini-games-privacy.html (already live from CLI deploys 2026-10-02/03).
