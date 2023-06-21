define(['qlik'], function (qlik) {
  'use strict';
  const setVariable = async (variableName, value) => {
    const app = qlik.currApp();
    try {
      await app.variable.getByName(variableName);
      if (typeof value === 'number') {
        app.variable.setNumValue(variableName, value);
      } else {
        app.variable.setStringValue(variableName, value);
      }
    } catch (error) {
      console.error(
        `Can't set value ${value} to variable ${variableName}`,
        error,
      );

      app.variable
        .create({
          qName: variableName,
          qDefinition: value.toString(),
        })
        .then(() => console.log(`Variable ${variableName} created`))
        .catch(() =>
          console.error(`Can't create variable ${variableName}`, error),
        );
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

  const getCookieValue = (name) => {
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1];

    return value;
  };

  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/sense/app; Secure`;
  };

  const setState = (state) => {
    setCookie('theme.switcher.state', JSON.stringify(state));
  };

  const getState = () => {
    const state = getCookieValue('theme.switcher.state');
    if (state === undefined) return;
    if (state.length > 1) {
      return JSON.parse(state);
    } else {
      return;
    }
  };

  return { setVariable, setState, getState };
});
