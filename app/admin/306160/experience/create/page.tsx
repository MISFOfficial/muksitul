"use client";

import React, { useState } from "react";
import { useExperianceCreate } from "../DataHub";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Save,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Users,
  Globe,
  FileText,
  Target,
  Cpu,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ROLE_OPTIONS } from "../RoleOptions";

export default function CreateExperiencePage() {
  const router = useRouter();
  const { mutate: createExperience, isPending } = useExperianceCreate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    duration: "",
    location: "",
    description: "",
    teamSize: "",
    companyDescription: "",
    companyWebsite: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [technologies, setTechnologies] = useState<string[]>([""]);
  const [achievements, setAchievements] = useState<string[]>([""]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => {
      const newData = [...prev];
      newData[index] = value;
      return newData;
    });
  };

  const addArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => [...prev, ""]);
  };

  const removeArrayItem = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a company logo/image");
      return;
    }

    const data = new FormData();
    data.append("image", image);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    responsibilities
      .filter((r) => r.trim())
      .forEach((r) => data.append("responsibilities", r));
    technologies
      .filter((t) => t.trim())
      .forEach((t) => data.append("technologies", t));
    achievements
      .filter((a) => a.trim())
      .forEach((a) => data.append("achievements", a));

    createExperience(data, {
      onSuccess: () => {
        toast.success("Experience created successfully!");
        router.push("/admin/306160/experience");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to create experience",
        );
      },
    });
  };

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
            New <span className="text-[#0abab5]">Experience</span>
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-[#0abab5]/50 to-transparent" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Image & Quick Stats */}
          <div className="lg:col-span-1 space-y-8">
            <div className="primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  Company Logo
                </label>
                <div
                  className={`relative group aspect-square rounded-2xl border-2 border-dashed transition-all duration-500 overflow-hidden flex flex-col items-center justify-center cursor-pointer
                    ${imagePreview ? "border-[#0abab5]/50 bg-[#0abab5]/5" : "border-white/10 hover:border-[#0abab5]/30 hover:bg-white/[0.05]"}`}
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload
                          size={32}
                          className="text-[#0abab5] animate-bounce"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-full bg-white/5 text-white/20 mb-4 group-hover:text-[#0abab5] group-hover:bg-[#0abab5]/10 transition-all">
                        <Upload size={32} />
                      </div>
                      <p className="text-xs font-bold text-white/30 group-hover:text-white/60">
                        Click to upload
                      </p>
                      <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">
                        SVG, PNG, JPG (Max 2MB)
                      </p>
                    </>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
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
                      onChange={handleInputChange}
                      placeholder="e.g. 15+"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-white text-sm font-medium placeholder:text-white/10"
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
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-white text-sm font-medium placeholder:text-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            <div className="primary-rounded border primary-border bg-white/[0.02] p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                    <Building2 size={12} /> Company Name
                  </label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10"
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                    <Briefcase size={12} /> Job Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all appearance-none cursor-pointer"
                    required
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
                    <Calendar size={12} /> Duration
                  </label>
                  <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. Jan 2023 - Present"
                    className="w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10"
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                    <MapPin size={12} /> Location
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Remote / New York, NY"
                    className="w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10"
                    required
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
                  onChange={handleInputChange}
                  placeholder="Summary of your role and impact..."
                  rows={3}
                  className="w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 resize-none"
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#0abab5] transition-colors flex items-center gap-2">
                  <Target size={12} /> About the Company
                </label>
                <textarea
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  placeholder="Tell us about the company..."
                  rows={3}
                  className="w-full bg-white/[0.03] border primary-border rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all placeholder:text-white/10 resize-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Lists Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Responsibilities */}
          <div className="primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2">
                <FileText size={14} /> Responsibilities
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setResponsibilities)}
                className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {responsibilities.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        e.target.value,
                        setResponsibilities,
                      )
                    }
                    placeholder="Key responsibility..."
                    className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, setResponsibilities)}
                    className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2">
                <Trophy size={14} /> Key Achievements
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setAchievements)}
                className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {achievements.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, setAchievements)
                    }
                    placeholder="Describe a key win..."
                    className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, setAchievements)}
                    className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="md:col-span-2 primary-rounded border primary-border bg-white/[0.02] p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0abab5] flex items-center gap-2">
                <Cpu size={14} /> Technologies Used
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem(setTechnologies)}
                className="p-1.5 rounded-lg border primary-border hover:bg-[#0abab5]/10 hover:text-[#0abab5] transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologies.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, setTechnologies)
                    }
                    placeholder="e.g. React"
                    className="flex-1 bg-white/[0.03] border primary-border rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-[#0abab5]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, setTechnologies)}
                    className="p-2 rounded-xl border border-red-500/20 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
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
            <span>{isPending ? "Creating..." : "Save Experience"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
