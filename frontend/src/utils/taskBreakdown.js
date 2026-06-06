function subtasks(steps) {
  return steps.map((text) => ({ text, done: false }));
}

function hasAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function extractAfterFor(title) {
  const match = title.match(/for\s+(.+)/i);
  return match ? match[1].trim() : null;
}

function mainTopic(title) {
  return title.replace(/^(plan|prepare|organize|do|make|finish|complete)\s+/i, "").trim() || title;
}

export function createBreakdown(title) {
  const raw = title.trim();
  const task = raw.toLowerCase();
  const topic = mainTopic(raw);
  const recipient = extractAfterFor(raw) || "them";

  if (hasAny(task, ["email", "e-mail", "mail", "inbox", "reply", "nachricht"])) {
    return subtasks([
      `Open your inbox and find the message about "${topic}"`,
      `Write a rough reply to "${topic}" in 2–3 sentences`,
      "Read once, fix typos, and hit send",
    ]);
  }

  if (hasAny(task, ["study", "learn", "exam", "lecture", "homework", "lernen", "prüfung", "klausur"])) {
    return subtasks([
      `Choose one small chunk of "${topic}" — one page or one section`,
      "Set a 15-minute timer and start before it feels perfect",
      "Write 3 short notes on what you actually understood",
    ]);
  }

  if (hasAny(task, ["read", "book", "article", "chapter", "lesen"])) {
    return subtasks([
      `Open "${topic}" and read only the first small section`,
      "Highlight or note 2 things worth remembering",
      "Stop after one section — that counts as progress",
    ]);
  }

  if (hasAny(task, ["clean", "tidy", "declutter", "aufräumen", "putzen"])) {
    if (hasAny(task, ["kitchen", "küche"])) {
      return subtasks([
        "Clear dirty dishes into the sink",
        "Wipe counters and put away 3 stray items",
        "Take out trash if the bag is full",
      ]);
    }
    if (hasAny(task, ["bathroom", "bad", "bath"])) {
      return subtasks([
        "Remove trash and empty containers",
        "Quick wipe of sink and mirror",
        "Replace towel or restock toilet paper if needed",
      ]);
    }
    if (hasAny(task, ["desk", "schreibtisch", "office"])) {
      return subtasks([
        "Trash and cups off the desk first",
        "Stack papers into one “deal with later” pile",
        "Clear enough space for your laptop and one notebook",
      ]);
    }
    if (hasAny(task, ["room", "bedroom", "zimmer"])) {
      return subtasks([
        "Pick up clothes and put them in laundry or closet",
        "Clear the floor path so you can walk without stepping on stuff",
        "Make the bed or straighten one visible surface",
      ]);
    }
    return subtasks([
      `Pick one zone for "${topic}" — not the whole area`,
      "Remove trash and obvious clutter first",
      "Stop when one zone looks clearly better",
    ]);
  }

  if (hasAny(task, ["laundry", "wäsche", "wash clothes"])) {
    return subtasks([
      "Sort into one load you can start right now",
      "Start the machine — normal settings are fine",
      "Set a reminder to switch or hang clothes later",
    ]);
  }

  if (hasAny(task, ["shop", "grocery", "groceries", "supermarket", "einkauf", "kaufen"])) {
    return subtasks([
      `List 5–7 essentials for "${topic}"`,
      "Group the list by store section to move faster",
      "Go shopping with the list only — no side quests",
    ]);
  }

  if (hasAny(task, ["cook", "meal", "dinner", "lunch", "breakfast", "kochen", "essen"])) {
    return subtasks([
      `Check what ingredients you already have for "${topic}"`,
      "Pick the simplest version of the recipe",
      "Prep ingredients, cook one portion, and clean one pan",
    ]);
  }

  if (hasAny(task, ["call", "phone", "anruf", "telefon"])) {
    return subtasks([
      `Find the phone number or contact for "${topic}"`,
      "Write one sentence explaining what you need from the call",
      "Make the call and jot down the outcome",
    ]);
  }

  if (hasAny(task, ["appointment", "doctor", "dentist", "arzt", "termin"])) {
    return subtasks([
      `Confirm date, time, and place for "${topic}"`,
      "List 2 symptoms or questions to bring up",
      "Put ID, insurance, and any documents in your bag",
    ]);
  }

  if (hasAny(task, ["gift", "present", "birthday", "christmas", "geschenk", "geburtstag"])) {
    return subtasks([
      `Set a budget for the gift in "${topic}"`,
      `Brainstorm 3 ideas that ${recipient} would actually like`,
      "Pick one idea and buy it or save the link",
    ]);
  }

  if (hasAny(task, ["trip", "travel", "vacation", "holiday", "reise", "urlaub", "flight", "flug"])) {
    return subtasks([
      `Decide where and when for "${topic}"`,
      "Check transport and stay options with rough prices",
      "Book or reserve the first non-optional piece (ticket or hotel)",
    ]);
  }

  if (hasAny(task, ["meeting", "sync", "standup", "presentation", "präsentation"])) {
    return subtasks([
      `Write a 3-bullet agenda for "${topic}"`,
      "Gather files, links, or slides you need open",
      "Note one follow-up task to do right after it ends",
    ]);
  }

  if (hasAny(task, ["plan", "planning", "organize", "schedule", "planen", "organisieren"])) {
    return subtasks([
      `Define what “done” looks like for "${topic}" in one sentence`,
      "List the 3 smallest next actions only",
      "Put the first action on your calendar with a time",
    ]);
  }

  if (hasAny(task, ["pack", "packing", "tasche", "koffer"])) {
    return subtasks([
      `List must-have items for "${topic}"`,
      "Pack clothes and chargers first",
      "Do a final check: keys, wallet, tickets",
    ]);
  }

  if (hasAny(task, ["pay", "bill", "invoice", "rent", "rechnung", "miete"])) {
    return subtasks([
      `Find the amount and due date for "${topic}"`,
      "Log into bank or payment app",
      "Pay it and save or screenshot the confirmation",
    ]);
  }

  if (hasAny(task, ["exercise", "workout", "gym", "run", "walk", "sport", "training"])) {
    return subtasks([
      "Put on workout clothes — that is step one",
      `Do a 10-minute version of "${topic}"`,
      "Drink water and log that you showed up",
    ]);
  }

  if (hasAny(task, ["write", "essay", "report", "paper", "schreiben", "arbeit"])) {
    return subtasks([
      `Open a doc and write a messy outline for "${topic}"`,
      "Fill in one section — ugly first draft is fine",
      "Read it once and fix only the clearest errors",
    ]);
  }

  if (hasAny(task, ["fix", "repair", "broken", "kaputt", "reparieren"])) {
    return subtasks([
      `Identify what exactly is broken in "${topic}"`,
      "Check if you have tools or parts within reach",
      "Do the smallest fix that makes it usable again",
    ]);
  }

  if (hasAny(task, ["cv", "resume", "lebenslauf", "curriculum vitae"])) {
    return subtasks([
      "List your last 2 roles with dates and 2 achievements each",
      "Drop that into a simple one-page CV template",
      "Proofread headings and export or save as PDF",
    ]);
  }

  if (hasAny(task, ["apply", "application", "bewerbung", "bewerben", "job", "jobs", "career", "hiring"])) {
    return subtasks([
      "Find 3 job posts that roughly match your skills",
      "Pick the best match and tweak your CV for it",
      "Send one application today — cover letter can be short",
    ]);
  }

  if (hasAny(task, ["interview", "vorstellungsgespräch", "gespräch"])) {
    return subtasks([
      `Read the job description again for "${topic}"`,
      "Prepare 3 answers: strengths, project, why this role",
      "Do a 5-minute practice intro out loud",
    ]);
  }

  const stopWords = new Set([
    "your", "the", "for", "and", "with", "from", "that", "this", "have", "make",
    "create", "prepare", "finish", "complete", "start", "eine", "einen", "einem",
  ]);
  const words = task
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zäöüß]/gi, ""))
    .filter((w) => w.length > 2 && !stopWords.has(w));

  if (words.length > 0) {
    const action = words[0];
    const object = words.slice(1, 4).join(" ") || topic;
    return subtasks([
      `Gather what you need to ${action} ${object}`,
      `Do a 10-minute starter on ${object} — messy is fine`,
      `Note the very next small step for ${object}`,
    ]);
  }

  return subtasks([
    `Write down what "done" means for "${topic}"`,
    `Do one 5-minute starter step on "${topic}"`,
    `Pick the next action before you stop working on "${topic}"`,
  ]);
}
