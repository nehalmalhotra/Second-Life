{
  "_version": "v2",
  "_source": "Based on final demo flow document. All product names, prices, and buyer data match products.json, users.json, hubs.json, and api_contract_v4.json. v2 aligns the call order with the agreed flow: /match-buyers and /notify fire AFTER Screen 3 (driver verification), not after Screen 2 confirmation.",
  "_corrections_from_source_doc": [
    "Baby monitor → boAt Aavante Bar 490 Bluetooth Speaker (P009, Rs 1499, hub H001). No baby monitor exists in products.json.",
    "Price shown to Ashish → Rs 1229 (Like New 18% discount off Rs 1499). Source doc said Rs 2800 which matched no product.",
    "Match reason → 'Electronics on your wishlist' (Ashish's wishlist contains 'Electronics', not a specific product name).",
    "Notification banner text updated to Bluetooth speaker at Rs 1229.",
    "Screen 5 match reason corrected to: 'Electronics on your wishlist · available near you · within your price range'."
  ],
  "characters": {
    "rahul": {
      "role": "Seller — voluntary listing (Entry Point B)",
      "product_id": "P009",
      "product_name": "boAt Aavante Bar 490 Bluetooth Speaker",
      "original_price_inr": 1499,
      "discounted_price_inr": 1229,
      "discount_percent": 18,
      "condition": "Like New",
      "hub_id": "H001",
      "hub_name": "Amazon Fulfillment Center — Bhiwandi",
      "return_reason": null,
      "entry_point": "B",
      "note": "Rahul owns the speaker and no longer needs it. He is NOT returning it — he is voluntarily listing it via 'Give it a Second Life'. return_reason is null throughout."
    },
    "priya": {
      "role": "Returner — return flow (Entry Point A)",
      "product_id": "P001",
      "product_name": "Cello H2O Unbreakable Water Bottle 1L",
      "original_price_inr": 349,
      "discounted_price_inr": 244,
      "discount_percent": 30,
      "condition": "Good",
      "hub_id": "H003",
      "hub_name": "Amazon Delivery Station — Andheri",
      "return_reason": "Wrong Size",
      "entry_point": "A",
      "note": "Priya bought the wrong size. She returns it within the return window. The bottle grades 'Good' (raw ~73 + 10 for the 'Wrong Size' return reason = 83) and lists at Rs 244."
    },
    "ashish": {
      "role": "Buyer — receives notification and purchases",
      "user_id": "U001",
      "name": "Ashish Verma",
      "location": "Koramangala, Bengaluru",
      "hub_id": "H001",
      "wishlist": [
        "Baby Products",
        "Toys & Games",
        "Electronics"
      ],
      "price_range_max_inr": 3000,
      "match_score": 100,
      "match_reason": "Electronics on your wishlist · available near you · within your price range",
      "note": "Perfect 100-point match for P009: Electronics in wishlist (+40), same hub H001 (+35), Rs 1229 within Rs 3000 limit (+25)."
    }
  },
  "screens": [
    {
      "screen_id": 1,
      "title": "Rahul's Order History",
      "owner": "Person 2",
      "estimated_build_hours": 1,
      "complexity": "low",
      "purpose": "Grounds the demo in something real. Judges immediately understand the entry point without explanation.",
      "entry_point": "B",
      "api_calls": [],
      "what_to_show": [
        "Rahul's order history list",
        "boAt Aavante Bar 490 Bluetooth Speaker card — purchased 8 months ago",
        "'Give it a Second Life' button on the speaker listing",
        "Tapping the button navigates to Screen 2"
      ],
      "what_NOT_to_show": [
        "Any mention of 'return' — Rahul is not returning the product, he is voluntarily listing it",
        "Return window or refund language"
      ],
      "presenter_notes": "Keep it brief. Show the order history, point at the speaker, tap the button. One sentence: 'Rahul bought this speaker 8 months ago and no longer needs it. He's going to give it a second life.' Move to Screen 2.",
      "static_or_dynamic": "static"
    },
    {
      "screen_id": 2,
      "title": "Photo Upload + AI Grading",
      "owner": "Person 2",
      "estimated_build_hours": 3,
      "complexity": "high",
      "purpose": "The technical centerpiece. The only real Bedrock Vision API call in the demo. Shows AI condition grading working live.",
      "entry_point": "B",
      "api_calls": [
        {
          "endpoint": "POST /analyze-product",
          "called_by": "Person 1 (Bedrock Vision)",
          "rendered_by": "Person 2",
          "mock_key": "analyze_product_p009_rahul_voluntary",
          "key_response_fields": {
            "product_id": "P009",
            "score": 88,
            "condition": "Like New",
            "confidence": 94,
            "routing": "second_life",
            "ai_description": "The speaker body is in pristine condition with no scratches or marks. Original packaging and all accessories are intact."
          }
        },
        {
          "endpoint": "POST /generate-listing",
          "called_by": "Person 1",
          "rendered_by": "Person 2",
          "mock_key": "listing_p009_rahul_voluntary",
          "key_response_fields": {
            "listing_title": "boAt Aavante Bar 490 Bluetooth Speaker — Like New",
            "condition_badge": "Like New",
            "original_price": 1499,
            "discount_percent": 18,
            "discounted_price": 1229,
            "estimated_delivery": "Same Day",
            "entry_point": "B"
          }
        }
      ],
      "what_to_show": [
        "3 photo upload slots for the Bluetooth speaker",
        "Loading animation: 'Amazon AI is verifying your product...'",
        "Result: condition badge 'Like New'",
        "AI description: 'The speaker body is in pristine condition with no scratches or marks. Original packaging and all accessories are intact.'",
        "Original price: Rs 1,499",
        "Suggested price: Rs 1,229 (18% off — Like New discount)",
        "Confirm / List button",
        "On confirmation: the speaker is listed and the flow moves to Screen 3 (driver verification). Matching does NOT run yet."
      ],
      "presenter_notes": "This is the moment to slow down. Let the loading animation play. When the result appears, read the AI description out loud. Point at the price calculation — 'The AI has graded this Like New and suggested Rs 1,229. Rahul confirms.' Tap confirm and move immediately to Screen 3.",
      "static_or_dynamic": "dynamic — real Bedrock call"
    },
    {
      "screen_id": 3,
      "title": "Driver Verification",
      "owner": "Person 2",
      "estimated_build_hours": 2,
      "complexity": "medium",
      "purpose": "Shows two-point fraud prevention — the trust mechanism no other team is building. The differentiating screen of the demo.",
      "entry_point": "B",
      "api_calls": [
        {
          "endpoint": "POST /compare",
          "called_by": "Person 1",
          "rendered_by": "Person 2",
          "mock_key": "compare_confirmed",
          "key_response_fields": {
            "consistency_score": 91,
            "verdict": "confirmed",
            "mismatch_reason": null
          },
          "note": "Backend hardcoded to return 91 + 'confirmed' for demo photos. No real image comparison needed for the demo."
        },
        {
          "endpoint": "POST /match-buyers",
          "called_by": "Person 1 (endpoint) — fired by Person 2's app right after the Verified badge appears",
          "rendered_by": "not visible on this screen — produces the buyer ranking that /notify uses",
          "mock_key": "match_buyers_p009",
          "note": "Runs AFTER the Screen 3 verification confirms (NOT after Screen 2). Top match is Ashish Verma (U001, score 100). The live backend returns 4 ranked buyers: U001 100, U004 40, U003 35, U005 25 — only the top one is notified."
        },
        {
          "endpoint": "POST /notify",
          "called_by": "Person 1 (endpoint) — fired by Person 2's app immediately after /match-buyers",
          "rendered_by": "not visible on this screen — sets the flag that triggers Screen 4",
          "mock_key": "notify_u001",
          "note": "Called with buyer_id U001 (matches[0].buyer_id) and the full listing object from /generate-listing. Sets the in-memory flag that Person 3's app is already polling via GET /notify-status/U001."
        }
      ],
      "what_to_show": [
        "Two photos side by side: customer's photo (left), driver's photo (right)",
        "Label above left photo: 'Customer submission'",
        "Label above right photo: 'Driver photo at pickup'",
        "Consistency score animates upward to 91",
        "'Amazon Verified' badge appears with green checkmark when score clears threshold (70)",
        "Status text: 'Two-point verification complete. Condition confirmed.'",
        "After the 'Verified' badge appears: /match-buyers then /notify fire silently in the background — this is what triggers Ashish's notification on Screen 4"
      ],
      "what_NOT_to_show": [
        "The flagged / mismatch flow — save compare_flagged mock for a judge question if asked"
      ],
      "presenter_notes": "This is your 30-second moment. Let the score animate. When the badge appears say: 'Neither the buyer nor the seller is trusted to self-report. Amazon verifies the product independently at two separate points — when Rahul submits photos, and when the driver picks it up. The AI compares them. That's what makes this trustworthy.' Then switch to Person 3's device for Screen 4. As you switch devices, the listing is already live and the matching engine has just identified and notified Ashish — that lands on Screen 4.",
      "static_or_dynamic": "dynamic — score animation, hardcoded backend response"
    },
    {
      "screen_id": 4,
      "title": "Ashish Gets a Notification",
      "owner": "Person 3",
      "estimated_build_hours": 2,
      "complexity": "medium",
      "purpose": "The intelligence moment. Shows the system proactively matches supply to demand the instant a product is listed — not passive browsing.",
      "entry_point": "B",
      "api_calls": [
        {
          "endpoint": "GET /notify-status/{buyer_id}",
          "called_by": "Person 3 (polling every 3 seconds)",
          "buyer_id": "U001",
          "mock_key": "notify_status_u001_pending",
          "key_response_fields": {
            "product_id": "P009",
            "listing_title": "boAt Aavante Bar 490 Bluetooth Speaker — Like New",
            "condition_badge": "Like New",
            "discounted_price": 1229,
            "distance_label": "Same hub — Bhiwandi",
            "estimated_delivery": "Same Day"
          }
        }
      ],
      "what_to_show": [
        "Ashish's Amazon app is already open before the demo reaches this point",
        "Notification banner slides down from top when /notify-status returns a pending notification",
        "Banner text: 'Bluetooth speaker near you — Like New — Rs 1,229 — Same day delivery'",
        "Ashish taps the banner → navigates to Screen 5"
      ],
      "banner_exact_text": "Bluetooth speaker near you — Like New — Rs 1,229 — Same day delivery",
      "presenter_notes": "Switch to Person 3's device immediately after Screen 3. The banner should already be sliding down or fire within seconds. Say: 'The moment Rahul's listing went live, Amazon's matching engine identified Ashish — Electronics is on his wishlist, he's in the same city, and Rs 1,229 is within his budget. He didn't search for it. Amazon found him.' Ashish taps the banner.",
      "static_or_dynamic": "dynamic — polling /notify-status every 3 seconds"
    },
    {
      "screen_id": 5,
      "title": "Ashish's Product Detail Page",
      "owner": "Person 3",
      "estimated_build_hours": 2,
      "complexity": "low",
      "purpose": "Makes the matching algorithm visible and auditable. When a judge asks how matching works, the presenter points at this screen.",
      "entry_point": "B",
      "api_calls": [],
      "data_source": "Shared listing data from listing_p009_rahul_voluntary mock. Same ai_description that Person 2 showed on Screen 2.",
      "what_to_show": [
        "Product: boAt Aavante Bar 490 Bluetooth Speaker",
        "Condition badge: 'Like New' (green)",
        "AI description: 'The speaker body is in pristine condition with no scratches or marks. Original packaging and all accessories are intact.'",
        "Original price: Rs 1,499",
        "Second Life price: Rs 1,229",
        "Discount label: '18% off — Like New'",
        "'Amazon Verified' badge",
        "Match reason line: 'Matched because: Electronics on your wishlist · available near you · within your price range'",
        "Trust line: 'Condition mismatch? Full return covered by Amazon.'",
        "Estimated delivery: 'Same Day — Bhiwandi hub'",
        "'Buy Now' button leading to Screen 6"
      ],
      "match_reason_exact": "Matched because: Electronics on your wishlist · available near you · within your price range",
      "presenter_notes": "Point at the match reason line and read it out loud. Say: 'Category match, location match, price fit — three weighted criteria, fully auditable, no black box.' Then Ashish taps Buy Now.",
      "static_or_dynamic": "mostly static — data from shared listing JSON"
    },
    {
      "screen_id": 6,
      "title": "Ashish Buys",
      "owner": "Person 3",
      "estimated_build_hours": 0.5,
      "complexity": "low",
      "purpose": "Closes the buyer loop. Judges need to see the transaction complete.",
      "entry_point": "B",
      "api_calls": [],
      "what_to_show": [
        "Tap Buy Now → checkout confirmation screen",
        "'Order confirmed. Estimated delivery: Today.'",
        "Amazon Pay graphic",
        "Product name: boAt Aavante Bar 490 Bluetooth Speaker",
        "Amount paid: Rs 1,229"
      ],
      "presenter_notes": "One sentence: 'Ashish just bought a Like New Bluetooth speaker for Rs 1,229 — Rs 270 saved, same-day delivery, Amazon buyer protection.' Move to Screen 7.",
      "static_or_dynamic": "static"
    },
    {
      "screen_id": 7,
      "title": "Return Flow — Priya's Water Bottle",
      "owner": "Person 2",
      "estimated_build_hours": 1,
      "complexity": "low",
      "purpose": "Shows that both inventory entry points (voluntary listing AND returns) feed the same marketplace. Without this screen, judges might think the system only handles voluntary listings.",
      "entry_point": "A",
      "api_calls": [
        {
          "endpoint": "POST /analyze-product",
          "called_by": "Person 1",
          "rendered_by": "Person 2",
          "mock_key": "analyze_product_p001_priya_return",
          "key_response_fields": {
            "product_id": "P001",
            "score": 83,
            "condition": "Good",
            "confidence": 91,
            "routing": "second_life",
            "ai_description": "The bottle body is in clean condition with no visible dents or cracks. The cap shows minor surface marks but seals properly."
          },
          "note": "Return reason 'Wrong Size' applies +10 modifier. Raw score assumed ~73, adjusted to 83 -> condition Good."
        },
        {
          "endpoint": "POST /generate-listing",
          "called_by": "Person 1",
          "rendered_by": "Person 2",
          "mock_key": "listing_p001_priya_return",
          "key_response_fields": {
            "listing_title": "Cello H2O Unbreakable Water Bottle 1L — Good",
            "condition_badge": "Good",
            "original_price": 349,
            "discount_percent": 30,
            "discounted_price": 244,
            "return_reason_display": "Wrong Size",
            "entry_point": "A"
          }
        }
      ],
      "what_to_show": [
        "Switch to Priya's view — she is returning the water bottle (wrong size)",
        "Same photo upload screen as Screen 2 — reuse the component, swap the product object",
        "Return reason shown: 'Wrong Size'",
        "Result: condition badge 'Good'",
        "AI description: 'The bottle body is in clean condition with no visible dents or cracks. The cap shows minor surface marks but seals properly.'",
        "Original price: Rs 349",
        "Second Life price: Rs 244 (30% off — Good condition)",
        "Label: 'Amazon Verified Return — Good' (NOT 'Used' or 'Returned')",
        "Listed in the same Second Life marketplace"
      ],
      "label_exact": "Amazon Verified Return — Good",
      "what_NOT_to_show": [
        "The word 'returned' in any buyer-facing label",
        "A separate marketplace — Priya's listing feeds the same Second Life section as Rahul's"
      ],
      "presenter_notes": "Keep this fast — 30 seconds. Switch to Priya. Say: 'Priya bought the wrong size. She returns it. Same AI pipeline, same verification. It grades Good, lists at Rs 244. Both entry points — voluntary listing and returns — feed the same trusted marketplace.' That's the architecture claim made credible.",
      "fallback_if_time_short": "If time is tight, show a single static card with the listing result. The point lands either way — the screen just needs to exist.",
      "static_or_dynamic": "dynamic — reuses Screen 2 component with different product props"
    }
  ],
  "judge_questions": [
    {
      "question": "How does your matching algorithm work?",
      "answer": "Point at Screen 5. Read the match reason line: 'Electronics on your wishlist · available near you · within your price range.' Three weighted criteria — category match (+40 points), location match (+35 points), price fit (+25 points). Pure Python, no ML, fully auditable. A buyer with all three criteria is a 100-point match. Ashish scored 100.",
      "screen_reference": 5
    },
    {
      "question": "What does the Bedrock call actually return?",
      "answer": "Show Screen 2. Point at the condition grade (Like New), the two-line AI description, and the auto-calculated price. Person 1 explains the Vision API call — photos in, structured JSON out: score 88, condition Like New, routing second_life, AI description. The output is real and visible on screen.",
      "screen_reference": 2
    }
  ],
  "timeline": {
    "hours_1_to_2": {
      "label": "All Together — Lock contracts",
      "tasks": [
        "Lock API response JSONs (api_contract_v4.json is the source of truth)",
        "Lock CSS variables and design tokens (design_contract.json)",
        "Lock notification trigger contract: Person 3 polls GET /notify-status/U001 every 3 seconds",
        "Lock shared data files: products.json and users.json (NOT product_data.json or buyer_profiles.json — those names are outdated)",
        "No code until all four items are agreed and written down"
      ]
    },
    "hours_2_to_14": {
      "label": "Independent Build",
      "person_1": [
        "Build POST /analyze-product (real Bedrock Vision call)",
        "Build POST /compare (hardcoded to return consistency_score 91 + verdict confirmed for demo photos)",
        "Build POST /generate-listing (pure function, no AI dependency — can be built and tested before Bedrock is wired)",
        "Build POST /match-buyers (weighted scoring against users.json)",
        "Build POST /notify and GET /notify-status/{buyer_id} (in-memory flag)",
        "Pre-run demo photos through Bedrock 20+ times — know the exact scores before integration day"
      ],
      "person_2": [
        "Build Screen 1 against static data",
        "Build Screen 2 against analyze_product_p009_rahul_voluntary and listing_p009_rahul_voluntary mocks",
        "Build Screen 3 against compare_confirmed mock — animate score to 91",
        "Start Screen 7 if time allows — reuses Screen 2 component with P001 props"
      ],
      "person_3": [
        "Build Screen 4 — polling /notify-status/U001 every 3 seconds, sliding banner animation",
        "Build Screen 5 against listing_p009_rahul_voluntary mock and match_buyers_p009 mock",
        "Build Screen 6 — mostly static checkout confirmation"
      ]
    },
    "hours_14_to_16": {
      "label": "Rest",
      "note": "Non-negotiable. Integration bugs become invisible to tired eyes. Judgment degrades badly after 14 hours of focused work."
    },
    "hours_16_to_22": {
      "label": "Integration — in this order, do not skip steps",
      "steps": [
        "Connect Screen 2 to real POST /analyze-product. Test 5 times with demo photos. Confirm grade, description, and price render correctly.",
        "Connect Screen 3 to POST /compare. Confirm consistency score animates to 91 and 'Verified' badge appears.",
        "Connect Screen 3 (after the driver verification confirms) to POST /match-buyers + POST /notify. Confirm the flag is set after the driver check passes — NOT after Rahul's Screen 2 confirmation.",
        "Confirm Screen 4 notification banner fires on Person 3's app when /notify is called.",
        "Connect Screen 5 to shared listing data. Confirm match reason line displays correctly.",
        "Run full demo end to end: Rahul lists → driver verified → Ashish notified → Ashish buys. Three times without stopping. Fix what breaks."
      ]
    },
    "hours_22_to_24": {
      "label": "Polish and Rehearsal",
      "tasks": [
        "Person 2 finishes Screen 7 if not done",
        "All three rehearse the full demo out loud — agree on who speaks which screen",
        "Prepare answers for the two judge questions above",
        "One full run-through with no interruptions"
      ]
    }
  },
  "what_demo_proves": [
    {
      "claim": "The AI works",
      "screens": [
        2,
        3
      ],
      "proof": "Screen 2: real Bedrock Vision call returns a real condition grade and AI description. Screen 3: two-point verification produces a consistency score and verified badge."
    },
    {
      "claim": "The intelligence works",
      "screens": [
        4,
        5
      ],
      "proof": "Screen 4: system proactively notifies the right buyer the moment a listing goes live — no searching required. Screen 5: match reason is visible and auditable on screen."
    },
    {
      "claim": "The product loop is closed",
      "screens": [
        1,
        6,
        7
      ],
      "proof": "Screen 1: natural entry point from real order history. Screen 6: transaction completes. Screen 7: both inventory entry points (voluntary listing and returns) feed the same marketplace."
    }
  ],
  "what_is_NOT_in_the_demo": {
    "note": "All of these exist in the written document and can be discussed with judges. None require a live build to explain.",
    "excluded": [
      "Business impact dashboard (Screen 10) — visualisation of ideas, not proof the system works. Judges can ask about it.",
      "Architecture diagram as a live screen — explain verbally if asked.",
      "Hub location map — explain verbally if asked.",
      "Browse / filter marketplace page — not needed to prove the core loop.",
      "Refurbishment route — documented as future roadmap, shown as a node in architecture diagram only.",
      "Donation and recycling routes — documented, no live demo needed."
    ]
  },
  "_changes_v2": [
    "MOVED /match-buyers and /notify from Screen 2 to AFTER Screen 3 (driver verification), matching the agreed demo flow.",
    "Screen 2 now ends at Rahul's confirmation -> navigate to Screen 3. No background matching fires on Screen 2.",
    "Screen 3 now lists /compare, then /match-buyers, then /notify (in that order, after the Verified badge appears).",
    "Integration timeline step updated: connect /match-buyers + /notify to Screen 3, not Screen 2.",
    "Clarified that the real backend returns 4 ranked buyers for P009 (U001 100, U004 40, U003 35, U005 25); only the top one is notified. The contract's match_buyers_p009 mock shows 3 and is slightly misordered.",
    "Fixed Priya note: the water bottle grades 'Good' (score 83), not 'Like New'."
  ],
  "_flow_sequence": {
    "_note": "Canonical call order for the live demo. /match-buyers and /notify fire AFTER Screen 3 (driver verification), not after Screen 2 confirmation.",
    "order": [
      "Screen 1: Rahul taps 'Give it a Second Life' (no API call)",
      "Screen 2: POST /analyze-product, then POST /generate-listing; Rahul confirms -> go to Screen 3",
      "Screen 3: POST /compare (driver verification)",
      "After Screen 3 confirms: POST /match-buyers, then POST /notify",
      "Screen 4: Person 3's app polls GET /notify-status/U001 -> banner slides down",
      "Screen 5: product detail page (shared listing data + match reason)",
      "Screen 6: purchase confirmation",
      "Screen 7: separate return-flow vignette (Priya, P001) — independent of the main loop"
    ]
  }
}