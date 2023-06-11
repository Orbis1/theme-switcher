define(['qlik', 'text!./index.html', 'angular', './utils'], function (
  qlik,
  template,
  angular,
  setVariable,
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
              console.log(`Theme "${themeId}" applied`);
              setVariable('themeSwitcher.currentThemeId', themeId);
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
