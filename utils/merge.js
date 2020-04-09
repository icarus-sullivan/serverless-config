module.exports = (a, { event, ...rest }) => {
  // If we have a configured event merge it into the larger 'events'
  // array
  if (a.events && event) {
    return {
      events: [...a.events, event],
      ...rest,
    };
  }

  return { ...a, ...rest };
};
