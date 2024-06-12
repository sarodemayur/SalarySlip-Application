import { ThemeProvider } from './components/context/ThemeContext';
import Navbar from './components/navbar/Navbar';
import Router from './Router';

export function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Router />
    </ThemeProvider>
  );
}

export default App;
