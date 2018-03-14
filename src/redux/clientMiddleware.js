const clientMiddleware = client => ({ dispatch }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch);
    }

    const { types, promise } = action;

    if (!promise) {
      return next(action);
    }

    const [START, SUCCESS, ERROR] = types;

    next({ type: START });

    return promise(client)
      .then(result => next({ type: SUCCESS, result }))
      .catch(error => next({ type: ERROR, error }));
  };
}

export default clientMiddleware;
