import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Layout public
import Nav        from "./components/Nav";
import Footer     from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// Layout admin
import AdminSidebar from "./components/admin/AdminSidebar";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute     from "./components/admin/AdminRoute";

// Pages publiques
import Home    from "./pages/Home";
import Menu    from "./pages/Menu";
import Contact from "./pages/Contact";

// Pages client
import Login         from "./pages/Login";
import Register      from "./pages/Register";
import Checkout      from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Profile       from "./pages/Profile";

// Pages admin
import AdminLogin     from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders    from "./pages/admin/AdminOrders";
import AdminMenu      from "./pages/admin/AdminMenu";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

const NO_FOOTER = ["/login", "/register", "/checkout"];

function PublicLayout({ children }) {
  const { pathname } = useLocation();
  const hideFooter = NO_FOOTER.includes(pathname) || pathname.startsWith("/order/");
  return (
    <>
      <Nav />
      <CartDrawer />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            {/* ── Site public + interface client ── */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/menu" element={<PublicLayout><Menu /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/login"   element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
            <Route path="/checkout" element={<PublicLayout><ProtectedRoute><Checkout /></ProtectedRoute></PublicLayout>} />
            <Route path="/order/:id" element={<PublicLayout><ProtectedRoute><OrderTracking /></ProtectedRoute></PublicLayout>} />
            <Route path="/profile"  element={<PublicLayout><ProtectedRoute><Profile /></ProtectedRoute></PublicLayout>} />

            {/* ── Interface admin ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminLayout><AdminOrders /></AdminLayout></AdminRoute>} />
            <Route path="/admin/menu"   element={<AdminRoute><AdminLayout><AdminMenu /></AdminLayout></AdminRoute>} />

            <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
