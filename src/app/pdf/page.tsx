import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("pdf", {
    path: "/pdf",
    title: taskPageMetadata.pdf.title,
    description: taskPageMetadata.pdf.description,
  });

export default async function PdfLibraryPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const resolved = (await searchParams) || {};
  return <TaskListPage task="pdf" category={resolved.category} />;
}
