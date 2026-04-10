"use client";

import React, { useState } from "react";
import { X, Upload, Send, Loader2, CheckCircle2 } from "lucide-react";
import { sendInquiry } from "@/app/_actions/sendInquiry";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    projectName: "",
    userEmail: "",
    details: "",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = new FormData();
      data.append("projectName", formData.projectName);
      data.append("userEmail", formData.userEmail);
      data.append("details", formData.details);
      if (formData.file) {
        data.append("file", formData.file);
      }

      const result = await sendInquiry(data);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            projectName: "",
            userEmail: "",
            details: "",
            file: null,
          });
        }, 4000);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(
        "An error occurred. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div

            onClick={onClose}
            className="absolute inset-0   backdrop-blur-md"
          />

          {/* Modal Content */}
          <div

            className="relative w-full max-w-2xl  border-2 primary-border primary-rounded overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              {isSuccess ? (
                <div

                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <CheckCircle2 size={80} className="text-green-500 mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Inquiry Sent!
                  </h3>
                  <p className="primary-text4">
                    Thank you for your interest. I'll get back to you shortly to
                    discuss your project.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Let's Build Together
                    </h2>
                    <p className="primary-text4">
                      Share your vision and I'll help you bring it to life.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                      <div

                        className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 primary-rounded text-sm font-medium"
                      >
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {/* Project Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-1">
                          Project Name or Idea
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. E-commerce Revolution"
                          className="w-full primary-text4 border primary-border primary-rounded px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:primary-border transition-colors"
                          value={formData.projectName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              projectName: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* User Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-1">
                          Your Email Address
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="e.g. you@example.com"
                          className="w-full primary-text4 border primary-border primary-rounded px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:primary-border transition-colors"
                          value={formData.userEmail}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              userEmail: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 ml-1">
                        Project Details
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell me more about what you're looking to achieve..."
                        className="w-full primary-text4 border primary-border primary-rounded px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:primary-border transition-colors resize-none"
                        value={formData.details}
                        onChange={(e) =>
                          setFormData({ ...formData, details: e.target.value })
                        }
                      />
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 ml-1">
                        Supporting Documents (Optional)
                      </label>
                      <div className="relative group">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full primary-text4 border border-dashed primary-border group-hover:primary-border primary-rounded px-4 py-6 flex flex-col items-center justify-center gap-2 transition-colors">
                          <Upload className="text-white/30 group-hover:text-white/50 transition-colors" />
                          <span className="text-sm text-white/40 group-hover:primary-text4 transition-colors">
                            {formData.file
                              ? formData.file.name
                              : "Click or drop files here"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full primary-color text-white cursor-pointer font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send
                            size={20}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
