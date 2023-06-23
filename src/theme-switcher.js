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
          const app = qlik.currApp();

          const state = utils.getState();

          if (state === undefined) {
            $scope.state = [
              {
                appId: app.id,
                isSwitched: false,
              },
            ];
          } else {
            $scope.state = [...state];
          }

          $scope.currentState = $scope.state.filter(
            (s) => s.appId === app.id,
          )[0];

          if ($scope.currentState?.appId === undefined) {
            $scope.currentState = {
              appId: app.id,
              isSwitched: false,
            };
          }

          $scope.backendApi.model.Validated.bind(() => {
            //Listens for click events or other data model changes
            $scope.currentState.isSwitched
              ? $scope.switch(true)
              : $scope.switch(false);
          });

          $scope.change = function (isOn) {
            app.theme.getApplied().then((currentTheme) => {
              const themeId = isOn
                ? $scope.layout.theme.on
                : $scope.layout.theme.off;

              if (currentTheme.id === themeId) return;

              $scope.switch(isOn);
            });
          };

          $scope.switch = function (isOn) {
            if (isOn === undefined) return;

            const themeId = isOn
              ? $scope.layout.theme.on
              : $scope.layout.theme.off;

            if ($scope.layout.theme.currentId === themeId) return;

            qlik.theme.apply(themeId).then(() => {
              utils
                .setVariable('themeSwitcher.currentThemeId', themeId)
                .then(() => console.log(`Theme "${themeId}" applied`))
                .catch((err) => console.error(err));

              utils
                .setVariable('themeSwitcher.pos', isOn ? 1 : 2)
                .catch((err) => console.error(err));

              $scope.currentState = {
                ...$scope.currentState,
                isSwitched: isOn,
              };

              const newState = [
                ...$scope.state.filter((s) => s.appId !== app.id),
              ];
              newState.push($scope.currentState);

              utils.setState(newState);
              console.log('setState(newState)', newState);
              console.log('scope', $scope);
            });
          };

          $scope.change($scope.currentState.isSwitched);
        } catch (error) {
          console.error(error);
        }
      },
    ],
  };
});
