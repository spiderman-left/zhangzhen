import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import StudentAspect from './pages/StudentAspect';
import ExerciseAspect from './pages/ExerciseAspect';
import RadarChartPage from './pages/RadarChartPage';
import KnowledgeRadar from './pages/KnowledgeRadar';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/student" />} />
          <Route path="student" element={<StudentAspect />} />
          <Route path="exercise" element={<ExerciseAspect />} />
          <Route path="radar" element={<RadarChartPage />} />
          <Route path="knowledge" element={<KnowledgeRadar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
