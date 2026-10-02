# Armchair Draft Board — setup

One file, no build step, no dependencies. It reads your league's scoring live from Sleeper,
so **if you change a scoring setting, just reload the page and every number moves with it.**

---

## Option A — just open the file (30 seconds, no GitHub)

Double-click `index.html`. It works.

Sleeper's API sends `Access-Control-Allow-Origin: *`, so the page can fetch live data even
straight off your hard drive. Nothing to install, nothing to publish.

**Use this if** you'll draft from your laptop.
**Don't use this if** you want the board on your phone, or on a second screen — that's Option B.

---

## Option B — GitHub Pages (10 minutes, works on your phone)

This is all done in the browser. No git, no command line, no terminal.

> **Use your personal GitHub account.** Nothing here touches TELUS infrastructure — the page
> only talks to `api.sleeper.app`.

### 1. Create the repository

1. Sign in to your personal account at [github.com](https://github.com).
2. Top-right **+** → **New repository**.
3. **Repository name:** `draft-board`
4. Leave it **Public**. *(GitHub Pages needs public on a free plan. See the privacy note below —
   there are no secrets in this file.)*
5. Do **not** tick "Add a README".
6. Click **Create repository**.

### 2. Upload the file

1. On the empty repo page, click **uploading an existing file**.
2. Drag `index.html` into the box.
3. Click **Commit changes**.

The filename must stay exactly `index.html` — that's what GitHub serves as the homepage.

### 3. Turn on Pages

1. In your repo, click **Settings** (top bar, gear icon).
2. Left sidebar → **Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. **Branch:** `main`, folder `/ (root)`. Click **Save**.
5. Wait 60–90 seconds, then reload the Settings → Pages screen.

Your URL appears at the top:

```
https://<your-username>.github.io/draft-board/
```

### 4. Check it actually works

Open the URL. You should see, within a few seconds:

- The header reading **Armchair Quarterbacks · 12 teams · 14 rds · you pick 4**
- A green **live** pill in the top-right
- Jahmyr Gibbs and Bijan Robinson at the top of the board

If the header says *"Could not load"*, see Troubleshooting below.

### 5. Put it on your phone

Open the URL in your phone browser and add it to your home screen
(iOS: Share → Add to Home Screen. Android: ⋮ → Add to Home screen).
Do this **before** draft night, not during it.

---

## Updating it later

Go to the repo → click `index.html` → the pencil icon → paste the new version → **Commit changes**.
Live in about a minute. Hard-refresh the page (Ctrl+Shift+R / Cmd+Shift+R) to bypass cache.

You do **not** need to re-upload anything when you change your league's scoring settings —
the page reads those live from Sleeper on every load.

---

## Put it on your home screen (do this first)

On the iPhone, open the URL in Safari (not Chrome — only Safari can install to the home screen on
iOS), then **Share → Add to Home Screen**. It launches full-screen with no browser chrome, its own
icon, and respects the Dynamic Island and home indicator. That's the difference between a website
and something that feels like an app at pick 45.

Chrome works fine for normal use — you just don't get the home-screen install.

## The four tabs

| Tab | What's there |
|---|---|
| **🎯 Pick** | The recommendation, your shortlist of six, your roster, manual entry. This is the draft-night tab. |
| **📋 Board** | Full ranked board, search, position filters. |
| **🔭 Ahead** | Who picks before you and what they historically want, positional squeeze, scoring divergence. |
| **🏆 Teams** | Live power rankings of all 12 teams, your scoring settings, method notes. |

The Pick tab shows a red dot when you're on the clock.

## On the clock

When it's your turn the header turns green, the chip reads **YOU**, and a banner appears with a
countdown that turns amber under 10 seconds. You also get a "you pick next" warning one pick out.

The countdown is best-effort: it's derived from Sleeper's `last_picked` timestamp, which is
undocumented, so anything implausible is ignored rather than shown as a wrong number. Treat the
Sleeper app as the authority on time remaining.

Tap the **🔔** in the header to enable a sound alert when you're on the clock. iOS requires a tap
before any page can play audio, which is what that button is for — it beeps once to confirm. The
tab has to be in the foreground for it to fire.

## Draft power rankings

The Teams tab ranks all 12 rosters by the projected points of their **best legal starting lineup**
under your scoring, and tells you where you sit. Empty slots score nothing, so early on this
rewards whoever has filled more of them. When teams hold different numbers of picks mid-round it
says so — it's only a clean comparison at the end of a round.

## Using it on draft night

- **Auto-sync is on by default.** It polls your draft every 4 seconds and strikes players off
  as they're taken. You don't have to tell it anything.
- **The column to draft on is `Edge`**, not `Proj` or `VORP`. Edge = this player's value above
  replacement, minus the value you'd expect from the best player at his position still on the
  board at your next pick, weighted by the lineup slots you still need. It answers *"what do I
  lose by waiting?"* rather than *"who is best?"*
- **`If I pass`** is the chance he survives to your next pick. Below ~35% and you need the
  position, take him now.
- **Squeeze** above ~0.7 means more teams need that position than there are real starters left —
  expect a run, and get ahead of it.
- The Recommendation panel gives you a **ranked shortlist of six**, each with a one-line reason,
  its Edge, and its survival chance. Your pick timer is 30 seconds — the list is ordered so the top
  line is enough if you're out of time.
- If the top pick is at a position you've already filled, it says so and **names the best player who
  fills a slot you're actually missing** — so you can override the value call knowingly rather than
  being argued with. When you're genuinely short on picks, it promotes the hole-filler outright.
- **Ahead** shows exactly who picks in the gap, what each of them historically does at that point in
  a draft, and the position they're most likely to take.

## Plan B — manual entry when Sleeper is struggling

Draft night is Sleeper's heaviest traffic of the year.

**There is no mode to switch between, and nothing to remember.** Manual entry is *additive* — it
does not turn auto-sync off, and auto-sync does not overwrite what you type. Both sources feed the
same board:

- Whichever source is **further ahead supplies the ordering**.
- The other one can only ever **add** drafted players, never remove them.

So a lagging or partial API response can never resurrect a player who's actually gone. If Sleeper
stalls, just start typing. When it catches up, it silently takes over again. You can leave
auto-sync on the whole time.

The `live` pill always tells you which source the board is on: `live · 34 picks`,
`manual · 37 picks (+34 live)`, or `api lagging ×3 · 34 picks`.

Click **Manual entry**. Then:

- It **seeds itself from the last successful API sync** — if you're 40 picks in you don't retype
  anything, you carry on from 41.
- Type a surname and press **Enter** to log the highest-value match, or click a suggestion button.
- Picks log **in draft order**, so the tool still knows whose pick each was. Opponent roster
  tracking, positional squeeze and the manager look-ahead all keep working.
- The panel header names whose pick you're entering next — your running check against drifting
  out of sync.
- **Undo last** fixes a mistake. **Clear all** starts over.

## Reload is safe

**Reload data does not lose your typed picks.** They live in this browser's storage, keyed to this
specific draft, and are restored automatically — the button asks for confirmation and says so. Refresh
the page, close the tab, or crash your laptop and the log survives.

The page also keeps a **local copy of the projections and rankings** after every successful load. If
you reload mid-draft and Sleeper is down, the board comes up anyway on that saved copy, with an amber
banner telling you how old it is and the manual entry panel already open. Rankings don't change during
a draft, so a saved copy is just as valid — you only lose live pick feeds, which is exactly what manual
entry is for. Auto-sync keeps retrying in the background and takes over the moment it succeeds.

This is why it's worth **opening the page once while Sleeper is healthy** before draft night: that's
what populates the cache. With no cache and Sleeper down, there's nothing to fall back on.

Worth rehearsing once: open manual entry, type two names, undo them, hit reload, confirm they come back.

## Why it waits on running backs

This looks wrong and isn't. It was tested properly: 60 simulated drafts per strategy from your slot,
opponents picking on ADP plus noise, each resulting roster scored on its best legal starting lineup.

| Strategy | vs the tool |
|---|---|
| Tool's Edge logic | — |
| Force RB with your first 2 picks | **−21 pts** |
| Force RB with your first 3 picks | **−85 pts** |
| Just follow ADP | **−79 pts** |

RB-early stayed behind even when RB injury attrition was cranked from 9% all the way to 50%. Three
reasons it's correct in *your* league specifically:

1. **Only 2 RB slots and a single flex** — and in full PPR that flex mostly wants a WR. Your league
   needs 2-3 RBs per team, not 3-4.
2. **Your own scoring change tilted it further.** Turning on `rec_40p` and the receiving TD tiers
   moved receivers +8.3-8.5% and running backs much less.
3. **The RB pool is deep in the middle.** 19 RBs sit above 60 VORP and the curve from RB6 to RB24 is
   nearly flat, so the RB you get in round 9 is close to the one you'd have reached for in round 5.
   The elite RBs are genuinely scarce — which is why Gibbs and Bijan are 1 and 2 on the board — but
   RB3 through RB20 are not.

**Your instinct that something was off was right, though — just inverted.** The tool wasn't skipping
RBs early, it was over-drafting RB *depth* late: rostering about 5 running backs to start 2 or 3,
which crowded out better picks. Two fixes came out of the simulation and are now in:

- Bench value **decays** with depth (each extra body worth 55% of the last), so a 5th RB stops
  out-bidding a genuine upgrade.
- Positions where you need **two** starters are weighted up, because a one-pick lookahead treats each
  pick in isolation and under-values them.

Together: **+14 points** over 60 paired drafts, winning 46 of 60. With no RBs rostered the board now
surfaces them properly — Breece Hall and D'Andre Swift move into the top 3.

## The manager model

The tool reads your league's **7 previous drafts — 2019 through 2025, 1,148 picks**. Eleven of your
twelve managers have four or more years of history; seven have all eight seasons.

What it found, and what it deliberately ignores:

| Position | Repeatability | Verdict |
|---|---|---|
| K | 0.55 | Strong personal habit — Wilty averages round 9.1, Fabone11 round 14.0 |
| QB | 0.34 | Real — Wilty round 3.1, jacksoul round 8.9 |
| TE | 0.28 | Real — Wilty round 3.7, jacksoul round 11.0 |
| DEF | 0.20 | Weak but present |
| WR | 0.14 | Not a personal trait — ignored |
| RB | 0.04 | Not a personal trait — ignored |

So the model adjusts for QB, TE, K and DEF timing, and refuses to for RB and WR — everyone takes
those early and there's no read to be had. Each manager's average is shrunk toward the league mean
in proportion to how repeatable the habit is, because seven observations per manager is a thin
sample. Treat it as a nudge to the market price, not a crystal ball.

---

## Troubleshooting

**"Could not load" / HTTP 404 on `projections`**
Sleeper's projections endpoint is undocumented and can change without notice. If it 404s before
draft night, tell me and I'll repoint it. The board is useless without it, so check the page at
least a day early.

**Blank page or stale data**
Hard-refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac). GitHub Pages caches aggressively.

