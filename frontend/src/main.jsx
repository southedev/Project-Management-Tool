import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster position="top-right" duration={3000} richColors />
    <App />
  </Provider>
)
