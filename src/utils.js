define(['qlik'], function (qlik) {
  'use strict';
  const setVariable = (variableName, value) => {
    const app = qlik.currApp();
    app.variable
      .getByName(variableName)
      .then((_) => {
        app.variable.setStringValue(variableName, value);
      })
      .catch((err) => {
        console.error(`Can't set value ${value} to variable ${variableName}`);
        app.variable
          .create({
            qName: variableName,
            qDefinition: value,
          })
          .then(() => console.log(`Variable ${variableName} created`))
          .catch(() => console.error(`Can't create variable ${variableName}`));
      });
  };
  return setVariable;
});
