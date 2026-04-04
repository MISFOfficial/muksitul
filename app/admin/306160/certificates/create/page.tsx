"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useCreateCertificate } from "../DataHub";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Save,
  Award,
  Building2,
  Calendar,
  Clock,
  Star,
  FileText,
  BookOpen,
  Puzzle,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function CreateCertificatePage() {
  const router = useRouter();
  const { mutate: createCertificate, isPending } = useCreateCertificate();

  // --- Core Fields ---
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    duration: "",
    timeTaken: "",
    rating: 5,
    certifiedAt: "",
    issueDate: "",
    description: "",
    fullDescription: "",
  });

  // --- Array Fields ---
  const [challenges, setChallenges] = useState<string[]>([""]);
  const [skillsLearned, setSkillsLearned] = useState<string[]>([""]);

  // --- Image State ---
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a certificate image");
      return;
    }

    const data = new FormData();
    data.append("image", image);

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    data.append(
      "challenges",
      JSON.stringify(challenges.filter((c) => c.trim())),
    );
    data.append(
      "skillsLearned",
      JSON.stringify(skillsLearned.filter((s) => s.trim())),
    );

    createCertificate(data, {
      onSuccess: () => {
        toast.success("Certificate created successfully!");
        router.push("/admin/306160/certificates");
      },
      onError: (error: any) => {
        const msg =
          error.response?.data?.message || "Failed to create certificate";
        Array.isArray(msg)
          ? msg.forEach((m) => toast.error(m))
          : toast.error(msg);
      },
    });
  };

  // --- Styles ---
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
            Add <span className="text-[#0abab5]">Certificate</span>
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-[#0abab5]/50 to-transparent" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Image & Rating */}
          <div className="lg:col-span-1 space-y-6">
            <div className={cardCls}>
              <label className={labelCls}>Certificate Image *</label>
              <div
                className={`relative group aspect-[4/3] rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer
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
                    <Award size={40} className="text-white/10 mb-4" />
                    <p className="text-xs font-bold text-white/30 text-center px-4">
                      Drag & drop certificate, click or paste
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
              <label className={labelCls}>Self-Rating</label>
              <div className="flex items-center justify-center gap-2 pt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, rating: s }))}
                    className={`transition-all duration-300 ${
                      s <= formData.rating
                        ? "text-yellow-500 scale-110"
                        : "text-white/10"
                    }`}
                  >
                    <Star
                      size={32}
                      fill={s <= formData.rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
                How much did you learn?
              </p>
            </div>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className={cardCls}>
              <h3 className={sectionTitle}>
                <Award size={14} /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2 group">
                  <label className={labelCls}>
                    <FileText size={12} /> Certificate Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Full Stack Web Development"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Building2 size={12} /> Provider
                  </label>
                  <input
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    placeholder="e.g. Coursera / Programming Hero"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Clock size={12} /> Duration
                  </label>
                  <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 6 Months"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Clock size={12} /> Time Taken
                  </label>
                  <input
                    name="timeTaken"
                    value={formData.timeTaken}
                    onChange={handleInputChange}
                    placeholder="e.g. 180 Days"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>
                    <Calendar size={12} /> Certified At
                  </label>
                  <input
                    name="certifiedAt"
                    value={formData.certifiedAt}
                    onChange={handleInputChange}
                    placeholder="e.g. December 2024"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2 group">
                  <label className={labelCls}>
                    <Calendar size={12} /> Issue Date (ISO)
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className={inputCls}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={cardCls}>
              <h3 className={sectionTitle}>
                <BookOpen size={14} /> Descriptions
              </h3>
              <div className="space-y-6">
                <div className="space-y-2 group">
                  <label className={labelCls}>Short Summary</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the course content..."
                    rows={2}
                    className={textareaCls}
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className={labelCls}>Full Details</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    placeholder="Detailed program structure and modules..."
                    rows={5}
                    className={textareaCls}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrays Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={cardCls}>
            <div className="flex items-center justify-between">
              <h3 className={sectionTitle}>
                <Puzzle size={14} /> Key Challenges
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setChallenges)}
                className="p-1.5 rounded-lg border primary-border hover:text-[#0abab5] hover:bg-[#0abab5]/10 transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {challenges.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={c}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, setChallenges)
                    }
                    placeholder="Challenge faced..."
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, setChallenges)}
                    className="p-2.5 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={cardCls}>
            <div className="flex items-center justify-between">
              <h3 className={sectionTitle}>
                <Lightbulb size={14} /> Skills Learned
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setSkillsLearned)}
                className="p-1.5 rounded-lg border primary-border hover:text-[#0abab5] hover:bg-[#0abab5]/10 transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {skillsLearned.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={s}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, setSkillsLearned)
                    }
                    placeholder="Skill acquired..."
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, setSkillsLearned)}
                    className="p-2.5 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
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
            disabled={isPending}
            className="flex items-center gap-3 px-10 py-4 bg-[#0abab5] hover:bg-[#0abab5]/90 disabled:opacity-50 text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_10px_30px_rgba(10,186,181,0.2)] active:scale-95 group"
          >
            {isPending ? (
              <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Save
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            )}
            <span>{isPending ? "Adding..." : "Save Certificate"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
