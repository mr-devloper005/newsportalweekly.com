import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText, Eye, Share2, Calendar, Tag } from "lucide-react";

import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArticleShareWrapper } from "@/components/tasks/article-share-wrapper";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("pdf", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
    return post ? await buildPostMetadata("pdf", post) : await buildTaskMetadata("pdf");
  } catch (error) {
    console.warn("PDF metadata lookup failed", error);
    return await buildTaskMetadata("pdf");
  }
}

export default async function PdfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = null;
  try {
    post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
  } catch (error) {
    console.warn("PDF detail lookup failed", error);
  }
  if (!post) {
    notFound();
  }

  const content = post.content && typeof post.content === "object" ? post.content : {};
  const contentAny = content as Record<string, unknown>;
  const fileUrl =
    (typeof contentAny.fileUrl === "string" && contentAny.fileUrl) ||
    (typeof contentAny.pdfUrl === "string" && contentAny.pdfUrl) ||
    "";

  if (!fileUrl || !/^https?:\/\//i.test(fileUrl)) {
    notFound();
  }

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const category =
    typeof contentAny.category === "string" ? contentAny.category : "";
  const related = (await fetchTaskPosts("pdf", 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!category) return true;
      const itemContent = item.content && typeof item.content === "object" ? item.content : {};
      const itemCategory =
        typeof (itemContent as Record<string, unknown>).category === "string"
          ? (itemContent as Record<string, unknown>).category
          : "";
      return itemCategory === category;
    })
    .slice(0, 3);
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PDF Library",
        item: `${baseUrl}/pdf`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/pdf/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NavbarShell />
      <SchemaJsonLd data={breadcrumbData} />
      
      {/* Unique Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Document Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="documents" width="60" height="80" patternUnits="userSpaceOnUse">
                  <rect x="10" y="10" width="40" height="60" fill="none" stroke="white" strokeWidth="2" rx="2"/>
                  <line x1="15" y1="20" x2="45" y2="20" stroke="white" strokeWidth="1"/>
                  <line x1="15" y1="30" x2="45" y2="30" stroke="white" strokeWidth="1"/>
                  <line x1="15" y1="40" x2="35" y2="40" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#documents)" />
            </svg>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative px-8 py-16 lg:px-16">
          <div className="mx-auto max-w-6xl">
            {/* Breadcrumb */}
            <Link
              href="/pdf"
              className="inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
            >
              ← Back to PDF Library
            </Link>
            
            {/* PDF Title Section */}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-20"></div>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-xs font-semibold tracking-wider uppercase">
                    PDF Document
                  </Badge>
                  <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-20"></div>
                </div>
                
                <h1 className="mt-6 text-4xl lg:text-6xl font-serif leading-tight tracking-tight text-white">
                  {post.title}
                </h1>
                
                {/* PDF Metadata */}
                <div className="mt-6 flex flex-wrap items-center gap-6 text-white/90">
                  {category && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white text-blue-600 px-6 py-3 font-semibold hover:bg-blue-50 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
                <ArticleShareWrapper url={`${baseUrl}/pdf/${post.slug}`} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* PDF Viewer Section */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-blue-100">
          {/* Viewer Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">PDF Viewer</h3>
                  <p className="text-sm text-gray-600">Interactive document preview</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview Mode
                </Badge>
              </div>
            </div>
          </div>
          
          {/* PDF iframe */}
          <div className="bg-gray-50 p-4">
            <div className="overflow-hidden rounded-xl bg-white shadow-inner">
              <iframe
                src={viewerUrl}
                title={post.title}
                className="h-[75vh] w-full"
              />
            </div>
          </div>
          
          {/* Viewer Footer */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t border-blue-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Use the viewer controls to navigate through the document
              </p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Full Version
              </a>
            </div>
          </div>
        </div>
        {/* Related PDFs Section */}
        {related.length ? (
          <section className="mt-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Documents</h2>
              <p className="text-gray-600">Explore similar PDFs in our collection</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl("pdf", item.slug)}
                />
              ))}
            </div>
            
            {/* Enhanced Related Links */}
            <div className="mt-12 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-200">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse More</h3>
                <p className="text-gray-600">Discover additional documents and resources</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={`related-${item.id}`}
                    href={buildPostUrl("pdf", item.slug)}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-blue-50 transition-colors border border-blue-100 hover:border-blue-300"
                  >
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">View document →</p>
                    </div>
                  </Link>
                ))}
                <Link
                  href="/pdf"
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-blue-50 transition-colors border border-blue-100 hover:border-blue-300"
                >
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      Browse All PDFs
                    </p>
                    <p className="text-sm text-gray-500">View complete library →</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
