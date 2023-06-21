define(['qlik'], function (qlik) {
  'use strict';

  const getThemes = async () => {
    const themes = await qlik.getThemeList();
    const options = themes.map((theme) => ({
      value: theme.id,
      label: theme.name,
    }));
    return options;
  };

  const getDef = () => ({
    type: 'items',
    component: 'accordion',
    items: {
      appearance: {
        uses: 'settings',
        items: {
          header: {
            type: 'items',
            label: 'Themes',
            items: {
              themeOn: {
                type: 'string',
                component: 'dropdown',
                label: 'ON',
                ref: 'theme.on',
                options: getThemes,
              },
              themeOff: {
                type: 'string',
                component: 'dropdown',
                label: 'OFF',
                ref: 'theme.off',
                options: getThemes,
              },
              text0: {
                label: `
                Описание расширения
                `,
                component: 'text',
              },
              text1: {
                label: `
                theme-switcher создаёт и обновляет 
                переменные при каждом переключении (ON|OFF)
                `,
                component: 'text',
              },
              text2: {
                label: `
                themeSwitcher.currentThemeId: id выбранной в 
                расширении темы (например sense для темы Sense Classic)
                `,
                component: 'text',
              },
              text3: {
                label: `
                themeSwitcher.pos: положение переключателя (1 - ON, 2 - OFF)
                `,
                component: 'text',
              },
            },
          },
        },
      },
    },
  });

  return { getDef };
});
