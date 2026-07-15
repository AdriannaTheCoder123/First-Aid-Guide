import { FirstAidTopic, EmergencyContact, QuizQuestion, TriageNode } from '../types';

export const FIRST_AID_TOPICS: FirstAidTopic[] = [
  {
    id: 'cpr',
    title: 'CPR (Cardiopulmonary Resuscitation)',
    category: 'resuscitation',
    icon: 'HeartPulse',
    severity: 'critical',
    shortDesc: 'Life-saving technique used when someone\'s breathing or heartbeat has stopped.',
    quickAction: 'Call 911 immediately and start chest compressions at 100 to 120 beats per minute.',
    callAmbulanceImmediately: true,
    steps: [
      { id: 1, text: 'Verify the scene is safe, then check responsiveness by tapping the shoulder and shouting "Are you okay?".', type: 'info' },
      { id: 2, text: 'Check for breathing: Look at the chest for rise and fall for no more than 10 seconds.', type: 'info' },
      { id: 3, text: 'If unresponsive and not breathing, call 911 (or send someone to call) and get an AED if available.', type: 'do' },
      { id: 4, text: 'Position the person flat on their back on a firm, flat surface.', type: 'do' },
      { id: 5, text: 'Give Chest Compressions: Place the heel of one hand in the center of the chest, and the other hand on top. Push hard and fast (100–120 bpm) to a depth of 2 to 2.4 inches.', type: 'do', detail: 'Let the chest rise completely between compressions.' },
      { id: 6, text: 'If trained, give Rescue Breaths: After 30 compressions, tilt head back, pinch nose, and deliver 2 gentle breaths. If not trained, perform hands-only CPR (continuous compressions).', type: 'info' },
      { id: 7, text: 'Continue CPR until an AED arrives, professional responders take over, or the person starts breathing.', type: 'do' }
    ],
    ageSpecific: {
      adult: [
        { id: 1, text: 'Hand placement: Two hands stacked, heel of bottom hand on the center of the chest (lower half of breastbone).', type: 'do' },
        { id: 2, text: 'Compression depth: At least 2 inches (5 cm) but no more than 2.4 inches (6 cm).', type: 'do' },
        { id: 3, text: 'Rhythm: 30 compressions to 2 rescue breaths (or continuous chest-only compressions).', type: 'info' }
      ],
      child: [
        { id: 1, text: 'Hand placement: One or two hands in the center of the chest, depending on the child\'s size.', type: 'do' },
        { id: 2, text: 'Compression depth: Compress about 2 inches (5 cm), about 1/3 the depth of the chest.', type: 'do' },
        { id: 3, text: 'Rhythm: 30 compressions to 2 breaths (if solo rescuer; 15:2 if two professional rescuers).', type: 'info' }
      ],
      infant: [
        { id: 1, text: 'Hand placement: 2 fingers in the center of the chest, just below the imaginary line connecting the nipples.', type: 'do' },
        { id: 2, text: 'Compression depth: Compress about 1.5 inches (4 cm), about 1/3 the depth of the chest.', type: 'do' },
        { id: 3, text: 'Breaths: Cover BOTH infant\'s mouth and nose with your mouth. Give very gentle, small puffs of air.', type: 'warning', detail: 'Only puff enough air to see the chest rise.' },
        { id: 4, text: 'Rhythm: 30 compressions to 2 breaths.', type: 'info' }
      ]
    },
    donts: [
      'Do NOT stop CPR unless a medical professional arrives, an AED instructs you to pause, or the scene becomes unsafe.',
      'Do NOT push shallower than 2 inches for adults or deeper than 2.4 inches.',
      'Do NOT lean on the person\'s chest between compressions—allow full chest recoil.'
    ],
    signs: [
      'Unresponsiveness (no movement, sound, or reaction to touch)',
      'No breathing or only agonal gasping (infrequent, struggling snorts)',
      'No pulse (not required to check for lay rescuers, focus on breathing and responsiveness)'
    ]
  },
  {
    id: 'choking',
    title: 'Choking Relief',
    category: 'resuscitation',
    icon: 'UserRoundX',
    severity: 'critical',
    shortDesc: 'First aid for severe airway obstruction, separating adult/child and infant procedures.',
    quickAction: 'Ask "Are you choking?" If they cannot speak or cough, immediately perform abdominal thrusts or back blows.',
    steps: [
      { id: 1, text: 'Assess the blockage: Ask "Are you choking?" If the person can speak, cry, or cough forcefully, do NOT perform thrusts. Encourage them to keep coughing.', type: 'info' },
      { id: 2, text: 'If they cannot make a sound, speak, or breathe, or are turning blue, immediate action is required.', type: 'warning' },
      { id: 3, text: 'Perform age-appropriate rescue maneuvers (abdominal thrusts for adults/children, back blows and chest thrusts for infants) until the object is expelled.', type: 'do' },
      { id: 4, text: 'If the person becomes unresponsive, lower them carefully to the ground, call 911, and begin CPR compressions.', type: 'warning', detail: 'Each time you open the airway to give breaths during CPR, look in the mouth for the object and remove it if visible. Never perform blind finger sweeps.' }
    ],
    ageSpecific: {
      adult: [
        { id: 1, text: 'Stand behind the person, wrap your arms around their waist, and lean them slightly forward.', type: 'do' },
        { id: 2, text: 'Make a fist with one hand. Place the thumb side of your fist against their abdomen, slightly above the navel and well below the breastbone.', type: 'do' },
        { id: 3, text: 'Grasp your fist with your other hand. Press forcefully into the abdomen with a quick upward and inward thrust.', type: 'do', detail: 'Perform thrusts continuously until the blockage is cleared or the person loses consciousness.' }
      ],
      child: [
        { id: 1, text: 'Kneel down behind the child to match their height.', type: 'do' },
        { id: 2, text: 'Place your fist slightly above the navel, grab it with the other hand, and perform quick upward and inward thrusts.', type: 'do', detail: 'Use slightly less force than on an adult, tailored to the child\'s physical size.' }
      ],
      infant: [
        { id: 1, text: 'Sit down and support the infant face down on your forearm, resting on your thigh. Hold the infant\'s head lower than their chest and support the jaw with your fingers (do not squeeze the neck).', type: 'do' },
        { id: 2, text: 'Deliver 5 firm back blows between the shoulder blades using the heel of your hand.', type: 'do' },
        { id: 3, text: 'If the object is not freed, support the infant\'s head, sandwich them between your forearms, and flip them face up on your thigh, keeping head lower than body.', type: 'do' },
        { id: 4, text: 'Deliver 5 quick chest thrusts on the breastbone (just below the nipple line) using 2 fingers, pressing down about 1.5 inches.', type: 'do' },
        { id: 5, text: 'Alternate 5 back blows and 5 chest thrusts until the object is expelled or the infant loses consciousness.', type: 'warning' }
      ]
    },
    donts: [
      'Do NOT perform abdominal thrusts on a choking infant (under 1 year old)—use back blows and chest thrusts instead.',
      'Do NOT perform a blind finger sweep inside the mouth, as you may push the object further down the throat.',
      'Do NOT slap a choking person on the back if they are coughing strongly; coughing is the most effective way to clear the airway.'
    ],
    signs: [
      'Inability to speak, cry, or cough forcefully',
      'The universal sign of choking (clutching the throat with hands)',
      'High-pitched wheezing sounds or no sound at all when trying to breathe',
      'Skin, lips, or fingernails turning blue or gray (cyanosis)'
    ]
  },
  {
    id: 'burns',
    title: 'Burns Treatment',
    category: 'trauma',
    icon: 'Flame',
    severity: 'moderate',
    shortDesc: 'Essential steps to treat thermal, chemical, or electrical burns and identify critical degrees.',
    quickAction: 'Cool the burn with cool, running water for 10-20 minutes. Do not use ice, butter, or ointments.',
    steps: [
      { id: 1, text: 'Stop the burning process: Remove the source of heat. For chemical burns, brush off dry chemicals, then rinse with copious water.', type: 'do' },
      { id: 2, text: 'Cool the burn: Hold the burned area under cool (not freezing) running tap water for 10 to 20 minutes.', type: 'do', detail: 'Cooling reduces pain, swelling, and the depth of the injury.' },
      { id: 3, text: 'Remove restrictive items: Gently remove rings, jewelry, or tight clothing from the burned area before swelling starts.', type: 'do', detail: 'Do NOT peel away clothing that is melted or stuck to the burn.' },
      { id: 4, text: 'Cover loosely: Cover the burn with a sterile, non-stick gauze bandage or clean plastic wrap.', type: 'do', detail: 'This protects the raw skin from airborne dirt and reduces air contact pain.' },
      { id: 5, text: 'Manage pain: Keep the limb elevated to reduce swelling. Take over-the-counter pain relievers if appropriate.', type: 'info' }
    ],
    donts: [
      'Do NOT use ice, ice water, butter, toothpaste, mayonnaise, or oils on a burn. These trap heat and damage tissues further.',
      'Do NOT pop or puncture blisters, as this exposes the tissue to serious infection.',
      'Do NOT peel off clothing that has melted and stuck to the skin.'
    ],
    signs: [
      '1st Degree: Redness, mild pain, and minor swelling. No blisters.',
      '2nd Degree: Intense pain, severe redness, swelling, and blisters (fluid-filled).',
      '3rd Degree: Charred black, white, or leathery appearance. Often painless because nerve endings are destroyed.'
    ]
  },
  {
    id: 'cuts',
    title: 'Cuts, Scrapes & Severe Bleeding',
    category: 'trauma',
    icon: 'Bandage',
    severity: 'moderate',
    shortDesc: 'How to clean minor wounds, apply pressure, and stem severe, life-threatening arterial bleeding.',
    quickAction: 'Apply direct, continuous pressure to the wound with a clean cloth. Clean minor cuts under cool water.',
    steps: [
      { id: 1, text: 'Stop Bleeding: Apply firm, direct pressure on the wound with a clean cloth or sterile gauze. Hold continuously for 5-10 minutes.', type: 'do' },
      { id: 2, text: 'Clean Wounded Area: If it is a minor cut, rinse under cool, running water to clear away dirt. Clean the skin around the wound with soap, but do not get soap directly in the wound.', type: 'do' },
      { id: 3, text: 'Apply Ointment: Apply a thin layer of petroleum jelly or antibiotic ointment to keep the wound moist and prevent scarring.', type: 'info' },
      { id: 4, text: 'Cover Wounded Area: Apply a sterile adhesive bandage, plaster, or gauze wrapping to protect it from dust and bacteria.', type: 'do' },
      { id: 5, text: 'Watch for Infection: Monitor the wound for increased redness, warmth, swelling, throbbing pain, or pus over the next few days.', type: 'warning' },
      { id: 6, text: 'For Severe/Spurting Bleeding: Call 911 immediately. If bleeding is on a limb and direct pressure is failing, apply a commercial tourniquet 2-3 inches above the wound (not on a joint) and tighten until bleeding stops.', type: 'warning' }
    ],
    donts: [
      'Do NOT pull out deeply embedded objects (like glass or wood). Keep them steady, wrap dressing around them to stabilize, and seek emergency care.',
      'Do NOT wash a deep, heavily bleeding wound under water; focus entirely on direct pressure.',
      'Do NOT pick at scabs; they are part of the natural healing seal.'
    ],
    signs: [
      'Minor: Slow, oozing dark red blood. Stops easily with light pressure.',
      'Severe/Arterial: Fast, spurting bright red blood. Difficult to stop and requires immediate emergency response.',
      'Infected: Increasing pain, spreading redness, swelling, heat, or yellow/foul discharge.'
    ]
  },
  {
    id: 'nosebleeds',
    title: 'Nosebleed Care',
    category: 'trauma',
    icon: 'Droplets',
    severity: 'mild',
    shortDesc: 'A simple, highly effective technique to stop nosebleeds. Learn the correct head tilt.',
    quickAction: 'Sit upright, lean forward slightly, and pinch the soft part of the nose continuously for 10-15 minutes.',
    steps: [
      { id: 1, text: 'Sit upright and lean forward slightly.', type: 'do', detail: 'Leaning forward prevents blood from running down the back of the throat, which can cause choking or stomach irritation.' },
      { id: 2, text: 'Pinch the soft parts of the nose: Use your thumb and index finger to firmly pinch the nostrils closed (just below the bony bridge).', type: 'do' },
      { id: 3, text: 'Breathe through the mouth: Keep pinching continuously for 10 to 15 minutes without letting go to check.', type: 'do', detail: 'Constant pressure is required to let the clotting process succeed.' },
      { id: 4, text: 'Apply cold: You can place an ice pack or cold damp cloth over the bridge of the nose to constrict blood vessels.', type: 'info' },
      { id: 5, text: 'Rest: Sit quietly for a short period. Avoid bending over, blowing, or rubbing the nose for several hours.', type: 'do' }
    ],
    donts: [
      'Do NOT tilt the head back. This causes blood to flow into the sinuses and stomach, triggering nausea or vomiting.',
      'Do NOT pack the inside of the nose with cotton wool, tissues, or gauze, as pulling them out can rip away the fresh clot.',
      'Do NOT lie down flat.'
    ],
    signs: [
      'Call doctor or go to ER if: Bleeding lasts longer than 20 minutes despite continuous pressure.',
      'Seek emergency help if: The nosebleed was caused by a severe head injury, or if the person is struggling to breathe.'
    ]
  },
  {
    id: 'allergies',
    title: 'Anaphylaxis (Severe Allergic Reaction)',
    category: 'medical',
    icon: 'ShieldAlert',
    severity: 'critical',
    shortDesc: 'How to recognize life-threatening allergic shock and administer an Epinephrine Auto-Injector (EpiPen).',
    quickAction: 'Call 911 immediately and administer an Epinephrine Auto-Injector (EpiPen) into the outer thigh.',
    callAmbulanceImmediately: true,
    steps: [
      { id: 1, text: 'Recognize the emergency: Check for difficulty breathing, swelling of the throat/tongue, hives, dizziness, or confusion.', type: 'warning' },
      { id: 2, text: 'Call 911 immediately if severe reaction or breathing trouble is present.', type: 'do' },
      { id: 3, text: 'Help the person locate and administer their Epinephrine Auto-Injector (EpiPen) if they have one.', type: 'do' },
      { id: 4, text: 'Administer EpiPen: Pull off the safety cap. Place the orange tip against the outer mid-thigh. Push firmly until you hear a click. Hold in place for 3 full seconds.', type: 'do', detail: 'Massage the injection area for 10 seconds afterward to aid absorption. Epinephrine can be injected right through clothing.' },
      { id: 5, text: 'Position for comfort: Help them lie flat on their back with feet elevated about 12 inches, unless they are struggling to breathe or vomiting (in which case, keep them sitting up or on their side).', type: 'do' },
      { id: 6, text: 'Prepare for a second dose: Note that a second EpiPen may be administered 5 to 15 minutes later if emergency services have not arrived and symptoms worsen.', type: 'info' }
    ],
    donts: [
      'Do NOT hesitate to use the Epinephrine Auto-Injector. In anaphylaxis, delayed administration is the leading cause of death.',
      'Do NOT inject Epinephrine into hands, feet, fingers, or buttocks, as this can cause tissue damage. Only inject into the outer thigh.',
      'Do NOT give oral allergy medications (like Benadryl) if the person is struggling to swallow or is unresponsive.'
    ],
    signs: [
      'Swelling of the lips, tongue, face, or throat',
      'Difficulty breathing, wheezing, coughing, or high-pitched squeaks',
      'Widespread red hives, intense itching, or flushed skin',
      'Weak, rapid pulse, dizziness, fainting, or sudden confusion'
    ]
  },
  {
    id: 'poisoning',
    title: 'Poisoning Emergency',
    category: 'medical',
    icon: 'Skull',
    severity: 'critical',
    shortDesc: 'Actions to take for ingested, inhaled, or chemical contact poisons, including Poison Control contact.',
    quickAction: 'If unconscious or struggling to breathe, call 911. Otherwise, call Poison Control immediately at 1-800-222-1222.',
    steps: [
      { id: 1, text: 'Assess responsiveness: If the person is unconscious, fitting, or not breathing, call 911 immediately.', type: 'warning' },
      { id: 2, text: 'Call Poison Control: If they are conscious and stable, immediately call Poison Control at 1-800-222-1222 (US). Have the chemical container or pill bottle ready to read the ingredients.', type: 'do' },
      { id: 3, text: 'Swallowed poison: Do NOT induce vomiting unless instructed by a medical expert. Wipe away any chemical residue around their mouth.', type: 'do' },
      { id: 4, text: 'Inhaled poison: Safely move the person into fresh air immediately. Do not put yourself in danger if toxic gases are present.', type: 'do' },
      { id: 5, text: 'Skin or Eye contact: Remove contaminated clothing. Flush the affected skin or eyes with lukewarm water continuously for at least 15 to 20 minutes.', type: 'do' }
    ],
    donts: [
      'Do NOT induce vomiting with syrup of ipecac, mustard, salt, or manual gagging, as this can burn the throat again on the way up.',
      'Do NOT give the person anything to eat or drink (including water, milk, or charcoal) unless explicitly directed by Poison Control.',
      'Do NOT wait for symptoms to develop before calling for professional help.'
    ],
    signs: [
      'Burns or redness around the mouth and lips',
      'Chemical smell on the breath, or empty pill bottles/household cleaner containers nearby',
      'Nausea, vomiting, abdominal cramps, diarrhea',
      'Drowsiness, confusion, seizures, or difficulty breathing'
    ]
  },
  {
    id: 'sprains',
    title: 'Sprains, Strains & Fractures',
    category: 'trauma',
    icon: 'Activity',
    severity: 'moderate',
    shortDesc: 'R.I.C.E protocol for soft tissue injuries and how to safely immobilize broken bones.',
    quickAction: 'Use the R.I.C.E. method (Rest, Ice, Compression, Elevation) and immobilize suspected fractures.',
    steps: [
      { id: 1, text: 'Rest: Protect and rest the injured limb. Discontinue all physical activity.', type: 'do' },
      { id: 2, text: 'Ice: Apply a cold source (ice pack or bag of frozen vegetables wrapped in a thin towel) for 15-20 minutes every 2-3 hours.', type: 'do', detail: 'Never apply bare ice directly to the skin.' },
      { id: 3, text: 'Compress: Wrap the joint firmly with an elastic bandage (like an ACE wrap) to limit swelling.', type: 'do', detail: 'Ensure the wrap is not too tight; check for numbness, tingling, cold toes/fingers, or increased pain.' },
      { id: 4, text: 'Elevate: Keep the injured area raised above the heart level as much as possible to drain fluid and reduce swelling.', type: 'do' },
      { id: 5, text: 'For Fractures: If a bone is visibly deformed, sticking out, or the limb cannot bear any weight, immobilize it. Create a temporary splint using folded cardboard or wood held by bandages.', type: 'warning', detail: 'Do not attempt to push a bone back in or realign the joint.' }
    ],
    donts: [
      'Do NOT apply ice directly to the skin, which can cause frostbite.',
      'Do NOT try to massage or vigorously rub a fresh sprain or fracture.',
      'Do NOT attempt to force a deformed bone or dislocated joint back into alignment.'
    ],
    signs: [
      'Sprain/Strain: Pain, immediate swelling, bruising, and limited joint movement.',
      'Fracture: Severe pain, deformity (crooked limb), bruising, swelling, bone popping sounds, or bone protruding through skin.'
    ]
  },
  {
    id: 'heat_stroke',
    title: 'Heat Exhaustion & Heat Stroke',
    category: 'environmental',
    icon: 'Sun',
    severity: 'moderate',
    shortDesc: 'Identifying the differences between heat exhaustion and heat stroke, a true life-threatening emergency.',
    quickAction: 'Move to a cool area. For Heat Stroke (confusion, dry hot skin), call 911 immediately and cool them rapidly.',
    steps: [
      { id: 1, text: 'Differentiate the severity: Check if they have Heat Exhaustion (heavy sweating, cold pale skin, dizziness) or Heat Stroke (no sweating, red hot skin, confusion, fainting).', type: 'info' },
      { id: 2, text: 'For Heat Stroke: Call 911 immediately. This is a severe medical emergency!', type: 'warning' },
      { id: 3, text: 'Cool the person down: Move them to an air-conditioned room or shade immediately.', type: 'do' },
      { id: 4, text: 'Active Cooling: Strip extra clothing. Spray them with cool water, place wet towels on their head, neck, armpits, and groin, or place them in a cool bath.', type: 'do' },
      { id: 5, text: 'Hydration: If they are fully conscious, awake, and not confused, offer them cool sips of water or sports drinks. Do NOT give drinks to a confused or vomiting person.', type: 'do' }
    ],
    donts: [
      'Do NOT give fluids to someone who is confused, vomiting, or unresponsive, as they could aspirate (choke on) the liquid.',
      'Do NOT apply freezing ice baths to elderly people or children, as it can cause sudden shock; use cool water instead.',
      'Do NOT delay calling 911 for a suspected Heat Stroke.'
    ],
    signs: [
      'Heat Exhaustion: Heavy sweating, pale/clammy skin, muscle cramps, dizziness, headache, nausea, weak rapid pulse.',
      'Heat Stroke: Body temp above 103°F (39.4°C), hot red dry or damp skin, confusion, slurred speech, rapid strong pulse, fainting/unconsciousness.'
    ]
  },
  {
    id: 'insect_bites',
    title: 'Insect Bites & Bee Stings',
    category: 'environmental',
    icon: 'Bug',
    severity: 'mild',
    shortDesc: 'How to safely extract bee stingers, reduce swelling, and monitor for allergic shock.',
    quickAction: 'Scrape the stinger off with a straight edge. Wash with soap and apply ice.',
    steps: [
      { id: 1, text: 'Remove stinger: If stung by a bee, scrape the stinger off immediately with a flat edge (like a credit card).', type: 'do', detail: 'Do not use tweezers to squeeze the stinger, as this may inject more venom.' },
      { id: 2, text: 'Clean the bite: Wash the area gently with soap and cool water to prevent infection.', type: 'do' },
      { id: 3, text: 'Apply Ice: Place an ice pack wrapped in a cloth on the area for 10 minutes to reduce local pain and swelling.', type: 'do' },
      { id: 4, text: 'Apply Lotion/Cream: Apply hydrocortisone cream, calamine lotion, or a baking soda paste to relieve itching.', type: 'info' },
      { id: 5, text: 'Monitor: Keep a close watch for at least 30 minutes for symptoms of a severe systemic allergic reaction (anaphylaxis).', type: 'warning' }
    ],
    donts: [
      'Do NOT squeeze or pinch the stinger with tweezers or fingers, as this pushes remaining venom into the body.',
      'Do NOT scratch the bite, which increases itching and introduces bacteria, leading to infection.'
    ],
    signs: [
      'Normal reaction: Localized redness, mild swelling, and itching at the bite site.',
      'Severe reaction: Rapid swelling of face/lips, hives, throat tightness, or trouble breathing (requires emergency EpiPen and 911).'
    ]
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: 'Emergency Services (US/Canada)',
    number: '911',
    description: 'Police, Fire, and Ambulance dispatch. For life-threatening emergencies.',
    icon: 'PhoneCall'
  },
  {
    name: 'National Poison Control (US)',
    number: '1-800-222-1222',
    description: 'Free, confidential, 24/7 expert medical advice for poison ingestion, chemical exposure, or bites.',
    icon: 'Skull'
  },
  {
    name: 'Emergency Services (Europe)',
    number: '112',
    description: 'Standard emergency call number in the EU and many other European countries.',
    icon: 'Globe'
  },
  {
    name: 'Emergency Services (UK)',
    number: '999',
    description: 'National emergency helpline for police, ambulance, fire, and coastguard in the United Kingdom.',
    icon: 'Shield'
  },
  {
    name: 'Mental Health Crisis Lifeline',
    number: '988',
    description: 'National suicide and crisis prevention helpline in the United States and Canada.',
    icon: 'Heart'
  }
];

