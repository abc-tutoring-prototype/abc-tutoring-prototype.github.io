# ABC Tutoring

A static prototype website for ABC Tutoring: browse tutors, book an open time slot, and see the booking reflected immediately. Built with PostHog analytics to track tutor views and bookings.

Live site: https://abc-tutoring-prototype.github.io/

## What's here

- `index.html`, `style.css`, `app.js` — the site. Plain HTML/CSS/JS, no build step. Booking state is kept in the browser's `localStorage`.
- `simulate_traffic.py` — seeds PostHog with synthetic visitor traffic (pageviews, tutor views, bookings) so the analytics dashboard has data to show. Run with `python3 simulate_traffic.py`.
- `presentation/` — the customer-facing presentation (`dana-presentation.pdf`) summarizing requirements and the prototype for Dana, plus its source (`slides.html`) and screenshots.

## Analytics

The site sends `$pageview`, `tutor_viewed`, and `tutor_booked` events to PostHog. Dashboard: see the presentation for the shared link.

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.
