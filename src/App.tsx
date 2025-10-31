import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/styles/google-translate.css";
import "@/styles/mobile-responsive.css";
import "@/styles/animations.css";
import "@/styles/design-system.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import PoliticsPage from "./pages/PoliticsPage";
import HealthPage from "./pages/HealthPage";
import SportsPage from "./pages/SportsPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import EconomicsPage from "./pages/EconomicsPage";
import AuctionPage from "./pages/AuctionPage";
import AllNewsPage from "./pages/AllNewsPage";
import AllAdvertisementsPage from "./pages/AllAdvertisementsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import AdvertisementDetailPage from "./pages/AdvertisementDetailPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import { AuthProvider } from "@/context/AuthContext";
import AdminLogin from "@/admin/Login";
import Dashboard from "@/admin/Dashboard";
import ProtectedRoute from "@/admin/ProtectedRoute";
import ArticlesList from "@/admin/articles/ArticlesList";
import ArticleForm from "@/admin/articles/ArticleForm";
import AdsList from "@/admin/ads/AdsList";
import AdForm from "@/admin/ads/AdForm";
import AdvertisementsList from "@/admin/advertisements/AdvertisementsList";
import AdvertisementForm from "@/admin/advertisements/AdvertisementForm";
import AuctionsList from "@/admin/auctions/AuctionsList";
import AuctionForm from "@/admin/auctions/AuctionForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Layout>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/politics" element={<PoliticsPage />} />
            <Route path="/economics" element={<EconomicsPage />} />
            <Route path="/auctions" element={<AuctionPage />} />
            <Route path="/auction/:id" element={<AuctionDetailPage />} />
            <Route path="/all-news" element={<AllNewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/advertisements" element={<AllAdvertisementsPage />} />
            <Route path="/advertisement/:id" element={<AdvertisementDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={
                <ProtectedRoute>
                  <ArticlesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/new"
              element={
                <ProtectedRoute>
                  <ArticleForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/edit/:id"
              element={
                <ProtectedRoute>
                  <ArticleForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/ads"
              element={
                <ProtectedRoute>
                  <AdsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/ads/new"
              element={
                <ProtectedRoute>
                  <AdForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/ads/edit/:id"
              element={
                <ProtectedRoute>
                  <AdForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/advertisements"
              element={
                <ProtectedRoute>
                  <AdvertisementsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/advertisements/new"
              element={
                <ProtectedRoute>
                  <AdvertisementForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/advertisements/edit/:id"
              element={
                <ProtectedRoute>
                  <AdvertisementForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/auctions"
              element={
                <ProtectedRoute>
                  <AuctionsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/auctions/new"
              element={
                <ProtectedRoute>
                  <AuctionForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/auctions/edit/:id"
              element={
                <ProtectedRoute>
                  <AuctionForm />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
