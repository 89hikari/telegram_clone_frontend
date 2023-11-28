import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './index.tsx'
import { store } from './store/index.ts'

import './index.scss'
import 'normalize.css'

ReactDOM
    .createRoot(document.getElementById('root')!)
    .render(
        <Provider store={store}>
            <App />
        </Provider>
    );