export const FIRST_AID_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'When treating a minor burn, which of the following should you NOT do?',
    options: [
      'Hold it under cool running tap water for 10-20 minutes',
      'Apply butter, oils, or toothpaste to keep the skin moist',
      'Remove jewelry near the area before swelling starts',
      'Cover it loosely with clean plastic wrap or sterile gauze'
    ],
    answerIndex: 1,
    explanation: 'You should never apply butter, grease, toothpaste, or oils to a burn. These materials trap heat in the skin, causing deeper tissue damage and introducing harmful bacteria.',
    category: 'Burns'
  },
  {
    id: 2,
    question: 'What is the correct action if a person is experiencing a severe nosebleed?',
    options: [
      'Tilt their head backward and pack their nose with cotton wool',
      'Have them lie down flat on their back with feet raised',
      'Sit upright, lean slightly forward, and pinch the soft nostrils for 10-15 minutes',
      'Blow the nose vigorously to clear out any blood clots'
    ],
    answerIndex: 2,
    explanation: 'Leaning slightly forward prevents the blood from trickling down the back of the throat, which can cause choking or vomiting. Pinching the soft parts of the nostrils creates the continuous pressure needed for a blood clot to seal the vessel.',
    category: 'Nosebleeds'
  },
  {
    id: 3,
    question: 'How should you rescue a choking infant (under 1 year old) who cannot make any sounds?',
    options: [
      'Perform standard abdominal thrusts (Heimlich Maneuver)',
      'Alternate 5 firm back blows between the shoulder blades and 5 quick chest thrusts',
      'Reach deep into the infant\'s throat with your finger to sweep out the object',
      'Hold them upside down by their ankles and shake them'
    ],
    answerIndex: 1,
    explanation: 'Abdominal thrusts can cause internal organ damage in infants. Instead, support the infant face down on your arm and deliver 5 back blows, then turn them face up and deliver 5 chest thrusts. Blind finger sweeps can push the object further down.',
    category: 'Choking'
  },
  {
    id: 4,
    question: 'What is the recommended compression-to-breath ratio when performing CPR on an adult?',
    options: [
      '15 compressions to 2 rescue breaths',
      '50 compressions to 5 rescue breaths',
      '30 compressions to 2 rescue breaths',
      '10 compressions to 1 rescue breath'
    ],
    answerIndex: 2,
    explanation: 'The standard protocol for adult CPR is 30 chest compressions followed by 2 rescue breaths. If you are untrained or unable to perform rescue breaths, you should perform continuous hands-only CPR at 100-120 compressions per minute.',
    category: 'CPR'
  },
  {
    id: 5,
    question: 'How should you safely remove a bee stinger from someone\'s skin?',
    options: [
      'Squeeze the stinger firmly with metal tweezers and pull it out',
      'Scrape the stinger off horizontally using a flat, straight edge like a credit card',
      'Squeeze the skin around the sting to pop it out like a pimple',
      'Soak the area in hot vinegar until the stinger dissolves'
    ],
    answerIndex: 1,
    explanation: 'Using tweezers to pinch a bee stinger can squeeze the venom sac, injecting more poison into the patient. Scraping horizontally with a rigid flat card cleanly pops the stinger out without putting pressure on the sac.',
    category: 'Insect Bites'
  },
  {
    id: 6,
    question: 'What are the main characteristics of a critical Third-Degree Burn?',
    options: [
      'Red skin, mild swelling, and extreme throbbing pain',
      'Fluid-filled blisters and deep red, shiny skin',
      'Charred black or dry white appearance, and it may be relatively painless due to nerve damage',
      'A minor rash with tiny bumps that itch'
    ],
    answerIndex: 2,
    explanation: 'Third-degree burns destroy all layers of the skin, resulting in a charred, leathery, or white appearance. Because the nerve endings in the skin are destroyed, the burn itself may not hurt initially, though surrounding areas will be extremely painful.',
    category: 'Burns'
  },
  {
    id: 7,
    question: 'If a person is struggling to breathe, has a swollen tongue, and has hives after eating peanuts, what is the priority action?',
    options: [
      'Give them a glass of warm water and have them lie down',
      'Administer oral antihistamines and wait 30 minutes',
      'Call 911 immediately and administer an Epinephrine Auto-Injector (EpiPen) into the outer thigh',
      'Have them practice deep breathing and rub their back'
    ],
    answerIndex: 2,
    explanation: 'This person is displaying signs of anaphylaxis (a severe, life-threatening allergic reaction). Giving epinephrine immediately can save their life by opening up their airways and raising blood pressure. Do not delay epinephrine for oral medications.',
    category: 'Allergies'
  }
];

