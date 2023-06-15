define([
  'qlik',
  'text!./index.html',
  'angular',
  './utils',
  './definition',
  'css!./index.css',
], function (qlik, template, angular, utils, definition) {
  console.log('angular', angular);
  return {
    template: template,
    support: {
      snapshot: false,
      export: false,
      exportData: false,
    },
    definition: definition.getDef(),

    controller: [
      '$scope',
      function ($scope) {
        try {
          $scope.backendApi.model.Validated.bind(() => {
            //Listens for click events or other data model changes
            $scope.theme.switcher.value
              ? $scope.switch($scope.layout.theme.on)
              : $scope.switch($scope.layout.theme.off);
          });

          $scope.switch = function (themeId) {
            if (themeId === undefined) return;
            qlik.theme.apply(themeId).then(() => {
              utils
                .setVariable('themeSwitcher.currentThemeId', themeId)
                .then(() => console.log(`Theme "${themeId}" applied`))
                .catch((err) => console.error(err));
            });
          };

          $scope.theme = {
            switcher: { value: false },
          };

          $scope.switch($scope.layout.theme.off);
        } catch (error) {
          console.error(error);
        }
      },
    ],
  };
});
