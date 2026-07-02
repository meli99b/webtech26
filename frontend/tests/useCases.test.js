import { describe, expect, it } from "vitest";
import { pickExampleMissions } from "../src/utils/exampleMissions.js";
import { shouldShowMemePopup } from "../src/utils/memePopup.js";

// Frontend use-case tests (UC 6 + UC 7)

describe("Use case 6: Add 3 tiny missions", () => {
  it("picks 3 example missions", () => {
    const missions = pickExampleMissions([], 3);
    expect(missions).toHaveLength(3);
  });
});

describe("Use case 7: Meme popup", () => {
  it("shows meme when more than 10 open tasks", () => {
    expect(shouldShowMemePopup(11)).toBe(true);
    expect(shouldShowMemePopup(10)).toBe(false);
  });
});
