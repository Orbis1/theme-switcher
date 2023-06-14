define(['qlik'], function (qlik) {
  'use strict';
  const setVariable = async (variableName, value) => {
    const app = qlik.currApp();
    try {
      await app.variable.getByName(variableName);
      app.variable.setStringValue(variableName, value);
    } catch (error) {
      console.error(`Can't set value ${value} to variable ${variableName}`);

      app.variable
        .create({
          qName: variableName,
          qDefinition: value,
        })
        .then(() => console.log(`Variable ${variableName} created`))
        .catch(() => console.error(`Can't create variable ${variableName}`));
    }
  };

  const onChanged = async (variableName) => {
    try {
      const app = qlik.currApp();
      const model = await app.variable.getByName(variableName);
      model.on('changed', () => {
        console.log(`Variable ${variableName} was changed`);
      });
      model.on('closed', () => {
        console.log(`Variable ${variableName} was closed`);
      });
      console.log('onChange', model);
    } catch (error) {
      console.error(`Variable ${variableName} not found`);
    }
  };
  return { setVariable, onChanged };
});
