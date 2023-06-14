define(['qlik', 'text!./index.html', 'angular', './utils'], function (
  qlik,
  template,
  angular,
  utils,
) {
  return {
    template: template,
    support: {
      snapshot: false,
      export: false,
      exportData: false,
    },
    controller: [
      '$scope',
      function ($scope) {
        console.log('controller');
        try {
          // scope
          $scope.theme = {
            // availableOptions: [
            //   { id: '1', name: 'Option A' },
            //   { id: '2', name: 'Option B' },
            //   { id: '3', name: 'Option C' },
            // ],
            // selectedOption: { id: '3', name: 'Option C' },
          };

          $scope.switch = function (themeId) {
            qlik.theme.apply(themeId).then(() => {
              utils
                .setVariable('themeSwitcher.currentThemeId', themeId)
                .then(() => console.log(`Theme "${themeId}" applied`))
                .catch((err) => console.error(err));
            });
          };

          qlik.getThemeList().then((themeList) => {
            $scope.theme.availableOptions = themeList;

            qlik
              .currApp()
              .theme.getApplied()
              .then((currentTheme) => {
                const selectedTheme = themeList.filter(
                  (theme) => theme.id === currentTheme.id,
                );

                $scope.theme.selectedOption = selectedTheme[0];
              });
          });
        } catch (error) {
          console.error(error);
        }
      },
    ],
  };
});
