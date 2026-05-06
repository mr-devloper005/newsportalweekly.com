"use client";

import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  url: string;
  className?: string;
}

export function ShareButton({ url, className }: ShareButtonProps) {
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyUrl = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(url);
      setShowCopiedNotification(true);
      setTimeout(() => setShowCopiedNotification(false), 3000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <>
      {/* Share Button */}
      <div className="mt-6">
        <Button
          onClick={handleCopyUrl}
          disabled={isCopying}
          className={`bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 px-6 py-3 flex items-center gap-2 transition-all duration-200 ${className}`}
        >
          {isCopying ? (
            <>
              <Copy className="h-4 w-4 animate-pulse" />
              <span>Copying...</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              <span>Share Article</span>
            </>
          )}
        </Button>
      </div>

      {/* Copied Notification Popup */}
      {showCopiedNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">URL copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  );
}
