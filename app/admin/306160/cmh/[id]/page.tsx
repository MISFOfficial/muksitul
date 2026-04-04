"use client";

export const runtime = "edge";

import React, { useState, useCallback, useEffect } from "react";
import {
  useGetCmsProjectById,
  useUpdateCmsProject,
  useDeleteCmsProject,
} from "../DataHub";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Save,
  Layers,
  Globe,
  Calendar,
  Tag,
  FileText,
  BadgeAlert,
  Link as LinkIcon,
  Palette,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const PLATFORMS = ["WordPress", "Shopify", "Webflow", "Wix", "Squarespace"];

export default function EditCmsProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const { cmsProject, isLoading, isError, refetch } = useGetCmsProjectById(
    id as string,
  );
  const { mutate: updateCmsProject, isPending: isUpdating } =
    useUpdateCmsProject();
  const { mutate: deleteCmsProject, isPending: isDeleting } =
    useDeleteCmsProject();

  // --- Core Fields ---
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    platform: PLATFORMS[0],
    description: "",
    liveUrl: "",
  });

  // --- Badge State ---
  const [badge, setBadge] = useState({
    text: "",
    color: "#0abab5",
  });

  // --- Array Fields ---
  const [tags, setTags] = useState<string[]>([""]);

  // --- Image State ---
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // --- Populate Data ---
  useEffect(() => {
    if (cmsProject) {
      setFormData({
        title: cmsProject.title || "",
        year: cmsProject.year || "",
        platform: cmsProject.platform || PLATFORMS[0],
        description: cmsProject.description || "",
        liveUrl: cmsProject.liveUrl || "",
      });
      setBadge({
        text: cmsProject.badge?.text || "",
        color: cmsProject.badge?.color || "#0abab5",
      });
      setTags(cmsProject.tags?.length ? cmsProject.tags : [""]);
      if (cmsProject.image?.url) {
        setImagePreview(cmsProject.image.url);
      }
    }
  }, [cmsProject]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setFile = useCallback((file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  // --- Global Paste for Image ---
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = Array.from(e.clipboardData?.items ?? []);
      const imageItem = items.find((it) => it.type.startsWith("image/"));
      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) setFile(file);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [setFile]);

  const handleTagChange = (index: number, value: string) => {
    setTags((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addTag = () => setTags((prev) => [...prev, ""]);
  const removeTag = (index: number) =>
    setTags((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (image) {
      data.append("image", image);
    }

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("tags", JSON.stringify(tags.filter((t) => t.trim())));

    if (badge.text && badge.color) {
      data.append("badge", JSON.stringify(badge));
    }

    updateCmsProject(
      { id: id as string, data },
      {
        onSuccess: () => {
          toast.success("CMS Project updated successfully!");
          router.push("/admin/306160/cmh");
        },
        onError: (error: any) => {
          const msg =
            error.response?.data?.message || "Failed to update project";
          Array.isArray(msg)
            ? msg.forEach((m) => toast.error(m))
            : toast.error(msg);
        },
      },
    );
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this CMS project? This action cannot be undone.",
      )
    ) {
      deleteCmsProject(id as string, {
        onSuccess: () => {
          toast.success("CMS Project deleted successfully");
          router.push("/admin/306160/cmh");
        },
        onError: () => toast.error("Failed to delete project"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <RefreshCw size={40} className="animate-spin text-[#0abab5]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-40 space-y-6">
        <h2 className="text-2xl font-bold">Failed to load CMS project</h2>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-[#0abab5] text-black rounded-lg font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  // --- Styles ---
  const inputCls =
    "w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10";
  const selectCls =
    "w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all appearance-none cursor-pointer";
  const textareaCls =
    "w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 resize-none";
  const labelCls =
    "text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2";
  const sectionTitle =
    "text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2";
  const cardCls =
    "primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6";

  return (
    <div className=" animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            Back
          </span>
        </button>
        <div className="flex items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-l from-[#0abab5]/50 to-transparent" />
          <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
            Edit <span className="text-[#0abab5]">CMS Project</span>
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-[#0abab5]/50 to-transparent" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Image & Badge */}
          <div className="lg:col-span-1 space-y-6">
            <div className={cardCls}>
              <label className={labelCls}>Project Thumbnail</label>
              <div
                className={`relative group aspect-video rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer
                  ${
                    isDragging
                      ? "border-[#0abab5] bg-[#0abab5]/10 scale-[1.02]"
                      : imagePreview
                        ? "border-[#0abab5]/30 bg-[#0abab5]/5"
                        : "border-white/10 hover:border-[#0abab5]/30 hover:bg-white/[0.05]"
                  }`}
                onClick={() => document.getElementById("img-upload")?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) setFile(file);
                }}
              >
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <Upload size={24} className="text-[#0abab5]" />
                      <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                        Change Image
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Layers size={40} className="text-white/10 mb-4" />
                    <p className="text-xs font-bold text-white/30 text-center px-4">
                      Drag & drop, click or paste
                    </p>
                  </>
                )}
                <input
                  id="img-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className={cardCls}>
              <h3 className={sectionTitle}>
                <BadgeAlert size={14} /> Badge
              </h3>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className={labelCls}>Badge Text</label>
                  <input
                    value={badge.text}
                    onChange={(e) =>
                      setBadge((p) => ({ ...p, text: e.target.value }))
                    }
                    placeholder="e.g. Featured / Latest"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>
                    <Palette size={12} /> Badge Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={badge.color}
                      onChange={(e) =>
                        setBadge((p) => ({ ...p, color: e.target.value }))
                      }
                      className="w-12 h-12 rounded-xl bg-transparent border primary-border cursor-pointer overflow-hidden p-0"
                    />
                    <input
                      value={badge.color}
                      onChange={(e) =>
                        setBadge((p) => ({ ...p, color: e.target.value }))
                      }
                      className={inputCls}
                      placeholder="#0abab5"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-bold transition-all group"
            >
              <Trash2
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span>{isDeleting ? "Deleting..." : "Delete Project"}</span>
            </button>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className={cardCls}>
              <h3 className={sectionTitle}>
                <FileText size={14} /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2 group">
                  <label className={labelCls}>Project Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. TutorSheba Portfolio"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="space-y-2 group relative">
                  <label className={labelCls}>
                    <Globe size={12} /> Platform
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className={selectCls}
                    required
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p} className="bg-black text-white">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Calendar size={12} /> Year
                  </label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g. 2026"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2 group">
                  <label className={labelCls}>
                    <LinkIcon size={12} /> Live URL
                  </label>
                  <input
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className={inputCls}
                  />
                </div>
                <div className="md:col-span-2 space-y-2 group">
                  <label className={labelCls}>Short Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the project..."
                    rows={4}
                    className={textareaCls}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <div className="flex items-center justify-between">
                <h3 className={sectionTitle}>
                  <Tag size={14} /> Project Tags
                </h3>
                <button
                  type="button"
                  onClick={addTag}
                  className="p-1.5 rounded-lg border primary-border hover:text-[#0abab5] hover:bg-[#0abab5]/10 transition-all font-black text-xs flex items-center gap-2"
                >
                  <Plus size={14} /> Add Tag
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tags.map((tag, i) => (
                  <div key={i} className="flex gap-2 group">
                    <div className="relative flex-1">
                      <Tag
                        size={14}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#0abab5] transition-colors"
                      />
                      <input
                        value={tag}
                        onChange={(e) => handleTagChange(i, e.target.value)}
                        placeholder="Tag name..."
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTag(i)}
                      className="p-3.5 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all border primary-border"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
            disabled={isUpdating}
            className="flex items-center gap-3 px-10 py-4 bg-[#0abab5] hover:bg-[#0abab5]/90 disabled:opacity-50 text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_10px_30px_rgba(10,186,181,0.2)] active:scale-95 group"
          >
            {isUpdating ? (
              <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Save
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            )}
            <span>{isUpdating ? "Updating..." : "Update Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
