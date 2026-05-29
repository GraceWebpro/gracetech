import { motion, AnimatePresence } from "framer-motion";
import TemplateForm from "./TemplateForm";
import UploadTemplatePanel from "./UploadTemplatePanel";
import UploadProjectPanel from "./UploadProjectPanel";
import UploadCoursePanel from "./UploadCoursePanel";
import UploadBlogPanel from "./UploadBlogPanel";

const TemplateDrawer = ({ open, onClose, template, mode, refresh, type }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* DRAWER */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-[#111] z-[100] p-6 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <button onClick={onClose}>← Back</button>
{/* 
            <UploadTemplatePanel
              template={template}
              onSuccess={() => {
                refresh();
                onClose();
              }}
            /> */}
            {/* 🔥 SWITCH BASED ON TYPE */}
            {type === "templates" && (
              <UploadTemplatePanel
                template={template}
                mode={mode}
                onClose={onClose}
                onSuccess={() => {
                  refresh();
                  onClose();
                }}
              />
            )}

            {type === "projects" && (
              <UploadProjectPanel
                project={template}
                mode={mode}
                onClose={onClose}
                onSuccess={() => {
                  refresh();
                  onClose();
                }}
              />
            )}

            {type === "courses" && (
              <UploadCoursePanel
                course={template}
                mode={mode}
                onClose={onClose}
                onSuccess={() => {
                  refresh();
                  onClose();
                }}
              />
            )}

            {/* 🧠 BLOG (NEW) */} 
            {type === "blogs" && ( 
              <UploadBlogPanel 
                blog={template} 
                mode={mode} 
                onClose={onClose} 
                onSuccess={() => { 
                  refresh(); 
                  onClose(); 
                }} 
              /> 
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TemplateDrawer;