export const TRIAGE_TREE: Record<string, TriageNode> = {
  start: {
    id: 'start',
    question: 'What type of emergency or situation is occurring?',
    options: [
      { text: 'Someone is unconscious, unresponsive, or not breathing', nextId: 'unconscious' },
      { text: 'Someone is choking on food or an object', nextId: 'choking_select' },
      { text: 'Bleeding, cuts, or open wounds', nextId: 'bleeding_select' },
      { text: 'Burns (from heat, chemicals, or electricity)', nextId: 'burn_select' },
      { text: 'Allergic reaction, poisoning, bites, or heat stroke', nextId: 'other_select' }
    ]
  },
  unconscious: {
    id: 'unconscious',
    question: 'Is the unresponsive person breathing normally?',
    options: [
      {
        text: 'NO - They are not breathing, or are only gasping/struggling',
        topicId: 'cpr',
        critical: true,
        advice: 'CRITICAL EMERGENCY: Call 911. Start continuous chest compressions immediately (CPR).'
      },
      {
        text: 'YES - They are breathing normally',
        advice: 'Call 911. Roll them onto their side into the "Recovery Position" to keep their airway open. Monitor their breathing continuously.',
        critical: false
      }
    ]
  },
  choking_select: {
    id: 'choking_select',
    question: 'Who is choking?',
    options: [
      { text: 'An Adult or Child (Over 1 year old)', topicId: 'choking' },
      { text: 'An Infant (Baby under 1 year old)', topicId: 'choking' }
    ]
  },
  bleeding_select: {
    id: 'bleeding_select',
    question: 'Is the bleeding severe, spurting, or failing to stop after 5-10 minutes of direct pressure?',
    options: [
      {
        text: 'YES - Spurting bright red blood or massive blood loss',
        advice: 'CRITICAL EMERGENCY: Call 911 immediately. Apply heavy, constant direct pressure. If on a limb and bleeding continues, apply a tourniquet if trained.',
        critical: true,
        topicId: 'cuts'
      },
      { text: 'NO - Minor scrape, cut, or puncture wound', topicId: 'cuts' }
    ]
  },
  burn_select: {
    id: 'burn_select',
    question: 'Is the burn charred black, leathery white, or covering a large area/face/joints?',
    options: [
      {
        text: 'YES - Charred black, white, or very large area',
        advice: 'CRITICAL EMERGENCY: Call 911 immediately. Do NOT apply cold water to massive 3rd degree burns (can cause shock/hypothermia). Cover loosely with a dry, sterile cloth.',
        critical: true,
        topicId: 'burns'
      },
      { text: 'NO - Redness, mild swelling, or small localized blisters', topicId: 'burns' }
    ]
  },
  other_select: {
    id: 'other_select',
    question: 'What is the specific situation?',
    options: [
      { text: 'Swollen lips/tongue, hives, struggling to breathe (Allergy)', topicId: 'allergies', critical: true },
      { text: 'Swallowed, inhaled, or touched toxic household chemical or pills', topicId: 'poisoning', critical: true },
      { text: 'Bee sting, wasp sting, spider bite, or general bug bite', topicId: 'insect_bites' },
      { text: 'Extremely hot skin, dry/clammy, confusion, rapid heart rate', topicId: 'heat_stroke', critical: true },
      { text: 'Twisted joint, possible sprain, strain, or broken bone', topicId: 'sprains' }
    ]
  }
};
