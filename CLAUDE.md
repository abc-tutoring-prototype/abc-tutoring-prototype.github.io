# Pre-Assessment: PostHog prototype for Dana / ABC Tutoring

You are completing the pre-assessment task of the "Upskilling Together" program. A separate orchestrator session (a different Claude Code instance, working in a sibling `engine` repo) has already done all the account setup and record-keeping. Your job is to actually finish and submit the assessment, using this repo as your workspace.

## Read this first — the engine repo has everything

**`/home/user/upskilling/engine/` is the single source of truth for this whole program.** Do not re-derive, re-guess, or ask the user for anything that's already answered there. Before doing anything else, read:

- `/home/user/upskilling/engine/.env` — every credential you'll need: PostHog account + project token, the GitHub org/repo, the portal login, and the customer chat token/URL.
- `/home/user/upskilling/engine/data/tasks/pre-assessment/task.md` — the full task text verbatim (background, all 4 steps, guidelines, submission items), the transcribed PostHog/GitHub setup instructions, and a dated log of every decision made so far.
- `/home/user/upskilling/engine/data/account.md` — current status of every account involved.
- `/home/user/upskilling/engine/skill/web/site-map.md` — how the portal and its linked Google Doc behave, if you need to revisit either (includes a gotcha about the Google Doc being canvas-rendered).
- `/home/user/upskilling/engine/skill/git/README.md` — the git-identity rule in use across this whole program (repo-local, never `--global`) — this repo already follows it.

If you learn something worth keeping for future tasks (a PostHog quirk, a GitHub Pages gotcha), that knowledge belongs back in the engine repo, not just in your own head — see "Report back," the last step below.

## This repo
This is the working copy for the assessment's main deliverable. Git remote `origin` is already set to:
```
https://github.com/abc-tutoring-prototype/abc-tutoring-prototype.github.io.git
```
(public repo — GitHub Pages on a free org plan requires it). Git identity is already set locally to the `scrubs-sojourn-96` account — don't touch global git config.

## The task, in short
You're representing PostHog. Dana runs "ABC Tutoring" and wants a website where visitors can browse tutors and book them, with bookings reflected on the site. Learn what she needs via a chat, build a working static prototype with PostHog analytics, present your findings to her in slides, then submit. Full verbatim text is in the engine repo's task file linked above — read it before starting, especially the **Guidelines** and **Submission items** sections.

**Deadline: 2026-09-06.** This is due tomorrow (relative to when the engine repo prepared this handoff).

## Hard constraints for this run
These are decisions made by the user for this specific attempt — they aren't written anywhere else, so treat them as binding even though the portal itself allows more room:

- **Customer chat: 20 messages maximum, aim for meaningfully fewer.** The portal's own limit is 50 turns — ignore that number, it's not the real budget.
- **Interview strategy: front-load, don't interview gradually.** Dana is a scripted/simulated AI customer, not a person who needs to be eased into a conversation. Open with one comprehensive, direct message asking her to lay out everything relevant in one go — what she wants the site to look like, the booking flow, and what she wants to understand about her visitors. Only send a follow-up if something specific and necessary is still missing afterward. Don't spend turns on pleasantries, confirmations, or incremental small talk — get the requirements and move on.
- Don't reuse turns re-asking things already answered in the task text or the setup docs (e.g., don't ask Dana what PostHog is).

## Step-by-step plan

1. **Read** the engine repo files listed above. Confirm the customer chat token/URL still works (it was opened once by the orchestrator without sending a message, sitting at "0 of 50 turns used").
2. **Chat with Dana** at the URL in `.env` (`PRE_ASSESSMENT_CHAT_URL`), following the hard constraints above. Extract what you need for the prototype: pages/layout, the booking flow and how it should update, and what analytics she cares about (this drives your PostHog dashboard later). Stop once you have it — don't pad the conversation.
3. **Build the prototype** in this repo:
   - Static HTML/CSS/JS (GitHub Pages serves static files only). Cover: browsing tutors, booking one, and the booking being reflected on the site (client-side state via `localStorage` is explicitly allowed).
   - Add the PostHog JS snippet using `POSTHOG_PROJECT_TOKEN` / `POSTHOG_API_HOST` from the engine repo's `.env`.
   - Consider a small script to simulate user traffic (page views, a few booking events) so there's real data to show Dana in the dashboard — the assessment explicitly encourages this.
   - Commit and push to `origin main`. After pushing, verify the site actually renders at `https://abc-tutoring-prototype.github.io/` (Pages needs a minute after a push) — the assessment explicitly calls out verifying this before submitting.
4. **Set up a PostHog dashboard** surfacing the metrics Dana said she cared about. Dashboard → Share → enable public access → copy the link.
5. **Write the presentation**: 3–5 slides, PDF, written for Dana — a non-technical audience. Explain her needs and how the prototype addresses them; she should be able to follow it without you in the room. Any tool is fine (if no slide software is available, a simple script-generated PDF works). Keep a copy in this repo (e.g. `presentation/dana-presentation.pdf`) for the record.
6. **Submit** via the Google Form: `https://forms.gle/6t4cjQJLXskM5c95A` (also in the engine task file). It wants: this repo's name/URL, the presentation PDF (upload), and the PostHog public dashboard link. This is an external form, separate from the portal — filling it out **is** the submission. Confirm the final content with the user before sending, since it's a one-way external action.
7. **Report back to the orchestrator** — this is not optional, it's how the program's records stay accurate:
   - Update `/home/user/upskilling/engine/data/tasks/pre-assessment/task.md`: fill in `## Submission` with what was submitted (repo URL, presentation location, dashboard link) and `## Feedback` if anything comes back, set `status: submitted` and `submitted_date`.
   - Append a line to `/home/user/upskilling/engine/logs/activity.md` describing what happened.
   - Check off the relevant lines in `/home/user/upskilling/engine/todo.md`.
   - Commit and push the **engine repo** (it's a separate git repository from this one, at `/home/user/upskilling/engine` — don't confuse the two histories).

## Notes
- This assessment must be completed using the assigned AI agent (Claude Code) per the program's rules — that's you, so this is satisfied by construction; don't route the actual work through anything else.
- Pushing real prototype content to `origin` makes it publicly visible (it's a public repo) — treat the first real push, and the form submission, as the two points in this task worth a quick confirmation with the user if anything about the content feels uncertain.
- Don't modify the engine repo's structure or credentials beyond the "report back" step — it's the orchestrator's system of record, not part of this task's workspace.
