import uzFlag from "../assets/logos/uz.png";
import ruFlag from "../assets/logos/ru.png";
import krFlag from "../assets/logos/qr.png";

export const TARIFF_TYPES = {
  PRIME: {
    code: "prime",
    img: "",
  },
  PREMIUM: {
    code: "premium",
    img: "",
  },
};

export const SELECTION_API_TYPES = {
  OLYMPIC: "olympic",
  ENGLISH: "english",
};

export const SUBJECT_API_TYPES = {
  SUBJECTS: "SUBJECTS",
  MAIN_SUBJECTS: "MAIN_SUBJECTS",
};

export const BANNER_TYPES = {
  TOP: "home_page_top",
  MIDDLE: "home_page_middle",
  MIDDLE_BELOW: "home_page_middle_below",
};

export const LEADERS_FILTER_TIME = {
  ALL: "all",
  DAILY: "per_day",
  WEEKLY: "per_week",
  MONTHLY: "per_month",
};

export const LANGUAGES = [
  {
    name: "O'zbekcha",
    code: "uz",
    flag: uzFlag,
    shortName: "O'zb",
  },
  {
    name: "Ruscha",
    code: "ru",
    flag: ruFlag,
    shortName: "Рус",
  },
  {
    name: "Qoraqalpoqcha",
    code: "kr",
    flag: krFlag,
    shortName: "QR",
  },
];
