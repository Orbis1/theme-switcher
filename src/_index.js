// eslint-disable-next-line no-undef, import/no-amd
define(['qlik'], (qlik) => {
  // eslint-disable-next-line strict, lines-around-directive
  'use strict';
  qlik.on('error', (err) => console.log('qlik.onError', err));

  qlik.setOnError((error) => {
    console.log('theme-switcher-qlik.setOnError', error);
  });
  return {
    support: {
      snapshot: false,
      export: false,
      exportData: false,
    },

    async paint($element) {
      try {
        const themes = await qlik.getThemeList();
        console.log('qlik.getThemeList', themes);
        const app = await qlik.currApp();
        const currTheme = await app.theme.getApplied();
        const variableName = 'themeSwitcher.getCurrentThemeId';
        const variableExists = await app.variable.get(variableName);
        console.log(variableExists);
        // app.variable.create({
        //  qName : '',
        //  qDefinition : 'currTheme.id'
        // });
        // app.variable.setStringValue('themeSwitcher.getCurrentThemeId', currTheme.id)
        console.log('currTheme', currTheme);
        $element.html('qwerty');
        console.log('qwerty');
        // needed for export
      } catch (error) {
        console.error('theme-switcher', error);
      }
      return qlik.Promise.resolve();
    },
  };
});
