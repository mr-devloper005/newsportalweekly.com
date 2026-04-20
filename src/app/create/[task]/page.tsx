"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CloudUpload,
  Eye,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Sparkles,
  Tag,
} from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Write a new article",
    description:
      "Draft a story for the publication. Write thoughtfully — we'd rather one good piece than ten quick ones.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true, placeholder: "A clear, specific headline" },
      { key: "summary", label: "Short summary", type: "textarea", required: true, placeholder: "Two or three sentences for the article card and previews." },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true, placeholder: "Write your article. You can paste HTML for formatting." },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images", placeholder: "Paste image URLs separated by commas" },
      { key: "tags", label: "Tags", type: "tags", placeholder: "climate, policy, weekly-report" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Add a PDF to the library",
    description:
      "Upload research, briefings, or reference material for readers to download.",
    fields: [
      { key: "title", label: "Document title", type: "text", required: true, placeholder: "What this document is about" },
      { key: "summary", label: "Short summary", type: "textarea", required: true, placeholder: "A line or two for the library card." },
      { key: "description", label: "Description", type: "textarea", placeholder: "Optional: longer description, methodology, or sourcing notes." },
      { key: "fileUrl", label: "PDF file", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images", placeholder: "Optional: cover image URL" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

const TASK_HERO: Partial<
  Record<
    TaskKey,
    {
      eyebrow: string;
      headline: string;
      Icon: typeof BookOpen;
      tips: string[];
    }
  >
> = {
  article: {
    eyebrow: "Write an article",
    headline: "A new story for the publication.",
    Icon: BookOpen,
    tips: [
      "Lead with the most important fact, not the setup.",
      "Cite sources and link to primary documents where possible.",
      "Aim for 800–2,000 words. Cut anything that doesn't earn its place.",
    ],
  },
  pdf: {
    eyebrow: "Upload to PDF library",
    headline: "Share original research and briefings.",
    Icon: FileText,
    tips: [
      "Use a clear filename — readers see it on download.",
      "Add a one-line summary so readers know what's inside.",
      "Pick the closest matching category to help discovery.",
    ],
  },
};

function isLongField(key: string) {
  return key === "description" || key === "summary";
}

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];
  const hero = TASK_HERO[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-white text-[#0c1726]">
        <NavbarShell />
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d3ee5d] text-[#0c1726]">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-[-0.03em]">Task not available</h1>
          <p className="mt-2 text-sm text-slate-600">
            This task isn't enabled for the current site. Try heading back home.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538]"
          >
            Back home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const requiredFields = formConfig.fields.filter((f) => f.required);
  const completedRequired = requiredFields.filter((f) => values[f.key]?.trim()).length;
  const completion = requiredFields.length
    ? Math.round((completedRequired / requiredFields.length) * 100)
    : 100;

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    setSubmitting(true);

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const HeroIcon = hero?.Icon || Sparkles;

  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <Link href={taskConfig.route} className="hover:text-[#0c1726]">{taskConfig.label}</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Create</span>
        </nav>

        <section className="overflow-hidden rounded-3xl bg-[#0c1726] p-10 text-white lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                <HeroIcon className="h-3 w-3" />
                {hero?.eyebrow || "Create new content"}
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                {hero?.headline || formConfig.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
                {formConfig.description}
              </p>
              {!user ? (
                <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#d3ee5d]/30 bg-[#d3ee5d]/10 px-4 py-3 text-sm text-[#d3ee5d]">
                  <Sparkles className="h-4 w-4" />
                  Sign in first — we save your draft to your browser.
                  <Link href="/login" className="ml-auto rounded-full bg-[#d3ee5d] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0c1726] hover:bg-[#c2dd4d]">
                    Sign in
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">Draft progress</span>
                <span className="text-2xl font-bold text-[#d3ee5d]">{completion}%</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#d3ee5d] transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-white/70">
                {completedRequired} of {requiredFields.length} required fields complete.
              </p>
              <div className="mt-5 grid gap-2">
                {requiredFields.slice(0, 4).map((f) => {
                  const done = !!values[f.key]?.trim();
                  return (
                    <div key={f.key} className="flex items-center gap-2 text-xs text-white/80">
                      <CheckCircle2 className={done ? "h-4 w-4 text-[#d3ee5d]" : "h-4 w-4 text-white/30"} />
                      <span className={done ? "" : "text-white/60"}>{f.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                {taskConfig.label}
              </p>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#d3ee5d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                Local only
              </span>
            </div>

            <div className="mt-7 grid gap-6">
              {formConfig.fields.map((field) => {
                const wide = isLongField(field.key);
                return (
                  <div key={field.key} className={`grid gap-2 ${wide ? "" : ""}`}>
                    <label className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
                        {field.label}
                        {field.required ? <span className="ml-1 text-[#0c1726]">*</span> : null}
                      </span>
                      {field.type === "tags" || field.type === "images" || field.type === "highlights" ? (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          comma-separated
                        </span>
                      ) : null}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        rows={field.key === "description" ? 12 : 4}
                        placeholder={field.placeholder}
                        value={values[field.key] || ""}
                        onChange={(event) => updateValue(field.key, event.target.value)}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#0c1726]"
                      />
                    ) : field.type === "category" ? (
                      <div className="relative">
                        <Tag className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <select
                          value={values[field.key] || ""}
                          onChange={(event) => updateValue(field.key, event.target.value)}
                          className="h-12 w-full appearance-none rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#0c1726]"
                        >
                          <option value="">Select category</option>
                          {CATEGORY_OPTIONS.map((option) => (
                            <option key={option.slug} value={option.slug}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : field.type === "file" ? (
                      <div className="grid gap-3">
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-[#0c1726] hover:bg-white">
                          {uploadingPdf ? (
                            <Loader2 className="h-7 w-7 animate-spin text-[#0c1726]" />
                          ) : pdfFileName ? (
                            <CheckCircle2 className="h-7 w-7 text-[#0c1726]" />
                          ) : (
                            <CloudUpload className="h-7 w-7 text-[#0c1726]" />
                          )}
                          <p className="text-sm font-semibold text-[#0c1726]">
                            {uploadingPdf
                              ? "Uploading…"
                              : pdfFileName
                                ? pdfFileName
                                : "Click to upload a PDF"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {pdfFileName ? "Replace by selecting another file" : "PDF up to 10MB · stored in your browser"}
                          </p>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              if (file.type !== "application/pdf") {
                                toast({
                                  title: "Invalid file",
                                  description: "Please upload a PDF file.",
                                });
                                return;
                              }
                              const reader = new FileReader();
                              setUploadingPdf(true);
                              reader.onload = () => {
                                const result = typeof reader.result === "string" ? reader.result : "";
                                updateValue(field.key, result);
                                setPdfFileName(file.name);
                                setUploadingPdf(false);
                                toast({
                                  title: "PDF uploaded",
                                  description: "File is stored locally.",
                                });
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Or paste a PDF URL"
                            value={values[field.key]?.startsWith("data:") ? "" : values[field.key] || ""}
                            onChange={(event) => {
                              setPdfFileName(null);
                              updateValue(field.key, event.target.value);
                            }}
                            className="h-12 w-full rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#0c1726]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        {field.type === "images" ? (
                          <ImageIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        ) : null}
                        <input
                          type={field.type === "number" ? "number" : "text"}
                          placeholder={
                            field.placeholder ||
                            (field.type === "images" || field.type === "tags" || field.type === "highlights"
                              ? "Separate values with commas"
                              : "")
                          }
                          value={values[field.key] || ""}
                          onChange={(event) => updateValue(field.key, event.target.value)}
                          className={`h-12 w-full rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#0c1726] ${field.type === "images" ? "pl-11" : ""}`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={taskConfig.route}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-600 hover:text-[#0c1726]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {taskConfig.label}
              </Link>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={taskConfig.route}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-[#0c1726] px-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0c1726] hover:bg-[#0c1726] hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                  Preview library
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitting(true);
                    handleSubmit();
                    setTimeout(() => setSubmitting(false), 600);
                  }}
                  disabled={submitting}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0c1726] px-6 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538] disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Publish locally
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            {hero ? (
              <div className="rounded-3xl bg-[#d3ee5d] p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#0c1726]" />
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0c1726]">Editorial tips</p>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#0c1726]">
                  {hero.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Live preview</p>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  {values.category || "category"} · {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short" }).toUpperCase()}
                </p>
                <h3 className="mt-2 text-base font-bold uppercase leading-snug tracking-tight text-[#0c1726]">
                  {values.title || values.brandName || "Your headline appears here"}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-6 text-slate-600">
                  {values.summary || "Write a short summary so readers know what's inside."}
                </p>
                {pdfFileName ? (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#d3ee5d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                    <FileText className="h-3 w-3" />
                    {pdfFileName}
                  </div>
                ) : null}
              </div>
              <p className="mt-4 text-[11px] leading-6 text-slate-500">
                Posts you create here are saved to your browser only. They'll appear in the local archive at
                {" "}
                <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">/local/{taskKey}</code>.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