**Header loads but no picks appear during the draft**
Confirm the draft actually started in Sleeper. Before it starts, the pill reads
`live · pre-draft`, which is correct and expected.

**"you pick 4" is wrong**
Your draft slot comes from Sleeper's `draft_order`. If your commissioner reshuffles the order,
reload the page and it'll pick up the change.

---

## Privacy note

The repo is public, which means anyone with the URL can see `index.html` and the league ID
inside it. That league ID is read-only and already exposed by Sleeper's public API — it grants
no ability to modify your league, and there are no tokens, passwords, or personal data in the
file. What a curious visitor could learn is that your league exists and what its scoring is.

If you'd rather not publish anything at all, use Option A.

---

## Configuration

At the top of the `<script>` block:

```js
const CFG = {
  leagueId: '1385660484409106432',   // Armchair Quarterbacks, 2026
  username: 'LegionOf12',            // used to work out which draft slot is yours
  season:   '2026',
  pollMs:   4000,                    // draft poll interval, ms
};
```

To reuse this next season, change `leagueId` and `season`. Everything else — scoring, roster
slots, team count, round count, your draft position — is read from Sleeper automatically.

One thing that would need refreshing for a new season: the inlined `PRIORS` block, which holds
per-player 2025 sack rates and explosive-play rates. Ask me and I'll regenerate it.
