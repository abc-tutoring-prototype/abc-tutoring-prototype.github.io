"""Seeds PostHog with synthetic traffic so the dashboard has data to show Dana.
Run with: python3 simulate_traffic.py
"""
import json
import random
import time
import urllib.request
from datetime import datetime, timedelta, timezone

POSTHOG_TOKEN = "phc_DhMSHdW6rv7a6dptjbasFzQRtL4eP6hxBMga5wmD6kxk"
POSTHOG_HOST = "https://us.i.posthog.com"

TUTOR_NAMES = {
    "t1": "Maria Chen",
    "t2": "James Okafor",
    "t3": "Priya Patel",
    "t4": "Sam Torres",
    "t5": "Lena Kowalski",
}
TUTOR_IDS = list(TUTOR_NAMES.keys())


def capture(event, distinct_id, properties=None, timestamp=None):
    body = {
        "api_key": POSTHOG_TOKEN,
        "event": event,
        "distinct_id": distinct_id,
        "properties": {"$current_url": "https://abc-tutoring-prototype.github.io/", **(properties or {})},
    }
    if timestamp:
        body["timestamp"] = timestamp
    req = urllib.request.Request(
        f"{POSTHOG_HOST}/capture/",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
    except Exception as e:
        print(f"Failed to send {event}: {e}")


def simulate_visitor(i):
    distinct_id = f"sim-visitor-{i}"
    days_ago = random.randint(0, 6)
    ts = (datetime.now(timezone.utc) - timedelta(days=days_ago, seconds=random.randint(0, 20000))).isoformat()

    capture("$pageview", distinct_id, {}, ts)

    viewed_tutors = set()
    for _ in range(random.randint(1, 3)):
        tutor_id = random.choice(TUTOR_IDS)
        viewed_tutors.add(tutor_id)
        capture("tutor_viewed", distinct_id, {"tutor_id": tutor_id, "tutor_name": TUTOR_NAMES[tutor_id]}, ts)

    # ~35% of visitors who viewed a tutor go on to book
    if viewed_tutors and random.random() < 0.35:
        tutor_id = random.choice(list(viewed_tutors))
        capture(
            "tutor_booked",
            distinct_id,
            {"tutor_id": tutor_id, "tutor_name": TUTOR_NAMES[tutor_id], "subject": "Math", "slot": "Mon 4:00 PM"},
            ts,
        )


def main():
    num_visitors = 40
    print(f"Simulating {num_visitors} visitors...")
    for i in range(num_visitors):
        simulate_visitor(i)
        time.sleep(0.05)
    print("Done. Check PostHog Activity/Events explorer for incoming data.")


if __name__ == "__main__":
    main()
