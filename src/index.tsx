import { createRoot } from 'react-dom/client';
import './style.scss';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
