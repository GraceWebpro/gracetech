import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { useAuth } from "../../config/AuthProvider";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import { ShoppingBag, Download } from "lucide-react";

const Overview = ({ tab, setTab }) => {
  const { currentUser: user } = useAuth();

  const [stats, setStats] = useState({
    templates: 0,
    courses: 0,
    projects: 0,
    orders: 0,
    downloads: 0,
  });

  const [activities, setActivities] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      const [templates, courses, projects, orders, downloads] = await Promise.all([
        supabase.from("templates").select("*", { count: "exact", head: true }),
        supabase.from("courses").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("payments").select("*").order("created_at", { ascending: false }),
        supabase.from("downloads").select("*").order("created_at", { ascending: false }),
      ]);

      setStats({
        templates: templates.count || 0,
        courses: courses.count || 0,
        projects: projects.count || 0,
        orders: orders.data?.length || 0,
        downloads: downloads.data?.length || 0,
      });

      const activityList = [
        ...(templates.data || []).map(o => ({
          id: o.id,
          type: "purchase",
          label: `Purchased ${o.template_name}`,
          date: o.created_at,
        })),
        ...(courses.data || []).map(d => ({
          id: d.id,
          type: "download",
          label: `Downloaded ${d.template_name}`,
          date: d.created_at,
        })),
        ...(projects.data || []).map(d => ({
          id: d.id,
          type: "download",
          label: `Downloaded ${d.template_name}`,
          date: d.created_at,
        })),
      ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setActivities(activityList);
    };

    fetchData();
  }, []);

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

  return (
    <div>
      <SectionHeader title="Overview" />

      <p className="page-subtitle animate-greeting">
        Welcome back{user?.displayName ? `, ${user?.displayName}` : ""} 👋
      </p>

      <p className="last-login">
        Last login:{" "}
        {user?.lastSignInAt
          ? new Date(user?.lastSignInAt).toLocaleString()
          : "—"}
      </p>

      <div className="soft-divider" />

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard 
          title="Templates" 
          value={stats.templates}                 
          onClick={() => setTab("templates")}
         />
        <StatCard 
          title="Courses" 
          value={stats.courses}
          onClick={() => setTab("courses")}
        />
        <StatCard 
          title="Projects" 
          value={stats.projects} 
          onClick={() => setTab("projects")}
        />
        {/* <StatCard title="Orders" value={stats.orders} />
        <StatCard title="Downloads" value={stats.downloads} /> */}
      </div>

      {/* ================= ACTIVITY ================= */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">

          {activities.length === 0 ? (
            <p className="p-6 text-white/50 text-sm">
              No activity yet.
            </p>
          ) : (
            <ul className="divide-y divide-white/5">

              {activities.map(a => (
                <li
                  key={a.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition"
                >

                  {/* ICON */}
                  <div className={`activity-icon ${a.type}`}>
                    {a.type === "purchase" ? (
                      <ShoppingBag />
                    ) : (
                      <Download />
                    )}
                  </div>

                  {/* TEXT */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {a.label}
                    </p>
                    <p className="text-white/40 text-xs">
                      {a.type === "purchase" ? "Purchase" : "Download"}
                    </p>
                  </div>

                  {/* TIME */}
                  <span className="text-white/40 text-xs whitespace-nowrap">
                    {formatRelativeTime(a.date)}
                  </span>

                </li>
              ))}

            </ul>
          )}

        </div>
      </div>

    </div>
  );
};

export default Overview;