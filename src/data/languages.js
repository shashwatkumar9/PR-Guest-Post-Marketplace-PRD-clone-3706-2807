// Languages supported for content publication
export const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    native: 'English',
    flag: '🇬🇧',
    popularity: 1
  },
  {
    code: 'es',
    name: 'Spanish',
    native: 'Español',
    flag: '🇪🇸',
    popularity: 2
  },
  {
    code: 'fr',
    name: 'French',
    native: 'Français',
    flag: '🇫🇷',
    popularity: 3
  },
  {
    code: 'de',
    name: 'German',
    native: 'Deutsch',
    flag: '🇩🇪',
    popularity: 4
  },
  {
    code: 'pt',
    name: 'Portuguese',
    native: 'Português',
    flag: '🇵🇹',
    popularity: 5
  },
  {
    code: 'ru',
    name: 'Russian',
    native: 'Русский',
    flag: '🇷🇺',
    popularity: 6
  },
  {
    code: 'ja',
    name: 'Japanese',
    native: '日本語',
    flag: '🇯🇵',
    popularity: 7
  },
  {
    code: 'zh',
    name: 'Chinese',
    native: '中文',
    flag: '🇨🇳',
    popularity: 8
  },
  {
    code: 'ar',
    name: 'Arabic',
    native: 'العربية',
    flag: '🇸🇦',
    popularity: 9
  },
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    flag: '🇮🇳',
    popularity: 10
  },
  {
    code: 'it',
    name: 'Italian',
    native: 'Italiano',
    flag: '🇮🇹',
    popularity: 11
  },
  {
    code: 'nl',
    name: 'Dutch',
    native: 'Nederlands',
    flag: '🇳🇱',
    popularity: 12
  },
  {
    code: 'ko',
    name: 'Korean',
    native: '한국어',
    flag: '🇰🇷',
    popularity: 13
  },
  {
    code: 'tr',
    name: 'Turkish',
    native: 'Türkçe',
    flag: '🇹🇷',
    popularity: 14
  },
  {
    code: 'pl',
    name: 'Polish',
    native: 'Polski',
    flag: '🇵🇱',
    popularity: 15
  },
  {
    code: 'sv',
    name: 'Swedish',
    native: 'Svenska',
    flag: '🇸🇪',
    popularity: 16
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    native: 'Tiếng Việt',
    flag: '🇻🇳',
    popularity: 17
  },
  {
    code: 'th',
    name: 'Thai',
    native: 'ไทย',
    flag: '🇹🇭',
    popularity: 18
  },
  {
    code: 'id',
    name: 'Indonesian',
    native: 'Bahasa Indonesia',
    flag: '🇮🇩',
    popularity: 19
  },
  {
    code: 'uk',
    name: 'Ukrainian',
    native: 'Українська',
    flag: '🇺🇦',
    popularity: 20
  }
];

// Export sorted by name
export const LANGUAGES_BY_NAME = [...LANGUAGES].sort((a, b) => 
  a.name.localeCompare(b.name)
);

// Export sorted by popularity
export const LANGUAGES_BY_POPULARITY = [...LANGUAGES].sort((a, b) => 
  a.popularity - b.popularity
);

// Export function to get language by code
export const getLanguageByCode = (code) => {
  return LANGUAGES.find(lang => lang.code === code) || null;
};

// Export as options for select inputs
export const LANGUAGE_OPTIONS = LANGUAGES.map(lang => ({
  value: lang.code,
  label: `${lang.flag} ${lang.name} (${lang.native})`
}));