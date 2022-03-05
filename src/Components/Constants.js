export const TranslateCategory = (categoryName) => {
  const categoryObj = {
    effectiveness: 'Эффективность',
    interaction: 'Взаимодействие',
    'assessment of abilities': 'Оценка способностей',
    'personal qualities': 'Личные качества',
    default: 'Другое'
  };

  return categoryObj[categoryName];
};
