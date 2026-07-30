import type { InterviewSection, InterviewQuestion } from "./types";
import { interviewSections } from "./sections";

export const sections: InterviewSection[] = interviewSections;

const lessonCache = new Map<string, InterviewQuestion[]>();

export async function loadSectionQuestions(
  sectionId: string
): Promise<InterviewQuestion[]> {
  const cached = lessonCache.get(sectionId);
  if (cached) return cached;

  const module = await import(`./lessons/${sectionId}.json`);
  const questions = (module.default ?? module) as InterviewQuestion[];
  lessonCache.set(sectionId, questions);
  return questions;
}
