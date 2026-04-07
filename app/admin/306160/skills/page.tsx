"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Zap,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Search,
  X,
  CheckCircle2,
  Loader2,
  Database,
  Layout,
  UserCheck,
  Upload,
  Bell,
} from "lucide-react";
import {
  useGetAllSkills,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
  useSeedSkills,
} from "./DataHub";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "frontend", label: "FRONTEND", icon: Layout, color: "#0abab5" },
  { id: "backend", label: "BACKEND", icon: Database, color: "#61DAFB" },
  { id: "softskill", label: "SOFT SKILLS", icon: UserCheck, color: "#F7DF1E" },
];

export default function SkillsPage() {
  const {
    allSkills,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllSkills();
  const { mutate: createSkill, isPending: isCreating } = useCreateSkill();
  const { mutate: updateSkill, isPending: isUpdating } = useUpdateSkill();
  const { mutate: deleteSkill } = useDeleteSkill();
  const { mutate: seedSkills, isPending: isSeeding } = useSeedSkills();

  const skills = allSkills?.pages.flatMap((page: any) => page) || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
  });

  // --- Image Handling ---
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const setFile = useCallback((file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (!isModalOpen) return;
      const items = Array.from(e.clipboardData?.items ?? []);
      const imageItem = items.find((it) => it.type.startsWith("image/"));
      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) setFile(file);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [isModalOpen, setFile]);

  const handleOpenModal = (skill: any = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({ name: skill.name, category: skill.category });
      setLogoPreview(skill.logo?.url || skill.logo || null);
      setLogoFile(null);
    } else {
      setEditingSkill(null);
      setFormData({ name: "", category: "frontend" });
      setLogoPreview(null);
      setLogoFile(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    if (logoFile) data.append("logo", logoFile);

    if (editingSkill) {
      updateSkill(
        { id: editingSkill._id, data },
        {
          onSuccess: () => {
            toast.success("Skill updated");
            setIsModalOpen(false);
          },
          onError: (err: any) =>
            toast.error(err.response?.data?.message || "Error updating"),
        },
      );
    } else {
      if (!logoFile) return toast.error("Upload a logo");
      createSkill(data, {
        onSuccess: () => {
          toast.success("Skill added");
          setIsModalOpen(false);
        },
        onError: (err: any) =>
          toast.error(err.response?.data?.message || "Error adding"),
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`))
      deleteSkill(id, { onSuccess: () => toast.success("Deleted") });
  };

  const filteredSkills = skills?.filter(
    (s: any) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "all" || s.category === selectedCategory),
  );

  const inputCls =
    "w-full bg-white/[0.03] border primary-border primary-rounded px-5 py-3 text-sm font-medium focus:outline-none focus:border-[#0abab5]/30 transition-all placeholder:text-white/10";
  const labelCls =
    "text-[10px] font-black uppercase tracking-[0.2em] text-white/30";

  return (
    <div className="space-y-6">
      {/* Header - Simple & Compact */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">
            Stack
          </h1>
          <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em] mt-1">
            Management Console
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingSkill(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-3 px-6 py-3 primary-color2 hover:bg-[#0abab5]/90 text-black font-black uppercase tracking-[0.2em] text-[10px] primary-rounded transition-all shadow-lg hover:shadow-[#0abab5]/20"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Action Bar - Tight Layout */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white/[0.02] p-2 primary-rounded border primary-border">
        <div className="relative flex-1 group w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#0abab5] transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="FILTER BY NAME..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none py-3 pl-12 pr-4 focus:outline-none text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder:text-white/5"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 lg:flex-none bg-black border primary-border px-6 py-3 primary-rounded text-[10px] font-black uppercase tracking-[0.2em] text-white/60 focus:outline-none focus:border-[#0abab5]/30 cursor-pointer text-center"
          >
            <option value="all">ALL CATEGORIES</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => refetch()}
            className="p-3 border primary-border primary-rounded text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Skills "Row" List - Horizontal Table-like Content */}
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 primary-rounded border primary-border animate-pulse bg-white/[0.01]"
              />
            ))
          : filteredSkills?.map((skill: any) => (
              <motion.div
                layout
                key={skill._id}
                className="group flex flex-col sm:flex-row items-center gap-6 bg-[#0a0a0a]/40 border primary-border primary-rounded p-3 px-6 hover:bg-[#0f0f0f] hover:border-[#0abab5]/20 transition-all duration-300"
              >
                {/* Logo - Compact */}
                <div className="w-10 h-10 primary-rounded bg-black border primary-border flex items-center justify-center p-2 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={skill.logo?.url || skill.logo}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info - Inline side-by-side */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase primary-text transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 opacity-40">
                    {(() => {
                      const cat = CATEGORIES.find(
                        (c) => c.id === skill.category,
                      );
                      const Icon = cat?.icon || Zap;
                      return (
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em]">
                          <Icon size={12} className="stroke-[2.5]" />
                          {cat?.label}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Actions - Horizontal on the right */}
                <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l primary-border pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleOpenModal(skill)}
                    className="w-9 h-9 flex items-center justify-center primary-rounded border primary-border text-white/20 text-hover hover:border-[#0abab5]/30 transition-all bg-black/20"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id, skill.name)}
                    className="w-9 h-9 flex items-center justify-center primary-rounded border primary-border text-white/20 hover:text-red-500 hover:border-red-500/30 transition-all bg-black/20"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-3 px-10 py-4 border primary-border hover:border-[#0abab5] primary-text primary-rounded font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(10,186,181,0.15)] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isFetchingNextPage ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More Skills</span>
                <Plus
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </>
            )}
          </button>
        </div>
      )}

      {/* Modal - Compact & Clean */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border primary-border primary-rounded overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b primary-border bg-white/[0.01] flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif text-white uppercase tracking-widest">
                    {editingSkill ? "Update" : "Define"}{" "}
                    <span className="text-[#0abab5]">Skill</span>
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center primary-rounded border primary-border hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className={labelCls}>Identity</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. Next.js"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-3">
                  <label className={labelCls}>Symbol / Logo</label>
                  <div
                    className={`relative aspect-square max-w-[120px] mx-auto primary-rounded border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center ${isDragging ? "border-[#0abab5] bg-[#0abab5]/10" : logoPreview ? "border-[#0abab5]/20 bg-white/[0.01]" : "primary-border hover:bg-white/[0.02]"}`}
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) setFile(f);
                    }}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <>
                        <Upload size={24} className="text-white/5 mb-2" />
                        <p className="text-[8px] font-black text-white/20 uppercase">
                          Drag or Paste
                        </p>
                      </>
                    )}
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className={labelCls}>Field</label>
                  <div className="grid grid-cols-3 gap-3">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, category: c.id }))
                        }
                        className={`flex flex-col items-center gap-2 p-4 primary-rounded border transition-all ${formData.category === c.id ? "bg-[#0abab5]/10 border-[#0abab5] primary-text" : "bg-white/[0.01] primary-border text-white/20"}`}
                      >
                        <c.icon size={16} />
                        <span className="text-[8px] font-black tracking-widest">
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 border primary-border text-white/20 hover:text-white primary-rounded font-black uppercase tracking-widest text-[9px]"
                  >
                    QUIT
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="flex-1 py-4 primary-color2 hover:bg-[#0abab5]/90 text-black primary-rounded font-black uppercase tracking-widest text-[9px] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCreating || isUpdating ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} />
                    )}
                    <span>{editingSkill ? "REPLACE" : "COMMIT"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
