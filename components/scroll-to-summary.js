"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToSummary({ summary }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-6">
      <div className="flex items-center justify-between py-3">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Quick Summary</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Text-to-Speech
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Bookmark
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">Article Summary:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
