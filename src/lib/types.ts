export type AgeTier = "child" | "teen" | "young_adult" | "adult";

export const AGE_TIER_LABELS: Record<AgeTier, string> = {
  child: "Child (8–12)",
  teen: "Teen (13–17)",
  young_adult: "Young Adult (18–24)",
  adult: "Adult (25+)",
};

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  ageTier: AgeTier | null;
  country?: string;
  createdAt: string;
  onboardingComplete: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export type Mood =
  | "happy"
  | "calm"
  | "sad"
  | "anxious"
  | "angry"
  | "confused"
  | "scared"
  | "hopeful";

export interface JournalEntry {
  id: string;
  uid: string;
  title: string;
  content: string;
  mood: Mood;
  aiSummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearnTopic {
  slug: string;
  title: string;
  emoji: string;
  shortDescription: string;
  ageTiers: AgeTier[];
  sections: { heading: string; body: string }[];
}

export interface HelpResource {
  name: string;
  description: string;
  phone?: string;
  sms?: string;
  website?: string;
  availability?: string;
}

export interface CountryHelp {
  countryCode: string;
  countryName: string;
  emergencyNumber: string;
  resources: HelpResource[];
}
