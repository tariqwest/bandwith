import reducers from '../src/reducers';

test('reducers', () => {
  const state = reducers(undefined, {});
  expect(state).toEqual({
    auth: {
      isFetching: false,
      isAuthenticated: false,
    },
    redirectUrl: '/home' });
});
