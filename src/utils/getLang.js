export default (availableLangs) => {
  let locales = (navigator.languages) ? navigator.languages : [];
  locales = [...locales, navigator.language, navigator.userLanguage, navigator.browserLanguage];
  const languages = locales.map((lang) => {
    try {
      return lang.slice(0, 2);
    } catch {
      return '';
    }
  }).filter((lang) => lang !== '');
  // eslint-disable-next-line no-restricted-syntax
  for (const lang of languages) {
    if (availableLangs.includes(lang)) {
      return lang;
    }
  }
  return null;
};
