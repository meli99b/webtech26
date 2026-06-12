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

function coreThing(title) {
  return title
    .toLowerCase()
    .replace(/^(finish|complete|start|continue|resume)\s+(the\s+)?/i, "")
    .replace(/\s+you\s+started.*$/i, "")
    .replace(/\s+i\s+started.*$/i, "")
    .replace(/\s+that\s+i\s+started.*$/i, "")
    .trim();
}

const STOP_WORDS = new Set([
  "your", "the", "for", "and", "with", "from", "that", "this", "have", "make",
  "create", "prepare", "finish", "complete", "start", "need", "please", "just",
  "eine", "einen", "einem", "einer", "das", "die", "der", "und", "für",
]);

function extractFocus(title) {
  const cleaned = title
    .toLowerCase()
    .replace(/^(please\s+|i\s+need\s+to\s+|need\s+to\s+|have\s+to\s+|must\s+|should\s+)/i, "")
    .replace(/^(finish|complete|start|continue|resume|do|make|organize|plan)\s+(the\s+|my\s+)?/i, "")
    .replace(/\s+(you|i)\s+started.*$/i, "")
    .replace(/\s+that\s+(you|i)\s+started.*$/i, "")
    .trim();

  const words = cleaned
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zäöüß0-9-]/gi, ""))
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  if (words.length > 0) {
    return words.slice(0, 4).join(" ");
  }
  return title.trim();
}

function detectIntent(task) {
  if (/^(start|begin|anfangen|starte|anfang)/.test(task)) return "start";
  if (/^(finish|complete|beenden|fertig|end|abschlie)/.test(task)) return "finish";
  if (/^(buy|shop|get|order|kauf|hol|bestell)/.test(task)) return "buy";
  if (/^(send|submit|email|mail|schick|abgib)/.test(task)) return "send";
  if (/^(call|phone|ring|anruf|telefonier)/.test(task)) return "call";
  if (/^(learn|study|lern|üb|revis|review)/.test(task)) return "learn";
  if (/^(organize|sort|tidy|plan|aufräum|organisier|sortier)/.test(task)) return "organize";
  if (/^(fix|repair|reparier|mend)/.test(task)) return "fix";
  if (hasAny(task, ["finish", "complete", "beenden"]) && hasAny(task, ["start", "started", "angefangen"])) {
    return "finish";
  }
  return "default";
}

function genericBreakdown(raw, task) {
  const focus = extractFocus(raw);
  const intent = detectIntent(task);

  const templates = {
    start: [
      `Name the tiniest visible starting point for "${focus}"`,
      "Gather only what you need for the first 10 minutes",
      "Set a timer, do that first bit, then stop on purpose",
    ],
    finish: [
      `Open or locate "${focus}" and list up to 3 things still undone`,
      "Pick the easiest one — 10 minutes maximum",
      "Do only that piece; write the next micro-step before you walk away",
    ],
    buy: [
      `Write a short essentials-only list for "${focus}" (5 items max)`,
      "Check what you already have so you do not double-buy",
      "Buy or add one item to cart, then stop",
    ],
    send: [
      `Open the draft or find what you need for "${focus}"`,
      "Write a rough version in 2–4 sentences — ugly is fine",
      "Send or submit it, then mark it done",
    ],
    call: [
      `Find the contact info for "${focus}"`,
      "Write one sentence: what you need from this call",
      "Make the call and note the result",
    ],
    learn: [
      `Pick one small slice of "${focus}" — one page or one section`,
      "Set a 15-minute timer with zero multitasking",
      "Write 3 bullet notes in your own words",
    ],
    organize: [
      `Choose one visible zone for "${focus}" — not the whole thing`,
      "Trash and obvious clutter first, one pile only",
      "Stop when that zone is clearly better than before",
    ],
    fix: [
      `Describe what is wrong with "${focus}" in one sentence`,
      "Check tools or info within reach — no rabbit holes",
      "Try the smallest fix for 15 minutes; stop if stuck",
    ],
    default: [
      `Define "done" for "${focus}" in one short sentence`,
      "What is the 2-minute version? Do that first",
      "Set a 10-minute timer for the next small chunk, then note what comes after",
    ],
  };

  return subtasks(templates[intent] || templates.default);
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

  if (hasAny(task, ["paint", "painting", "draw", "drawing", "sketch", "canvas", "malen", "gemälde", "zeichnen", "aquarell"])) {
    return subtasks([
      "Find the piece and pick ONE small area that still needs work",
      "Set out only the brushes and colors needed for that spot",
      "Paint that area for 10 minutes, then stop and jot the next tiny step",
    ]);
  }

  if (
    hasAny(task, ["finish", "complete", "continue", "resume", "beenden", "weitermachen"]) &&
    hasAny(task, ["start", "started", "begun", "angefangen"])
  ) {
    const thing = coreThing(raw) || topic;
    return subtasks([
      `Find your ${thing} and note what's actually still unfinished`,
      "Pick the smallest bit left — one corner, one section, 10 minutes max",
      "Do only that bit, then write the next micro-step before you walk away",
    ]);
  }

  if (hasAny(task, ["finish", "complete", "beenden", "fertig"])) {
    const thing = coreThing(raw) || topic;
    return subtasks([
      `Look at "${thing}" and list what's still undone (max 3 bullets)`,
      "Choose the easiest remaining piece and set a 10-minute timer",
      "Stop when the timer ends — partial progress still counts",
    ]);
  }

  return genericBreakdown(raw, task);
}
