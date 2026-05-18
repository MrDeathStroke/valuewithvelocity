import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: StrictMode is intentionally disabled.
// GSAP timelines + React 19 StrictMode's double-mount cause race conditions
// where the first staggered element stays stuck in its "from" state. The
// production build does not double-mount, so this is purely a dev-mode fix.
createRoot(document.getElementById('root')!).render(<App />)
