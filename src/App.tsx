import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Creativity from "./pages/Creativity";
import About from "./pages/About";
import Authors from "./pages/Authors";
import Contact from "./pages/Contact";
import StyleGuide from "./pages/StyleGuide";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Copyright from "./pages/Copyright";
import DMCA from "./pages/DMCA";
import Disclaimer from "./pages/Disclaimer";
import Accessibility from "./pages/Accessibility";
import UsageGuidelines from "./pages/UsageGuidelines";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminArticles from "./pages/admin/Articles";
import AdminArticleEditor from "./pages/admin/ArticleEditor";
import AdminAuthors from "./pages/admin/Authors";
import AdminCategories from "./pages/admin/Categories";
import AdminMedia from "./pages/admin/Media";
import AdminSettings from "./pages/admin/Settings";
import AdminSubscribers from "./pages/admin/Subscribers";
import AdminContactSubmissions from "./pages/admin/ContactSubmissions";
import AdminAnalytics from "./pages/admin/Analytics";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

// Page tracking wrapper component
const PageTracker = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GoogleAnalytics />
        <BrowserRouter>
          <PageTracker>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/creativity" element={<Creativity />} />
              <Route path="/about" element={<About />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/style-guide" element={<StyleGuide />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/copyright" element={<Copyright />} />
              <Route path="/dmca" element={<DMCA />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/usage-guidelines" element={<UsageGuidelines />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/articles" element={<ProtectedRoute><AdminArticles /></ProtectedRoute>} />
              <Route path="/admin/articles/new" element={<ProtectedRoute><AdminArticleEditor /></ProtectedRoute>} />
              <Route path="/admin/articles/:id" element={<ProtectedRoute><AdminArticleEditor /></ProtectedRoute>} />
              <Route path="/admin/authors" element={<ProtectedRoute><AdminAuthors /></ProtectedRoute>} />
              <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
              <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              <Route path="/admin/subscribers" element={<ProtectedRoute><AdminSubscribers /></ProtectedRoute>} />
              <Route path="/admin/contact-submissions" element={<ProtectedRoute><AdminContactSubmissions /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTracker>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
