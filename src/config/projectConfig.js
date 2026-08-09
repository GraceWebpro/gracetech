// projectConfig.js
import { Play, PenTool, Monitor } from "lucide-react";

export const PROJECT_TYPES = {
    design: {
      label: "UI/UX",
      icon: PenTool,
      showPlay: false,
    },
    websites: {
      label: "Websites",
      icon: Monitor,
      showPlay: false,
    },
    "ai videos": {
      label: "AI Videos",
      icon: Play,
      showPlay: true,
    },
  };