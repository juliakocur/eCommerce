import { createRoot } from 'react-dom/client';
import './style.scss';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
