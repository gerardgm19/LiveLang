import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
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
import { addPhrase, getLocaleForLanguage } from "@/services/phraseService";

type FormErrors = {
  text?: string;
  translation?: string;
  phonetics?: string;
  targetLanguage?: string;
  userLanguage?: string;
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  error?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !!error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.textSoft}
        autoCapitalize={autoCapitalize ?? "sentences"}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function AddPhraseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ lang?: string }>();

  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [phonetics, setPhonetics] = useState("");
  const [targetLanguage, setTargetLanguage] = useState(params.lang ?? "en");
  const [userLanguage, setUserLanguage] = useState("es");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const next: FormErrors = {};
    if (!text.trim()) next.text = "Phrase is required";
    if (!translation.trim()) next.translation = "Translation is required";
    if (!phonetics.trim()) next.phonetics = "Phonetics is required";
    if (!targetLanguage.trim()) next.targetLanguage = "Target language code is required";
    if (!userLanguage.trim()) next.userLanguage = "Your language code is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    const tl = targetLanguage.trim().toLowerCase();
    const ul = userLanguage.trim().toLowerCase();
    const slug = text.trim().toLowerCase().replace(/\s+/g, "-");

    addPhrase({
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

    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <Pressable
          onPress={() => router.back()}
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
          onChangeText={setPhonetics}
          placeholder="e.g. huh-LOH"
          error={errors.phonetics}
        />
        <Field
          label="Target language code *"
          value={targetLanguage}
          onChangeText={setTargetLanguage}
          placeholder="e.g. en"
          error={errors.targetLanguage}
          autoCapitalize="none"
        />
        <Field
          label="Your language code *"
          value={userLanguage}
          onChangeText={setUserLanguage}
          placeholder="e.g. es"
          error={errors.userLanguage}
          autoCapitalize="none"
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
    fontSize: 17,
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
    fontSize: 16,
    color: palette.textSoft,
    fontWeight: "600",
  },
  saveText: {
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: "700",
    color: palette.text,
  },
  input: {
    backgroundColor: palette.white,
    borderWidth: 2,
    borderColor: palette.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: palette.text,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
  },
});
