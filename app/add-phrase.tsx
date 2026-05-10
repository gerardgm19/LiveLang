import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { palette } from "@/constants/theme";
import { getLocaleForLanguage } from "@/services/phraseService";
import { fetchWiktionaryPhonetics } from "@/services/wiktionaryService";
import { usePhraseStore } from "@/stores/phraseStore";

type FormErrors = {
  text?: string;
  translation?: string;
  phonetics?: string;
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  autoCapitalize,
  rightAction,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  error?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rightAction?: React.ReactNode;
}) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputFlex, !!error && styles.inputError]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={palette.textSoft}
          autoCapitalize={autoCapitalize ?? "sentences"}
        />
        {rightAction}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function AddPhraseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ lang?: string }>();
  const addPhrase = usePhraseStore((s) => s.addPhrase);

  const targetLanguage = (params.lang ?? "en").toLowerCase();
  const userLanguage = "es";

  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [phonetics, setPhonetics] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [fetchingPhonetics, setFetchingPhonetics] = useState(false);
  const [phoneticsError, setPhoneticsError] = useState<string | null>(null);

  function handleSpeak() {
    if (!text.trim()) return;
    Speech.stop();
    Speech.speak(text.trim(), { language: getLocaleForLanguage(targetLanguage), rate: 0.95, pitch: 1 });
  }

  async function handleFetchPhonetics() {
    if (!text.trim()) {
      setErrors((prev) => ({ ...prev, text: "Enter the phrase first" }));
      return;
    }
    setFetchingPhonetics(true);
    setPhoneticsError(null);
    const result = await fetchWiktionaryPhonetics(text.trim(), targetLanguage);
    setFetchingPhonetics(false);
    if (result) {
      setPhonetics(result);
      setErrors((prev) => ({ ...prev, phonetics: undefined }));
    } else {
      setPhoneticsError("No phonetics found. You can type it manually.");
    }
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!text.trim()) next.text = "Phrase is required";
    if (!translation.trim()) next.translation = "Translation is required";
    if (!phonetics.trim()) next.phonetics = "Phonetics is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;

    const tl = targetLanguage;
    const ul = userLanguage;
    const slug = text.trim().toLowerCase().replace(/\s+/g, "-");

    await addPhrase({
      id: `${tl}-${ul}-${slug}-${Date.now()}`,
      targetLanguage: tl,
      userLanguage: ul,
      text: text.trim(),
      translation: translation.trim(),
      phonetics: phonetics.trim(),
      audio: {
        text: text.trim(),
        locale: getLocaleForLanguage(tl),
        rate: 0.95,
        pitch: 1,
      },
    });

    router.replace("/(tabs)");
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={styles.topBarAction}
          accessibilityRole="button"
          accessibilityLabel="Cancel"
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>

        <Text style={styles.topBarTitle}>New Phrase</Text>

        <Pressable
          onPress={handleSave}
          style={styles.topBarAction}
          accessibilityRole="button"
          accessibilityLabel="Save phrase"
        >
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <Field
          label="Phrase *"
          value={text}
          onChangeText={setText}
          placeholder="e.g. Hello"
          error={errors.text}
        />
        <Field
          label="Translation *"
          value={translation}
          onChangeText={setTranslation}
          placeholder="e.g. Hola"
          error={errors.translation}
        />
        <Field
          label="Phonetics *"
          value={phonetics}
          onChangeText={(v) => {
            setPhonetics(v);
            setPhoneticsError(null);
          }}
          placeholder="e.g. huh-LOH"
          error={errors.phonetics ?? phoneticsError ?? undefined}
          rightAction={
            <View style={styles.fieldActions}>
              <Pressable
                onPress={handleSpeak}
                disabled={!text.trim()}
                style={[styles.actionButton, styles.speakButton, !text.trim() && styles.actionButtonDisabled]}
                accessibilityRole="button"
                accessibilityLabel="Speak phrase"
              >
                <Ionicons name="volume-high" size={20} color={palette.white} />
              </Pressable>
              <Pressable
                onPress={handleFetchPhonetics}
                disabled={fetchingPhonetics}
                style={[styles.actionButton, styles.syncButton, fetchingPhonetics && styles.actionButtonDisabled]}
                accessibilityRole="button"
                accessibilityLabel="Fetch phonetics from Wiktionary"
              >
                {fetchingPhonetics ? (
                  <ActivityIndicator size="small" color={palette.white} />
                ) : (
                  <Ionicons name="sync" size={20} color={palette.white} />
                )}
              </Pressable>
            </View>
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: palette.backgroundTop,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: palette.white,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  topBarTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.text,
  },
  topBarAction: {
    minWidth: 64,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 13,
    color: palette.textSoft,
    fontWeight: "600",
  },
  saveText: {
    fontSize: 13,
    color: palette.green,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  form: {
    padding: 20,
    gap: 20,
  },
  fieldWrapper: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.text,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputFlex: {
    flex: 1,
  },
  input: {
    backgroundColor: palette.white,
    borderWidth: 2,
    borderColor: palette.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: palette.text,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    fontSize: 10,
    color: "#EF4444",
    fontWeight: "600",
  },
  fieldActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  speakButton: {
    backgroundColor: palette.green,
  },
  syncButton: {
    backgroundColor: palette.blue,
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
});
