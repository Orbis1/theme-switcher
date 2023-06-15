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
            },
          },
        },
      },
    },
  });

  return { getDef };
});
