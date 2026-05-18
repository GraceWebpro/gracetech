import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import SectionHeader from "../components/SectionHeader";

const Settings = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // editable fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // fetch admin profile from table
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", user.email)
        .single();

      if (error) {
        console.error(error);
      } else {
        setAdmin(data);
        setName(data.name || "");
        setEmail(data.email || "");
      }

      setLoading(false);
    };

    fetchAdmin();
  }, []);

  const updateProfile = async () => {
    const { error } = await supabase
      .from("admins")
      .update({
        name,
        email,
      })
      .eq("id", admin.id);

    if (error) {
      alert("Update failed, no name field in Admin table.");
      console.error(error);
    } else {
      alert("Profile updated successfully");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div>
      <SectionHeader title="Settings" />

      <div className="max-w-xl space-y-6">

        {/* ADMIN INFO CARD */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Admin Profile</h3>

          {/* NAME */}
          <div className="mb-4">
            <label className="text-sm text-white/60">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black border border-white/10 text-white"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-white/60">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black border border-white/10 text-white"
            />
          </div>

          {/* ROLE (READ ONLY) */}
          <div className="mb-4">
            <label className="text-sm text-white/60">Role</label>
            <input
              value={admin.role}
              disabled
              className="w-full mt-1 p-3 rounded-lg bg-black/50 border border-white/10 text-white/50"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={updateProfile}
            className="w-full bg-primary text-black py-3 rounded-xl font-medium"
          >
            Save Changes
          </button>
        </div>

        {/* SYSTEM INFO */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">System Info</h3>
          <p className="text-white/60 text-sm">
            Supabase CMS Admin Panel v1.0
          </p>
        </div>

      </div>
    </div>
  );
};

export default Settings;