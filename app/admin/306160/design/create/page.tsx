"use client";

import React, { useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  RefreshCw,
  X,
  CheckCircle2,
  Loader2,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Layers,
  Calendar,
  Type,
  ExternalLink,
  Figma,
  Smartphone,
  Globe,
  Tag,
  ArrowLeft,
  Save,
} from "lucide-react";
import { useCreateDesign } from "../DataHub";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function CreateDesignPage() {
  const router = useRouter();
  const { mutate: createDesign, isPending: isCreating } = useCreateDesign();

  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear().toString(),
    description: "",
    tags: "",
    tools: "",
    badgeText: "",
    badgeColor: "bg-[#FF5652]",
    behanceUrl: "",
    dribbbleUrl: "",
    figmaUrl: "",
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

  const setCover = useCallback((file: File) => {
    setCoverFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const addGalleryFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setGalleryFiles((prev) => [...prev, ...fileArray]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverFile) return toast.error("Upload a cover image");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("year", formData.year);
    data.append("description", formData.description);

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    data.append("tags", JSON.stringify(tagsArray));

    const toolsArray = formData.tools
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    data.append("tools", JSON.stringify(toolsArray));

    if (formData.badgeText) {
      data.append("badge[text]", formData.badgeText);
      data.append("badge[color]", formData.badgeColor);
    }

    if (formData.behanceUrl) data.append("behanceUrl", formData.behanceUrl);
    if (formData.dribbbleUrl) data.append("dribbbleUrl", formData.dribbbleUrl);
    if (formData.figmaUrl) data.append("figmaUrl", formData.figmaUrl);

    data.append("image", coverFile);
    galleryFiles.forEach((file) => {
      data.append("images", file);
    });

    createDesign(data, {
      onSuccess: () => {
        toast.success("Design created successfully!");
        router.push("/admin/306160/design");
      },
      onError: (err: any) =>
        toast.error(err.response?.data?.message || "Error creating design"),
    });
  };

  const inputCls =
    "w-full bg-white/[0.03] border primary-border primary-rounded px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all placeholder:text-white/10";
  const labelCls =
    "text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2";

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-bold uppercase tracking-widest">
            Back to List
          </span>
        </button>

        <div className="flex items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-l from-[#0abab5]/50 to-transparent" />
          <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
            Curate <span className="text-[#0abab5]">Design</span>
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-[#0abab5]/50 to-transparent" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Visuals */}
          <div className="lg:col-span-5 space-y-10">
            {/* Cover Section */}
            <div className="space-y-4">
              <label className={labelCls}>
                <ImageIcon size={14} /> Master Cover Image
              </label>
              <div
                className={`relative aspect-video primary-rounded border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden cursor-pointer
                  ${isDraggingCover ? "border-[#0abab5] bg-[#0abab5]/10" : coverPreview ? "border-[#0abab5]/50 bg-[#0abab5]/5" : "primary-border hover:border-[#0abab5]/30 hover:bg-white/[0.02]"}`}
                onClick={() => document.getElementById("cover-upload")?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingCover(true);
                }}
                onDragLeave={() => setIsDraggingCover(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingCover(false);
                  const f = e.dataTransfer.files?.[0];
                  if (f) setCover(f);
                }}
              >
                {coverPreview ? (
                  <>
                    <Image
                      src={coverPreview}
                      alt="Cover Preview"
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload
                        size={32}
                        className="text-[#0abab5] animate-bounce"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center p-8">
                    <Upload
                      size={40}
                      className="text-white/10 mx-auto mb-4 group-hover:text-[#0abab5] transition-colors"
                    />
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                      Drop cover artwork
                    </p>
                  </div>
                )}
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setCover(f);
                  }}
                />
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-4">
              <label className={labelCls}>
                <Layers size={14} /> Project Gallery
              </label>
              <div
                className={`relative p-8 primary-rounded border-2 border-dashed transition-all duration-500 cursor-pointer
                  ${isDraggingGallery ? "border-[#0abab5] bg-[#0abab5]/10" : "primary-border hover:border-[#0abab5]/30 hover:bg-white/[0.02]"}`}
                onClick={() =>
                  document.getElementById("gallery-upload")?.click()
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingGallery(true);
                }}
                onDragLeave={() => setIsDraggingGallery(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingGallery(false);
                  addGalleryFiles(e.dataTransfer.files);
                }}
              >
                <div className="text-center">
                  <Plus size={32} className="text-white/10 mx-auto mb-2" />
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                    Add Gallery Views
                  </p>
                </div>
                <input
                  id="gallery-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) addGalleryFiles(e.target.files);
                  }}
                />
              </div>

              {/* Previews Grid */}
              <div className="grid grid-cols-4 gap-4">
                {galleryPreviews.map((src, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square primary-rounded overflow-hidden border primary-border bg-black shadow-lg"
                  >
                    <Image
                      src={src}
                      alt={`Gallery ${i}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeGalleryFile(i);
                      }}
                      className="absolute inset-0 bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-black uppercase tracking-tighter text-[9px]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Data */}
          <div className="lg:col-span-7 space-y-8">
            <div className="primary-rounded border primary-border bg-white/[0.01] p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className={labelCls}>
                    <Type size={14} /> Title
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Project Name"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-3">
                  <label className={labelCls}>
                    <Calendar size={14} /> Creation Year
                  </label>
                  <input
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, year: e.target.value }))
                    }
                    placeholder="2026"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className={labelCls}>
                  <Globe size={14} /> Narrative Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Detail the creative process, technical challenges, and final impact..."
                  rows={6}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className={labelCls}>
                    <Tag size={14} /> Categories
                  </label>
                  <input
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, tags: e.target.value }))
                    }
                    placeholder="UI/UX, Web, App (comma separated)"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-3">
                  <label className={labelCls}>
                    <Smartphone size={14} /> Tech Stack
                  </label>
                  <input
                    value={formData.tools}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, tools: e.target.value }))
                    }
                    placeholder="Figma, Blender, AI (comma separated)"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Links */}
              <div className="space-y-6 pt-6 border-t primary-border">
                <label className={labelCls}>
                  <LinkIcon size={14} /> Visual Footprint
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative group">
                    <ExternalLink
                      size={14}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0abab5] transition-colors"
                    />
                    <input
                      value={formData.behanceUrl}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          behanceUrl: e.target.value,
                        }))
                      }
                      placeholder="Behance"
                      className={`${inputCls} pl-12`}
                    />
                  </div>
                  <div className="relative group">
                    <Globe
                      size={14}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0abab5] transition-colors"
                    />
                    <input
                      value={formData.dribbbleUrl}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          dribbbleUrl: e.target.value,
                        }))
                      }
                      placeholder="Dribbble"
                      className={`${inputCls} pl-12`}
                    />
                  </div>
                  <div className="relative group">
                    <Figma
                      size={14}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0abab5] transition-colors"
                    />
                    <input
                      value={formData.figmaUrl}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, figmaUrl: e.target.value }))
                      }
                      placeholder="Figma"
                      className={`${inputCls} pl-12`}
                    />
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="space-y-6 pt-6 border-t primary-border">
                <label className={labelCls}>
                  <Tag size={14} /> Recognition Badge
                </label>
                <div className="flex flex-col sm:flex-row gap-6">
                  <input
                    value={formData.badgeText}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, badgeText: e.target.value }))
                    }
                    placeholder="e.g. Featured / Best Performance"
                    className={`${inputCls} flex-1`}
                  />
                  <div className="flex gap-3 p-2 bg-black/40 primary-border border primary-rounded shrink-0">
                    {[
                      "bg-[#FF5652]",
                      "bg-[#0abab5]",
                      "bg-[#61DAFB]",
                      "bg-[#F7DF1E]",
                    ].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, badgeColor: c }))
                        }
                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${c} ${formData.badgeColor === c ? "ring-2 ring-white ring-offset-4 ring-offset-black scale-90 shadow-lg" : "opacity-30 hover:opacity-100 hover:scale-105"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex items-center justify-end gap-8 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-xs font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white/40"
              >
                Discard curator
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="flex items-center gap-4 px-12 py-5 bg-[#0abab5] hover:bg-[#0abab5]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-2xl shadow-[#0abab5]/20 active:scale-95 group"
              >
                {isCreating ? (
                  <div className="h-5 w-5 border-3 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <Save
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}
                <span>
                  {isCreating ? "Manifesting..." : "Conclude Creation"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
