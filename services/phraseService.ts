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
    audio: { text: "Hello", locale: "en-US", rate: 0.95, pitch: 1 },
  },
  {
    id: "en-es-thank-you",
    targetLanguage: "en",
    userLanguage: "es",
    text: "Thank you",
    translation: "Gracias",
    phonetics: "THANGK yoo",
    audio: { text: "Thank you", locale: "en-US", rate: 0.95, pitch: 1 },
  },
  {
    id: "fr-es-bonjour",
    targetLanguage: "fr",
    userLanguage: "es",
    text: "Bonjour",
    translation: "Hola",
    phonetics: "bohn-ZHOOR",
    audio: { text: "Bonjour", locale: "fr-FR", rate: 0.95, pitch: 1 },
  },
  {
    id: "fr-es-merci",
    targetLanguage: "fr",
    userLanguage: "es",
    text: "Merci",
    translation: "Gracias",
    phonetics: "mehr-SEE",
    audio: { text: "Merci", locale: "fr-FR", rate: 0.95, pitch: 1 },
  },
  {
    id: "de-es-hallo",
    targetLanguage: "de",
    userLanguage: "es",
    text: "Hallo",
    translation: "Hola",
    phonetics: "HAH-loh",
    audio: { text: "Hallo", locale: "de-DE", rate: 0.95, pitch: 1 },
  },
  {
    id: "de-es-danke",
    targetLanguage: "de",
    userLanguage: "es",
    text: "Danke",
    translation: "Gracias",
    phonetics: "DAHN-kuh",
    audio: { text: "Danke", locale: "de-DE", rate: 0.95, pitch: 1 },
  },
  {
    id: "it-es-ciao",
    targetLanguage: "it",
    userLanguage: "es",
    text: "Ciao",
    translation: "Hola",
    phonetics: "CHAO",
    audio: { text: "Ciao", locale: "it-IT", rate: 0.95, pitch: 1 },
  },
  {
    id: "it-es-grazie",
    targetLanguage: "it",
    userLanguage: "es",
    text: "Grazie",
    translation: "Gracias",
    phonetics: "GRAHT-see-eh",
    audio: { text: "Grazie", locale: "it-IT", rate: 0.95, pitch: 1 },
  },
  {
    id: "pt-es-ola",
    targetLanguage: "pt",
    userLanguage: "es",
    text: "Ola",
    translation: "Hola",
    phonetics: "OH-lah",
    audio: { text: "Ola", locale: "pt-PT", rate: 0.95, pitch: 1 },
  },
  {
    id: "pt-es-obrigado",
    targetLanguage: "pt",
    userLanguage: "es",
    text: "Obrigado",
    translation: "Gracias",
    phonetics: "oh-bree-GAH-doo",
    audio: { text: "Obrigado", locale: "pt-PT", rate: 0.95, pitch: 1 },
  },
  {
    id: "ja-es-konnichiwa",
    targetLanguage: "ja",
    userLanguage: "es",
    text: "Konnichiwa",
    translation: "Hola",
    phonetics: "koh-nee-chee-wah",
    audio: { text: "Konnichiwa", locale: "ja-JP", rate: 0.95, pitch: 1 },
  },
  {
    id: "ja-es-arigato",
    targetLanguage: "ja",
    userLanguage: "es",
    text: "Arigato",
    translation: "Gracias",
    phonetics: "ah-ree-GAH-toh",
    audio: { text: "Arigato", locale: "ja-JP", rate: 0.95, pitch: 1 },
  },
  {
    id: "ko-es-annyeong",
    targetLanguage: "ko",
    userLanguage: "es",
    text: "Annyeong",
    translation: "Hola",
    phonetics: "ahn-nyawng",
    audio: { text: "Annyeong", locale: "ko-KR", rate: 0.95, pitch: 1 },
  },
  {
    id: "ko-es-gamsahamnida",
    targetLanguage: "ko",
    userLanguage: "es",
    text: "Gamsahamnida",
    translation: "Gracias",
    phonetics: "gam-sa-ham-nee-da",
    audio: { text: "Gamsahamnida", locale: "ko-KR", rate: 0.95, pitch: 1 },
  },
  {
    id: "zh-es-nihao",
    targetLanguage: "zh",
    userLanguage: "es",
    text: "Ni hao",
    translation: "Hola",
    phonetics: "nee how",
    audio: { text: "Ni hao", locale: "zh-CN", rate: 0.95, pitch: 1 },
  },
  {
    id: "zh-es-xiexie",
    targetLanguage: "zh",
    userLanguage: "es",
    text: "Xie xie",
    translation: "Gracias",
    phonetics: "shieh shieh",
    audio: { text: "Xie xie", locale: "zh-CN", rate: 0.95, pitch: 1 },
  },
  {
    id: "ar-es-marhaban",
    targetLanguage: "ar",
    userLanguage: "es",
    text: "Marhaban",
    translation: "Hola",
    phonetics: "mar-ha-ban",
    audio: { text: "Marhaban", locale: "ar-SA", rate: 0.95, pitch: 1 },
  },
  {
    id: "ar-es-shukran",
    targetLanguage: "ar",
    userLanguage: "es",
    text: "Shukran",
    translation: "Gracias",
    phonetics: "shoo-kran",
    audio: { text: "Shukran", locale: "ar-SA", rate: 0.95, pitch: 1 },
  },
  {
    id: "es-es-hola",
    targetLanguage: "es",
    userLanguage: "es",
    text: "Hola",
    translation: "Hola",
    phonetics: "OH-lah",
    audio: { text: "Hola", locale: "es-ES", rate: 0.95, pitch: 1 },
  },
  {
    id: "es-es-gracias",
    targetLanguage: "es",
    userLanguage: "es",
    text: "Gracias",
    translation: "Gracias",
    phonetics: "GRAH-syahs",
    audio: { text: "Gracias", locale: "es-ES", rate: 0.95, pitch: 1 },
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
