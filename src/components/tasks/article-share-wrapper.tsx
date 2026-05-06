"use client";

import { ShareButton } from "@/components/shared/share-button";

interface ArticleShareWrapperProps {
  url: string;
}

export function ArticleShareWrapper({ url }: ArticleShareWrapperProps) {
  return <ShareButton url={url} />;
}
