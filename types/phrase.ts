export type PhraseAudio = {
  text: string;
  locale: string;
  rate?: number;
  pitch?: number;
};

export type PhraseItem = {
  id: string;
  targetLanguage: string;
  userLanguage: string;
  text: string;
  translation: string;
  phonetics: string;
  audio: PhraseAudio;
};
