import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GeneratorPage from './pages/GeneratorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<GeneratorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
