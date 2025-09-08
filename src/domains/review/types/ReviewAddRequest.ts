export interface ReviewAddRequest {
  seenPerformanceId: number;
  watchDate: string; // ISO string format
  content: string;
  audioUrl?: string;
  characterName?: string;
  characterType?: string;
  characterEmotion?: string;
  characterHats?: string;
  characterGlasses?: string;
  characterHairAccessories?: string;
}
