import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeView from "./pages/ResumeView";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JobRecommendations from "./pages/JobRecommendations";
import LiveJobs from "./pages/LiveJobs";
import MainLayout from "./layouts/MainLayout";
import CareerChatbot from "./pages/CareerChatbot";
import ChatbotWidget from "./components/ChatbotWidget";
// import FloatingChatbot from "./components/FloatingChatbot";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED + LAYOUT WRAPPED */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume/upload"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ResumeUpload />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume/view/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ResumeView />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/analyze/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ResumeAnalyzer />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-match/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <JobRecommendations />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/:role"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LiveJobs />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/career-chatbot"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CareerChatbot />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <ChatbotWidget />
      {/* <FloatingChatbot /> */}
    </BrowserRouter>
  );
}
