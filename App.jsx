import { Provider } from 'react-redux';

import { ThemeProvider } from '@/context/ThemeContext';
import DrawerNavigator from '@/navigation/DrawerNavigator';
import { store } from '@/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <DrawerNavigator />
      </ThemeProvider>
    </Provider>
  );
}
