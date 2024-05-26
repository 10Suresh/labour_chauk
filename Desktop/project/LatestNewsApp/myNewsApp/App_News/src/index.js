import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppProvider from 'context/providers/AppProvider'; // Custom context provider
import store from 'store/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<AppProvider>
			<App />
		</AppProvider>
	</Provider>
);

reportWebVitals();
