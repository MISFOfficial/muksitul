"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  useGetExperienceById,
  useUpdateExperience,
  useDeleteExperience,
} from "../DataHub";
import {
  ArrowLeft,
  Save,
  Trash2,
  Upload,
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Users,
  Globe,
  Plus,
  X,
  Loader2,
  AlertCircle,
  Edit,
  FileText,
  Target,
  Cpu,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const ROLE_OPTIONS = [
  { value: "FRONTEND_ENGINEER", label: "Frontend Engineer" },
  { value: "FRONTEND_DEVELOPER", label: "Frontend Developer" },
  { value: "BACKEND_ENGINEER", label: "Backend Engineer" },
  { value: "BACKEND_DEVELOPER", label: "Backend Developer" },
  { value: "SOFTWARE_ENGINEER", label: "Software Engineer" },
  { value: "JR_SOFTWARE_ENGINEER", label: "Junior Software Engineer" },
  { value: "SENIOR_SOFTWARE_ENGINEER", label: "Senior Software Engineer" },
];

export default function EditExperiencePage() {
  const { id } = useParams();
  const router = useRouter();
  const { experience, isLoading, isError } = useGetExperienceById(id as string);
  const updateMutation = useUpdateExperience(id as string);
  const deleteMutation = useDeleteExperience();

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({
    role: "",
    company: "",
    duration: "",
    location: "",
    description: "",
    teamSize: "",
    companyWebsite: "",
    companyDescription: "",
    responsibilities: [],
    technologies: [],
    achievements: [],
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync state with fetched data
  useEffect(() => {
    if (experience) {
      setFormData({
        role: experience.role || "",
        company: experience.company || "",
        duration: experience.duration || "",
        location: experience.location || "",
        description: experience.description || "",
        teamSize: experience.teamSize || "",
        companyWebsite: experience.companyWebsite || "",
        companyDescription: experience.companyDescription || "",
        responsibilities: experience.responsibilities || [],
        technologies: experience.technologies || [],
        achievements: experience.achievements || [],
      });
      if (experience.image?.url) {
        setPreviewUrl(experience.image.url);
      }
    }
  }, [experience]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!isEditMode) return;
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, field: string) => {
    if (!isEditMode) return;
    setFormData((prev: any) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: string) => {
    if (!isEditMode) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (index: number, field: string) => {
    if (!isEditMode) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditMode) return;

    const data = new FormData();
    const fields = [
      "role",
      "company",
      "duration",
      "location",
      "description",
      "teamSize",
      "companyWebsite",
      "companyDescription",
    ];

    fields.forEach((field) => {
      data.append(field, formData[field]);
    });

    data.append("responsibilities", JSON.stringify(formData.responsibilities));
    data.append("technologies", JSON.stringify(formData.technologies));
    data.append("achievements", JSON.stringify(formData.achievements));

    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      await updateMutation.mutateAsync(data);
      setIsEditMode(false);
      toast.success("Experience updated successfully!", {
        description: `${formData.role} at ${formData.company} has been synchronized.`,
      });
    } catch (err: any) {
      console.error("Update failed:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update experience";
      toast.error(
        Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        {
          description: "Please fill all the fields",
        },
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id as string);
      toast.success("Entry purged successfully", {
        description: "The experience has been removed from the records.",
      });
      router.push("/admin/306160/experience");
    } catch (err: any) {
      console.error("Delete failed:", err);
      const errorMessage =
        err.response?.data?.message || "Purge encountered an error";
      toast.error(
        Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        {
          description: "The system was unable to delete this entry.",
        },
      );
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 animate-pulse">
        <Loader2 size={48} className="text-[#0abab5] animate-spin mb-4" />
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">
          Loading Experience Data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to load experience</h2>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 border primary-border rounded-xl hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            Back to Experiences
          </span>
        </button>

        <div className="flex items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-l from-[#0abab5]/50 to-transparent" />
          <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
            {isEditMode ? "Modifying" : "Reviewing"}{" "}
            <span className="text-[#0abab5]">Experience</span>
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-[#0abab5]/50 to-transparent" />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-end gap-3 mb-8">
        {!isEditMode ? (
          <button
            onClick={() => setIsEditMode(true)}
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-white/90 transition-all font-black uppercase tracking-[0.15em] text-xs rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <Edit size={16} /> Edit Entry
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setIsEditMode(false);
              }}
              className="flex items-center gap-2 px-6 py-3.5 border primary-border text-white/40 hover:text-white hover:bg-white/5 transition-all font-black uppercase tracking-[0.15em] text-xs rounded-xl active:scale-95"
            >
              Abort
            </button>
            <button
              onClick={handleSubmit}
              disabled={updateMutation.isPending}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#0abab5] text-black hover:bg-[#0abab5]/90 transition-all font-black uppercase tracking-[0.15em] text-xs rounded-xl shadow-[0_0_30px_rgba(10,186,181,0.2)] active:scale-95 disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Commit Changes
            </button>
          </>
        )}

        <button
          onClick={() => setIsDeleting(true)}
          className="p-3.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-95 group"
          title="Delete Permanently"
        >
          <Trash2
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Image & Quick Stats */}
          <div className="lg:col-span-1 space-y-8">
            <div
              className={`primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6 transition-all duration-500 ${isEditMode ? "ring-1 ring-[#0abab5]/30" : ""}`}
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  Company Logo
                </label>
                <div
                  className={`relative group aspect-square rounded-2xl border-2 border-dashed transition-all duration-500 overflow-hidden flex flex-col items-center justify-center
                    ${isEditMode ? "cursor-pointer" : "cursor-default"}
                    ${previewUrl ? "border-[#0abab5]/50 bg-[#0abab5]/5" : "border-white/10"}
                    ${isEditMode && !previewUrl ? "hover:border-[#0abab5]/30 hover:bg-white/[0.05]" : ""}`}
                  onClick={() =>
                    isEditMode &&
                    document.getElementById("image-upload")?.click()
                  }
                >
                  {previewUrl ? (
                    <>
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {isEditMode && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload
                            size={32}
                            className="text-[#0abab5] animate-bounce"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-full bg-white/5 text-white/20 mb-4 group-hover:text-[#0abab5] group-hover:bg-[#0abab5]/10 transition-all">
                        <Upload size={32} />
                      </div>
                      <p className="text-xs font-bold text-white/30 group-hover:text-white/60">
                        {isEditMode ? "Click to upload" : "No image"}
                      </p>
                      <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">
                        SVG, PNG, JPG (Max 2MB)
                      </p>
                    </>
                  )}
                  {isEditMode && (
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t primary-border">
                <div className="flex items-center gap-3 text-white/40 group">
                  <div className="p-2 rounded-lg bg-white/5 text-white/20 group-hover:text-[#0abab5] group-hover:bg-[#0abab5]/10 transition-all">
                    <Users size={18} />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-black uppercase tracking-widest block mb-1">
                      Team Size
                    </label>
                    <input
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      readOnly={!isEditMode}
                      placeholder="e.g. 15+"
                      className={`w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium placeholder:text-white/10 ${isEditMode ? "text-white" : "text-white/40 pointer-events-none"}`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/40 group">
                  <div className="p-2 rounded-lg bg-white/5 text-white/20 group-hover:text-[#0abab5] group-hover:bg-[#0abab5]/10 transition-all">
                    <Globe size={18} />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-black uppercase tracking-widest block mb-1">
                      Company Website
                    </label>
                    <input
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      readOnly={!isEditMode}
                      placeholder="https://..."
                      className={`w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium placeholder:text-white/10 ${isEditMode ? "text-white" : "text-white/40 pointer-events-none"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            <div
              className={`primary-rounded border primary-border bg-white/[0.02] p-8 space-y-8 transition-all duration-500 ${isEditMode ? "ring-1 ring-[#0abab5]/30" : ""}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                    <Briefcase size={12} /> Designation
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={`w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all appearance-none ${isEditMode ? "text-white cursor-pointer" : "text-white/40 cursor-default"}`}
                  >
                    <option value="" disabled className="bg-[#0a0a0a]">
                      Select Role
                    </option>
                    {ROLE_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-[#121212] text-white"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                    <Building2 size={12} /> Company Name
                  </label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    readOnly={!isEditMode}
                    placeholder="Enter company name"
                    className={`w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 ${isEditMode ? "text-white" : "text-white/40"}`}
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                    <Calendar size={12} /> Duration
                  </label>
                  <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    readOnly={!isEditMode}
                    placeholder="e.g. Jan 2023 - Present"
                    className={`w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 ${isEditMode ? "text-white" : "text-[#0abab5]"}`}
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                    <MapPin size={12} /> Location
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    readOnly={!isEditMode}
                    placeholder="e.g. Remote / New York, NY"
                    className={`w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 ${isEditMode ? "text-white" : "text-white/40"}`}
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                  <FileText size={12} /> Brief Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  placeholder="Summary of your role and impact..."
                  rows={3}
                  className={`w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 resize-none ${isEditMode ? "text-white" : "text-white/40"}`}
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                  <Target size={12} /> About the Company
                </label>
                <textarea
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  placeholder="Tell us about the company..."
                  rows={3}
                  className={`w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 resize-none ${isEditMode ? "text-white" : "text-white/40"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Lists Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Responsibilities */}
          <div
            className={`primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6 transition-all duration-500 ${isEditMode ? "ring-1 ring-[#0abab5]/20" : ""}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2">
                <FileText size={14} /> Responsibilities
              </h3>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => addArrayItem("responsibilities")}
                  className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
            <div className="space-y-4">
              {formData.responsibilities.map((item: string, index: number) => (
                <div key={index} className="flex gap-3 group/item">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        e.target.value,
                        "responsibilities",
                      )
                    }
                    readOnly={!isEditMode}
                    placeholder="Key responsibility..."
                    className={`flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all ${isEditMode ? "text-white" : "text-white/40 pointer-events-none"}`}
                  />
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "responsibilities")}
                      className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover/item:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              {formData.responsibilities.length === 0 && (
                <div className="py-8 flex flex-col items-center gap-2 opacity-20">
                  <FileText size={32} />
                  <span className="text-[10px] font-black tracking-widest uppercase">
                    No responsibilities
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div
            className={`primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6 transition-all duration-500 ${isEditMode ? "ring-1 ring-[#0abab5]/20" : ""}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2">
                <Trophy size={14} /> Key Achievements
              </h3>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => addArrayItem("achievements")}
                  className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
            <div className="space-y-4">
              {formData.achievements.map((item: string, index: number) => (
                <div key={index} className="flex gap-3 group/item">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, "achievements")
                    }
                    readOnly={!isEditMode}
                    placeholder="Describe a key win..."
                    className={`flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all ${isEditMode ? "text-white" : "text-white/40 pointer-events-none"}`}
                  />
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "achievements")}
                      className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover/item:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              {formData.achievements.length === 0 && (
                <div className="py-8 flex flex-col items-center gap-2 opacity-20">
                  <Trophy size={32} />
                  <span className="text-[10px] font-black tracking-widest uppercase">
                    No achievements
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div
            className={`md:col-span-2 primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6 transition-all duration-500 ${isEditMode ? "ring-1 ring-[#0abab5]/20" : ""}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2">
                <Cpu size={14} /> Technologies Used
              </h3>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => addArrayItem("technologies")}
                  className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.technologies.map((item: string, index: number) => (
                <div key={index} className="flex gap-2 group/item">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, "technologies")
                    }
                    readOnly={!isEditMode}
                    placeholder="e.g. React"
                    className={`flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all ${isEditMode ? "text-white" : "text-white/40 pointer-events-none"}`}
                  />
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "technologies")}
                      className="p-2 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover/item:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              {formData.technologies.length === 0 && (
                <div className="col-span-full py-8 flex flex-col items-center gap-2 opacity-20">
                  <Cpu size={32} />
                  <span className="text-[10px] font-black tracking-widest uppercase">
                    No technologies
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Actions (only in edit mode) */}
        {isEditMode && (
          <div className="flex items-center justify-end gap-6 pt-10 border-t primary-border animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="text-sm font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center gap-3 px-10 py-4 bg-[#0abab5] hover:bg-[#0abab5]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_10px_30px_rgba(10,186,181,0.2)] active:scale-95 group"
            >
              {updateMutation.isPending ? (
                <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <Save
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              )}
              <span>
                {updateMutation.isPending ? "Committing..." : "Commit Changes"}
              </span>
            </button>
          </div>
        )}
      </form>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80 animate-in fade-in zoom-in duration-500">
          <div className="primary-rounded border border-red-500/20 bg-[#0a0a0a] p-10 max-w-lg w-full shadow-[0_0_100px_rgba(239,68,68,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <div className="flex flex-col items-center text-center gap-6">
              <div className="p-5 bg-red-500/10 rounded-[2rem] border border-red-500/20 animate-bounce">
                <Trash2 size={40} className="text-red-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic">
                  Eradicate <span className="text-red-500">Experience</span>
                </h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Critical Protocol Override
                </p>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Confirm total deletion of{" "}
                <span className="text-white font-black">{formData.role}</span>{" "}
                at{" "}
                <span className="text-white font-black">
                  {formData.company}
                </span>
                . This data will be purged indefinitely.
              </p>
              <div className="flex gap-4 w-full pt-4">
                <button
                  onClick={() => setIsDeleting(false)}
                  className="flex-1 py-4 bg-white/5 border primary-border rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  Terminate Action
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex-1 py-4 bg-red-500 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(239,68,68,0.3)] active:scale-95"
                >
                  {deleteMutation.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Execute Purge"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
