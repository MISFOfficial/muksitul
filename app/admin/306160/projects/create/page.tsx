"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useCreateProjects } from "@/app/Global/data/useProjects";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Save,
  Link,
  Github,
  FileText,
  Cpu,
  Lightbulb,
  BarChart3,
  Tag,
  Image as ImageIcon,
  Star,
  BookOpen,
  Layers,
  Puzzle,
  Calendar,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ROLE_OPTIONS } from "../../experience/RoleOptions";

export default function CreateProjectPage() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProjects();

  // --- Simple string fields ---
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    description: "",
    fullDescription: "",
    role: "",
    liveUrl: "",
    githubUrl: "",
    fgithubUrl: "",
    bgithubUrl: "",
  });

  // --- Drag state ---
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingExtra, setIsDraggingExtra] = useState(false);

  // --- Single cover image ---
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // --- Multiple images ---
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // --- Array fields ---
  const [tags, setTags] = useState<string[]>([""]);
  const [technologies, setTechnologies] = useState<string[]>([""]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [lessons, setLessons] = useState<string[]>([""]);

  // --- Badge object ---
  const [badge, setBadge] = useState({ text: "", color: "" });

  // --- Architecture object ---
  const [architecture, setArchitecture] = useState({
    frontend: "",
    backend: "",
    database: "",
  });
  const [infrastructure, setInfrastructure] = useState<string[]>([""]);

  // --- ProblemSolution object ---
  const [problemSolution, setProblemSolution] = useState({
    problem: "",
    solution: "",
  });

  // --- Metrics array of objects ---
  const [metrics, setMetrics] = useState<
    { label: string; value: string; description: string }[]
  >([{ label: "", value: "", description: "" }]);

  // --- Handlers ---
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Shared helpers ---
  const setCoverFile = useCallback((file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const addExtraFiles = useCallback((files: File[]) => {
    if (!files.length) return;
    setImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setImagePreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverFile(file);
  };

  const handleMultiImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    addExtraFiles(Array.from(e.target.files ?? []));
  };

  // --- Global paste listener ---
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = Array.from(e.clipboardData?.items ?? []);
      const imageItems = items.filter((it) => it.type.startsWith("image/"));
      if (!imageItems.length) return;
      if (!image) {
        // First paste goes to cover
        const file = imageItems[0].getAsFile();
        if (file) setCoverFile(file);
      } else {
        // Subsequent pastes go to extra images
        const files = imageItems
          .map((it) => it.getAsFile())
          .filter(Boolean) as File[];
        addExtraFiles(files);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [image, setCoverFile, addExtraFiles]);

  // --- Cover image drag handlers ---
  const onCoverDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingCover(true);
  };
  const onCoverDragLeave = () => setIsDraggingCover(false);
  const onCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) setCoverFile(file);
  };

  // --- Extra images drag handlers ---
  const onExtraDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingExtra(true);
  };
  const onExtraDragLeave = () => setIsDraggingExtra(false);
  const onExtraDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingExtra(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    addExtraFiles(files);
  };

  const removeExtraImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setter((prev) => [...prev, ""]);

  const removeArrayItem = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) =>
    setter((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );

  const handleMetricChange = (
    index: number,
    field: "label" | "value" | "description",
    value: string,
  ) => {
    setMetrics((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addMetric = () =>
    setMetrics((prev) => [...prev, { label: "", value: "", description: "" }]);
  const removeMetric = (index: number) =>
    setMetrics((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );

  // --- Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a cover image");
      return;
    }

    // --- Validate DTO-required fields ---
    const validTags = tags.filter((t) => t.trim());
    if (validTags.length === 0) {
      toast.error("At least 1 tag is required");
      return;
    }

    const validTechnologies = technologies.filter((t) => t.trim());
    if (validTechnologies.length === 0) {
      toast.error("At least 1 technology is required");
      return;
    }

    const validFeatures = features.filter((f) => f.trim());
    if (validFeatures.length === 0) {
      toast.error("At least 1 feature is required");
      return;
    }

    const validLessons = lessons.filter((l) => l.trim());
    if (validLessons.length === 0) {
      toast.error("At least 1 lesson is required");
      return;
    }

    if (!architecture.frontend.trim()) {
      toast.error("Architecture frontend is required");
      return;
    }
    if (!architecture.backend.trim()) {
      toast.error("Architecture backend is required");
      return;
    }
    if (!architecture.database.trim()) {
      toast.error("Architecture database is required");
      return;
    }
    const validInfrastructure = infrastructure.filter((i) => i.trim());
    if (validInfrastructure.length === 0) {
      toast.error("At least 1 infrastructure item is required");
      return;
    }

    if (!problemSolution.problem.trim()) {
      toast.error("Problem description is required");
      return;
    }
    if (!problemSolution.solution.trim()) {
      toast.error("Solution description is required");
      return;
    }

    const validMetrics = metrics.filter(
      (m) => m.label.trim() && m.value.trim() && m.description.trim(),
    );
    if (validMetrics.length === 0) {
      toast.error(
        "At least 1 complete metric (label, value, description) is required",
      );
      return;
    }

    const data = new FormData();
    data.append("image", image);
    images.forEach((img) => data.append("images", img));

    // Simple string fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim()) {
        let finalKey = key;
        if (key === "fgithubUrl") finalKey = "frontendGithubUrl";
        if (key === "bgithubUrl") finalKey = "backendGithubUrl";
        data.append(finalKey, value.trim());
      }
    });

    // Arrays — send as JSON strings (backend parses them)
    data.append("tags", JSON.stringify(validTags));
    data.append("technologies", JSON.stringify(validTechnologies));
    data.append("features", JSON.stringify(validFeatures));
    data.append("lessons", JSON.stringify(validLessons));

    // Badge — send as { text, color } directly (no properties wrapper)
    if (badge.text.trim()) {
      data.append(
        "badge",
        JSON.stringify({ text: badge.text, color: badge.color }),
      );
    }

    // Architecture — always send (required by DTO)
    const archData = {
      ...architecture,
      infrastructure: validInfrastructure,
    };
    data.append("architecture", JSON.stringify(archData));

    // Problem & Solution — always send (required by DTO)
    data.append("problemSolution", JSON.stringify(problemSolution));

    // Metrics — always send (required by DTO)
    data.append("metrics", JSON.stringify(validMetrics));

    createProject(data, {
      onSuccess: () => {
        toast.success("Project created successfully!");
        router.push("/admin/306160/projects");
      },
      onError: (error: any) => {
        const errorData = error.response?.data;
        if (errorData?.message) {
          if (Array.isArray(errorData.message)) {
            errorData.message.forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(errorData.message);
          }
        } else {
          toast.error("Failed to create project");
        }
      },
    });
  };

  // --- Reusable input className ---
  const inputCls =
    "w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10";
  const textareaCls =
    "w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 resize-none";
  const labelCls =
    "text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2";
  const sectionTitle =
    "text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2";
  const cardCls =
    "primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6";

  return (
    <div className="  animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-bold uppercase tracking-widest">
            Back to Projects
          </span>
        </button>
        <div className="flex items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-l from-[#0abab5]/50 to-transparent" />
          <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
            New <span className="text-[#0abab5]">Project</span>
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-[#0abab5]/50 to-transparent" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── Section 1: Images + Core Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Images */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cover Image */}
            <div className={cardCls}>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Cover Image <span className="text-[#0abab5]">*</span>
              </label>
              <div
                className={`relative group aspect-square rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer
                  ${
                    isDraggingCover
                      ? "border-[#0abab5] bg-[#0abab5]/10 scale-[1.02]"
                      : imagePreview
                        ? "border-[#0abab5]/50 bg-[#0abab5]/5"
                        : "border-white/10 hover:border-[#0abab5]/30 hover:bg-white/[0.05]"
                  }`}
                onClick={() => document.getElementById("cover-upload")?.click()}
                onDragOver={onCoverDragOver}
                onDragEnter={onCoverDragOver}
                onDragLeave={onCoverDragLeave}
                onDrop={onCoverDrop}
              >
                {isDraggingCover ? (
                  <div className="flex flex-col items-center gap-3 pointer-events-none">
                    <div className="p-4 rounded-full bg-[#0abab5]/20 text-[#0abab5] animate-bounce">
                      <Upload size={32} />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#0abab5]">
                      Drop to set cover
                    </p>
                  </div>
                ) : imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Cover"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <Upload size={28} className="text-[#0abab5]" />
                      <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                        Click, drag or paste
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-full bg-white/5 text-white/20 mb-3 group-hover:text-[#0abab5] group-hover:bg-[#0abab5]/10 transition-all">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-xs font-bold text-white/30 group-hover:text-white/60">
                      Click or drag & drop
                    </p>
                    <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">
                      or paste from clipboard
                    </p>
                  </>
                )}
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImage}
                />
              </div>
            </div>

            {/* Extra Images */}
            <div className={cardCls}>
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  Extra Images
                </label>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("multi-upload")?.click()
                  }
                  className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
              <input
                id="multi-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleMultiImages}
              />
              {/* Drag-and-drop zone for extra images */}
              <div
                className={`rounded-xl border-2 border-dashed transition-all duration-300 ${
                  isDraggingExtra
                    ? "border-[#0abab5] bg-[#0abab5]/10"
                    : "border-white/5 hover:border-white/10"
                }`}
                onDragOver={onExtraDragOver}
                onDragEnter={onExtraDragOver}
                onDragLeave={onExtraDragLeave}
                onDrop={onExtraDrop}
              >
                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {imagePreviews.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-video rounded-xl overflow-hidden group"
                      >
                        <Image
                          src={src}
                          alt={`img-${i}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeExtraImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-lg bg-black/70 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    {/* Inline mini drop target at end of grid */}
                    <div
                      className="aspect-video rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-[#0abab5]/40 hover:bg-[#0abab5]/5 transition-all"
                      onClick={() =>
                        document.getElementById("multi-upload")?.click()
                      }
                    >
                      <Plus size={18} className="text-white/20" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-2 py-8 cursor-pointer"
                    onClick={() =>
                      document.getElementById("multi-upload")?.click()
                    }
                  >
                    {isDraggingExtra ? (
                      <>
                        <Upload
                          size={24}
                          className="text-[#0abab5] animate-bounce"
                        />
                        <p className="text-xs font-black uppercase tracking-widest text-[#0abab5]">
                          Drop images here
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload size={22} className="text-white/20" />
                        <p className="text-xs text-white/20">
                          Drag, click or paste images
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Fields */}
          <div className="lg:col-span-2 space-y-8">
            <div className={cardCls}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2 space-y-2 group">
                  <label className={labelCls}>
                    <FileText size={12} /> Project Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                    className={inputCls}
                    required
                  />
                </div>

                {/* Year */}
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Calendar size={12} /> Year
                  </label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g. 2024"
                    className={inputCls}
                  />
                </div>

                {/* Role */}
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Star size={12} /> Your Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={inputCls}
                    required
                  >
                    <option value="" disabled className="bg-[#0a0a0a]">
                      Select Your Role
                    </option>
                    {ROLE_OPTIONS.map((role) => (
                      <option
                        key={role.value}
                        value={role.value}
                        className="bg-[#121212] text-white"
                      >
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 group">
                <label className={labelCls}>
                  <FileText size={12} /> Short Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief one-liner about the project..."
                  rows={2}
                  className={textareaCls}
                  required
                />
              </div>

              {/* Full Description */}
              <div className="space-y-2 group">
                <label className={labelCls}>
                  <BookOpen size={12} /> Full Description
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the project..."
                  rows={4}
                  className={textareaCls}
                />
              </div>
            </div>

            {/* URLs */}
            <div className={cardCls}>
              <h3 className={sectionTitle}>
                <Globe size={14} /> Links &amp; URLs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Globe size={12} /> Live URL
                  </label>
                  <input
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Github size={12} /> GitHub
                  </label>
                  <input
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Link size={12} /> Frontend GitHub
                  </label>
                  <input
                    name="fgithubUrl"
                    value={formData.fgithubUrl}
                    onChange={handleInputChange}
                    placeholder="Frontend repo URL"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Link size={12} /> Backend GitHub
                  </label>
                  <input
                    name="bgithubUrl"
                    value={formData.bgithubUrl}
                    onChange={handleInputChange}
                    placeholder="Backend repo URL"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Tags, Technologies ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tags */}
          <div className={cardCls}>
            <div className="flex items-center justify-between">
              <h3 className={sectionTitle}>
                <Tag size={14} /> Tags
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setTags)}
                className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {tags.map((tag, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    value={tag}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, setTags)
                    }
                    placeholder="e.g. Full-Stack"
                    className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, setTags)}
                    className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className={cardCls}>
            <div className="flex items-center justify-between">
              <h3 className={sectionTitle}>
                <Cpu size={14} /> Technologies
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setTechnologies)}
                className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {technologies.map((tech, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={tech}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, setTechnologies)
                    }
                    placeholder="e.g. React"
                    className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, setTechnologies)}
                    className="p-2 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 3: Features & Lessons ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Features */}
          <div className={cardCls}>
            <div className="flex items-center justify-between">
              <h3 className={sectionTitle}>
                <Lightbulb size={14} /> Features
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setFeatures)}
                className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    value={feat}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, setFeatures)
                    }
                    placeholder="Key feature..."
                    className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, setFeatures)}
                    className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div className={cardCls}>
            <div className="flex items-center justify-between">
              <h3 className={sectionTitle}>
                <BookOpen size={14} /> Lessons Learned
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setLessons)}
                className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {lessons.map((lesson, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    value={lesson}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, setLessons)
                    }
                    placeholder="What you learned..."
                    className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, setLessons)}
                    className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 4: Badge ── */}
        <div className={cardCls}>
          <h3 className={sectionTitle}>
            <Star size={14} /> Badge
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <label className={labelCls}>
                <Tag size={12} /> Badge Text
              </label>
              <input
                value={badge.text}
                onChange={(e) =>
                  setBadge((b) => ({ ...b, text: e.target.value }))
                }
                placeholder="e.g. Featured"
                className={inputCls}
              />
            </div>
            <div className="space-y-2 group">
              <label className={labelCls}>
                <Tag size={12} /> Badge Color
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    value={badge.color}
                    onChange={(e) =>
                      setBadge((b) => ({ ...b, color: e.target.value }))
                    }
                    placeholder="e.g. #0abab5"
                    className={inputCls}
                  />
                </div>
                <div className="relative w-14 h-auto shrink-0">
                  <input
                    type="color"
                    value={
                      badge.color.startsWith("#") ? badge.color : "#0abab5"
                    }
                    onChange={(e) =>
                      setBadge((b) => ({ ...b, color: e.target.value }))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="w-full h-full rounded-xl border primary-border pointer-events-none"
                    style={{
                      backgroundColor: badge.color.startsWith("#")
                        ? badge.color
                        : "#0abab5",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 5: Architecture ── */}
        <div className={cardCls}>
          <h3 className={sectionTitle}>
            <Layers size={14} /> Architecture
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label className={labelCls}>
                  <Layers size={12} /> Frontend
                </label>
                <input
                  value={architecture.frontend}
                  onChange={(e) =>
                    setArchitecture((a) => ({ ...a, frontend: e.target.value }))
                  }
                  placeholder="e.g. Next.js 14"
                  className={inputCls}
                />
              </div>
              <div className="space-y-2 group">
                <label className={labelCls}>
                  <Cpu size={12} /> Backend
                </label>
                <input
                  value={architecture.backend}
                  onChange={(e) =>
                    setArchitecture((a) => ({ ...a, backend: e.target.value }))
                  }
                  placeholder="e.g. NestJS"
                  className={inputCls}
                />
              </div>
              <div className="space-y-2 group">
                <label className={labelCls}>
                  <Layers size={12} /> Database
                </label>
                <input
                  value={architecture.database}
                  onChange={(e) =>
                    setArchitecture((a) => ({ ...a, database: e.target.value }))
                  }
                  placeholder="e.g. MongoDB"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t primary-border">
              <div className="flex items-center justify-between">
                <label className={labelCls}>
                  <Globe size={12} /> Infrastructure
                </label>
                <button
                  type="button"
                  onClick={() => addArrayItem(setInfrastructure)}
                  className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {infrastructure.map((inf, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={inf}
                      onChange={(e) =>
                        handleArrayChange(i, e.target.value, setInfrastructure)
                      }
                      placeholder="e.g. Vercel"
                      className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(i, setInfrastructure)}
                      className="p-2 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 6: Problem & Solution ── */}
        <div className={cardCls}>
          <h3 className={sectionTitle}>
            <Puzzle size={14} /> Problem &amp; Solution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <label className={labelCls}>
                <FileText size={12} /> The Problem
              </label>
              <textarea
                value={problemSolution.problem}
                onChange={(e) =>
                  setProblemSolution((ps) => ({
                    ...ps,
                    problem: e.target.value,
                  }))
                }
                placeholder="What problem did this solve?"
                rows={4}
                className={textareaCls}
              />
            </div>
            <div className="space-y-2 group">
              <label className={labelCls}>
                <Lightbulb size={12} /> The Solution
              </label>
              <textarea
                value={problemSolution.solution}
                onChange={(e) =>
                  setProblemSolution((ps) => ({
                    ...ps,
                    solution: e.target.value,
                  }))
                }
                placeholder="How did you solve it?"
                rows={4}
                className={textareaCls}
              />
            </div>
          </div>
        </div>

        {/* ── Section 7: Metrics ── */}
        <div className={cardCls}>
          <div className="flex items-center justify-between">
            <h3 className={sectionTitle}>
              <BarChart3 size={14} /> Metrics
            </h3>
            <button
              type="button"
              onClick={addMetric}
              className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 bg-white/[0.02] border primary-border rounded-xl p-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1 flex-1">
                    <input
                      value={m.label}
                      onChange={(e) =>
                        handleMetricChange(i, "label", e.target.value)
                      }
                      placeholder="Label, e.g. Users"
                      className="w-full bg-transparent border-b border-white/10 pb-1 text-[10px] font-black uppercase tracking-widest text-[#0abab5] focus:outline-none focus:border-[#0abab5]/50 placeholder:text-white/10 transition-colors"
                    />
                    <input
                      value={m.value}
                      onChange={(e) =>
                        handleMetricChange(i, "value", e.target.value)
                      }
                      placeholder="Value, e.g. 10k+"
                      className="w-full bg-transparent text-xl font-black text-white focus:outline-none placeholder:text-white/10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMetric(i)}
                    className="p-2 rounded-xl border border-red-500/20 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  value={m.description}
                  onChange={(e) =>
                    handleMetricChange(i, "description", e.target.value)
                  }
                  placeholder="Metric description..."
                  rows={2}
                  className="w-full bg-white/5 border border-white/5 rounded-lg p-2.5 text-[10px] font-medium text-white/50 focus:outline-none focus:border-[#0abab5]/50 transition-all placeholder:text-white/5 resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Submit Bar ── */}
        <div className="flex items-center justify-end gap-6 pt-10 border-t primary-border">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-3 px-10 py-4 bg-[#0abab5] hover:bg-[#0abab5]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_10px_30px_rgba(10,186,181,0.2)] active:scale-95 group"
          >
            {isPending ? (
              <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Save
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            )}
            <span>{isPending ? "Creating..." : "Save Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
