import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../src/Redux/Redux';

import Router from './Router';

import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import media from './styles/media';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  /** Redux Toolkit을 사용했을 때의 store 입니다. */
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
  return (
    /** Provider를 이용하여 store를 전역에서 사용할 수 있도록 설정합니다. */
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme, ...media }}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
