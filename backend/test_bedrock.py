"""
test_bedrock.py — THE MOST IMPORTANT PREP SCRIPT for Person 1.

The doc says: "Pre-run demo photos through Bedrock 20+ times before integration.
Know the exact scores. No surprises at demo time." This script does exactly that.

Put your product photos in a folder (e.g. ./demo_photos/speaker/) and run:

    python test_bedrock.py demo_photos/speaker

It calls Bedrock 20 times on the same photos and prints every grade so you can
see how consistent the model is. If it sometimes says "Like New" and sometimes
"Good", you'll know BEFORE the demo — and can either pick clearer photos or
hardcode the grade for safety.
"""

import os
import sys
import collections

import bedrock_client

RUNS = 20


def load_photos(folder):
    photos = []
    for fname in sorted(os.listdir(folder)):
        if fname.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif")):
            with open(os.path.join(folder, fname), "rb") as f:
                photos.append((fname, f.read()))
    return photos[:3]  # use up to 3 photos


def main():
    if len(sys.argv) < 2:
        print("Usage: python test_bedrock.py <folder-with-photos>")
        print("Example: python test_bedrock.py demo_photos/speaker")
        return

    folder = sys.argv[1]
    photos = load_photos(folder)
    if not photos:
        print(f"No images found in {folder}")
        return

    print(f"Using {len(photos)} photo(s): {[p[0] for p in photos]}")
    print(f"Calling Bedrock {RUNS} times...\n")

    grades = collections.Counter()
    for i in range(1, RUNS + 1):
        try:
            result = bedrock_client.analyze_with_bedrock(photos)
            grade = result["condition_grade"]
            conf = result["confidence_score"]
            grades[grade] += 1
            print(f"  Run {i:>2}: {grade:<12} (confidence {conf:.2f})")
        except Exception as e:
            print(f"  Run {i:>2}: ERROR — {e}")

    print("\n--- Summary ---")
    for grade, count in grades.most_common():
        print(f"  {grade}: {count}/{RUNS} times")

    if len(grades) == 1:
        print("\n  Stable result — safe to use the live call in the demo.")
    elif grades:
        print("\n  Result varies. Recommendation: use clearer photos, OR hardcode")
        print("  the most common grade in app.py for a guaranteed-stable demo.")


if __name__ == "__main__":
    main()
