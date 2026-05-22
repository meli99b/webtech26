export function createBreakdown(title) {
  const task = title.toLowerCase();
  const hasAny = (keywords) => keywords.some((keyword) => task.includes(keyword));
  const recipientMatch = title.match(/for\s+(.+)/i);
  const recipient = recipientMatch ? recipientMatch[1].trim() : "them";

  if (hasAny(["email", "e-mail", "mail", "inbox", "reply"])) {
    return [
      { text: "Open inbox and locate the one message that matters most", done: false },
      { text: "Write a rough 2-line reply first", done: false },
      { text: "Polish quickly and send it", done: false },
    ];
  }

  if (hasAny(["study", "learn", "exam", "read", "lecture", "homework"])) {
    return [
      { text: "Pick one small section only", done: false },
      { text: "Set a 15-minute timer", done: false },
      { text: "Write 3 quick notes from what you read", done: false },
    ];
  }

  if (hasAny(["clean", "desk", "room", "laundry", "tidy", "kitchen"])) {
    return [
      { text: "Trash first: remove obvious clutter", done: false },
      { text: "Put misplaced items in one pile", done: false },
      { text: "Clear one visible surface", done: false },
    ];
  }

  if (hasAny(["shop", "grocery", "buy", "groceries", "supermarket"])) {
    return [
      { text: `List only essentials for "${title}"`, done: false },
      { text: "Group items by section (produce, pantry, other)", done: false },
      { text: "Buy just the list and leave", done: false },
    ];
  }

  if (hasAny(["call", "phone", "appointment", "doctor"])) {
    return [
      { text: `Find contact details for "${title}"`, done: false },
      { text: "Write one sentence for what you need", done: false },
      { text: "Make the call and note the result", done: false },
    ];
  }

  if (hasAny(["gift", "present", "birthday", "mothers day", "mother's day", "christmas"])) {
    return [
      { text: `Set a budget range for ${recipient}`, done: false },
      { text: "Pick one category (flowers, self-care, book, experience)", done: false },
      { text: "Choose one item and add it to cart or note the store", done: false },
    ];
  }

  if (hasAny(["trip", "travel", "vacation", "holiday"])) {
    return [
      { text: `Pick destination and dates for "${title}"`, done: false },
      { text: "Set total budget (transport + stay + food)", done: false },
      { text: "Book first anchor item (flight/train/hotel)", done: false },
    ];
  }

  if (hasAny(["plan", "planning", "organize", "schedule"])) {
    return [
      { text: `Write the goal for "${title}" in one sentence`, done: false },
      { text: "List the top 3 actions only", done: false },
      { text: "Schedule the first action on calendar", done: false },
    ];
  }

  if (hasAny(["meeting", "sync", "standup", "call with"])) {
    return [
      { text: `Write the agenda for "${title}" in 3 bullets`, done: false },
      { text: "Prepare required files/links before start", done: false },
      { text: "Add one follow-up action after the meeting", done: false },
    ];
  }

  if (hasAny(["flight", "plane", "airport", "boarding"])) {
    return [
      { text: "Compare 2-3 flight options by time and price", done: false },
      { text: "Book ticket and save confirmation details", done: false },
      { text: "Set reminders for check-in and airport departure", done: false },
    ];
  }

  return [
    { text: `Clarify what "done" means for "${title}"`, done: false },
    { text: `Do the easiest 2-minute starter step for "${title}"`, done: false },
    { text: `Take one concrete next action on "${title}"`, done: false },
  ];
}
