// src/pages/dashboard/Dashboard.js
import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../../../config/supabase";
import { useAuth } from "../../../config/AuthProvider";
import { Navigate, Link } from "react-router-dom";
import { formatNairaFromUSD } from "../../utils/currency";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  Download,
  Menu,
  X,
  Home
} from "lucide-react";
import "./dashboard.css";

const UserDashboard = () => {
  const [tab, setTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  const ordersRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser: user } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // ORDERS (payments table)
        const { data: ordersData } = await supabase
          .from("payments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setOrders(ordersData || []);

        // DOWNLOADS
        const { data: downloadsData } = await supabase
          .from("downloads")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setDownloads(downloadsData || []);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  /* ================= HELPERS ================= */
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const activities = [
    ...orders.map(o => ({
      id: o.id,
      type: "purchase",
      label: `Purchased ${o.template_name}`,
      date: o.created_at,
    })),
    ...downloads.map(d => ({
      id: d.id,
      type: "download",
      label: `Downloaded ${d.template_name}`,
      date: d.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalSpent = orders.reduce((a, b) => a + (b.amount_paid || 0), 0);
  const totalDownloads = downloads.length;

  const downloadFile = (url, name) => {
    if (!url) return alert("File not available.");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ================= AUTH ================= */
  if (!user) return <Navigate to="/login" />;
  if (loading) return <div className="text-white p-10">Loading...</div>;


  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside
      
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0b0b0b] flex flex-col border-r border-white/10 p-6 space-y-4
          transform transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex
        `}
      >

        <div style={{ gap: '90px' }}
          className="flex items-center justify-between md:justify-start mt-12 mb-8">
          <h2 className="text-xl font-bold text-white text-center">GraceTech</h2>
          <button
            className="md:hidden text-white cancel-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <SidebarBtn
          active={tab === "overview"}
          onClick={() => { setTab("overview"); setSidebarOpen(false); }}
          icon={<LayoutDashboard size={18} />}
          label="Overview"
        />
        <SidebarBtn
          active={tab === "orders"}
          onClick={() => { setTab("orders"); setSidebarOpen(false); }}
          icon={<ShoppingBag size={18} />}
          label="Purchases"
        />
        <SidebarBtn
          active={tab === "downloads"}
          onClick={() => { setTab("downloads"); setSidebarOpen(false); }}
          icon={<Download size={18} />}
          label="Downloads"
        />
        <SidebarBtn
          active={tab === "profile"}
          onClick={() => { setTab("profile"); setSidebarOpen(false); }}
          icon={<User size={18} />}
          label="Profile"
        />

        <Link
          to="/"
          className="mt-auto flex items-center gap-2 text-white/60 hover:text-white sidebar-btn"
          onClick={() => setSidebarOpen(false)}
        >
          <Home size={18} /> Back to Home
        </Link>
      </aside>

      {/* ================= MOBILE HAMBURGER ================= */}
      <div className="mobile-header">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <div className="user-chip">
          <div className="avatar">
            {user?.displayName
              ? user.displayName.charAt(0).toUpperCase()
              : user.email.charAt(0).toUpperCase()}
          </div>
          <span className="username">
           {user?.displayName || user.email}
          </span>
        </div>
      </div>



      {/* ================= BACKDROP ================= */}
      {sidebarOpen && (
        <div className="backdrop" onClick={() => setSidebarOpen(false)} />
      )}


      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-main">
        <div className="topbar">
          <div className="user-chip"  onClick={(e) => {
            e.stopPropagation();
            setUserMenuOpen(v => !v);
          }}>
            <div className="avatar">
              {user?.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()}
            </div>
            <span className="username">
              {user?.displayName || user.email}
            </span>
          </div>

          {userMenuOpen && (
            <div className="user-menu" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setTab("profile");
                  setUserMenuOpen(false);
                }}
              >
                Profile
              </button>

              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUserMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}

        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <>
            <h1 className="text-2xl font-semibold mb-8 text-white">Overview</h1>
            <p className="page-subtitle animate-greeting">
              Welcome back{user?.displayName ? `, ${user.displayName}` : ""} 👋
            </p>
            <p className="last-login">
              Last login:{" "}
              {user?.metadata?.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleString()
                : "—"}
            </p>

            <div className="soft-divider" />

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <StatCard
                title="Purchases"
                value={orders.length}
                icon={<ShoppingBag />}
                onClick={() => setTab("orders")}
              />
              <StatCard
                title="Downloads"
                value={totalDownloads}
                icon={<Download />}
                onClick={() => setTab("downloads")}
              />
              <StatCard
                title="Total Spent"
                value={formatNairaFromUSD(totalSpent)}
                icon={<LayoutDashboard />}
                onClick={() => {
                  setTab("orders");         // Switch to Orders tab
                  setTimeout(() => {
                    ordersRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to table
                  }, 100); }}
                               />
            </div>

            {/* Recent Activity */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
    {activities.length === 0 ? (
      <p className="p-6 text-white/50 text-sm">
        No activity yet. Start downloading templates 🚀
      </p>
    ) : (
      <ul className="divide-y divide-white/5">
        {activities.map(a => (
          <li
          style={{ paddingLeft: '20px', paddingRight: '20px' }}
            key={a.id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition"
          >
            {/* Icon */}
            <div
  className={`activity-icon ${
    a.type === "purchase" ? "purchase" : "download"
  }`}
>
  {a.type === "purchase" ? (
    <ShoppingBag />
  ) : (
    <Download />
  )}
</div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {a.label}
              </p>
              <p className="text-white/40 text-xs">
                {a.type === "purchase" ? "Purchase" : "Download"}
              </p>
            </div>

            {/* Date */}
            <span className="text-white/40 text-xs whitespace-nowrap">
              {a.date?.toDate
                ? formatRelativeTime(a.date.toDate())
                : "—"}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
          </div>


          </>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div ref={ordersRef}>
            <h1 className="text-2xl font-semibold mb-6 text-white">Order History</h1>

            {orders.length === 0 ? (
              <p className="text-white/60">You have not purchased any templates yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-sm text-white/80">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="p-4 text-left">Template</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-t border-white/10 hover:bg-white/5">
                        <td className="p-4">{order.templateName}</td>
                        <td className="text-center">{formatNairaFromUSD(order.amountPaid)}</td>
                        <td className="text-center">
                          {order.purchaseDate?.toDate ? order.purchaseDate.toDate().toLocaleDateString() : "N/A"}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => downloadFile(order.fileUrl, order.templateName)}
                            className="bg-white text-black px-3 py-1 rounded-lg hover:bg-white/90"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* DOWNLOADS */}
        {tab === "downloads" && (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-white">My Downloads</h1>

            {downloads.length === 0 ? (
              <p className="text-white/60">You haven’t downloaded any templates yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-sm text-white/80">
                  <thead className="bg-white/5 text-white/60">
                    <tr>
                      <th className="p-4 text-left">Template</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {downloads.map(download => (
                      <tr key={download.id} className="border-t border-white/10 hover:bg-white/5">
                        <td className="p-4">{download.templateName}</td>
                        <td className="text-center">
                          {download.downloadDate?.toDate ? download.downloadDate.toDate().toLocaleDateString() : "N/A"}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => downloadFile(download.downloadUrl, download.templateName)}
                            className="bg-white text-black px-3 py-1 rounded-lg hover:bg-white/90"
                          >
                            Download Again
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div className="max-w-md space-y-6 text-white">
            <h1 className="text-2xl font-semibold">Profile</h1>

            <div className="bg-[#161616] p-6 rounded-2xl space-y-4 border border-white/10">
              <p><span className="text-white/50">Email:</span> {user.email}</p>
              <p><span className="text-white/50">UID:</span> {user.uid}</p>

              <button
                className="w-full bg-white text-black py-2 rounded-xl"
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUserMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

const SidebarBtn = ({ active, icon, label, ...props }) => (
  <button
    {...props}
    className={`sidebar-btn ${active ? "active" : ""}`}
  >
    <span className="sidebar-icon">{icon}</span>
    <span className="sidebar-label">{label}</span>
  </button>
);


const StatCard = ({ title, value, icon, onClick }) => (
  <div className="stat-card" onClick={onClick}>
    <div className="stat-card-text">
      <p className="stat-card-title">{title}</p>
      <h3 className="stat-card-value">{value}</h3>
    </div>

    <div className="stat-card-icon">{icon}</div>
  </div>
);


export default UserDashboard;