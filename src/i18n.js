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
    fallbackLng: "ru",
    supportedLngs: ["uz", "kr", "ru"],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

if (!["uz", "kr", "ru"].includes(i18n.language)) {
  i18n.changeLanguage("ru");
}

export default i18n;
