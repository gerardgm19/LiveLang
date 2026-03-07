import * as Speech from "expo-speech";

import type { PhraseItem } from "@/types/phrase";

const PHRASES: PhraseItem[] = [
  {
    id: "en-es-hello",
    targetLanguage: "en",
    userLanguage: "es",
    text: "Hello",
    translation: "Hola",
    phonetics: "huh-LOH",
    audio: {
      text: "Hello",
      locale: "en-US",
      rate: 0.95,
      pitch: 1,
    },
  },
  {
    id: "en-es-thank-you",
    targetLanguage: "en",
    userLanguage: "es",
    text: "Thank you",
    translation: "Gracias",
    phonetics: "THANGK yoo",
    audio: {
      text: "Thank you",
      locale: "en-US",
      rate: 0.95,
      pitch: 1,
    },
  },
];

type GetPhrasesParams = {
  targetLanguage: string;
  userLanguage: string;
};

export function getPhrases(params: GetPhrasesParams): PhraseItem[] {
  return PHRASES.filter(
    (phrase) =>
      phrase.targetLanguage === params.targetLanguage &&
      phrase.userLanguage === params.userLanguage,
  );
}

export function playPhraseAudio(item: PhraseItem): void {
  Speech.stop();
  Speech.speak(item.audio.text, {
    language: item.audio.locale,
    rate: item.audio.rate,
    pitch: item.audio.pitch,
  });
}
