import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import kr from "./locales/kr.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      kr: { translation: kr },
      ru: { translation: ru },
    },
    fallbackLng: "ru", // Default to Russian if not detected
    supportedLngs: ["uz", "kr", "ru"], // Only allow these languages
    nonExplicitSupportedLngs: true, // Ignore "-US" in "en-US"
    detection: {
      order: ["localStorage", "navigator"], // Try localStorage first
      caches: ["localStorage"], // Save selected language in localStorage
    },
  });

// If detected language is not in supportedLngs, change to fallbackLng
if (!["uz", "kr", "ru"].includes(i18n.language)) {
  i18n.changeLanguage("ru");
}

export default i18n;
