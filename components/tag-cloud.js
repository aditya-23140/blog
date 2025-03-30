"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function TagCloud({ categories: initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);

  // Simulate evolving categories based on user interaction
  const handleCategoryClick = (clickedCategory) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.name === clickedCategory
          ? {
              ...category,
              count: category.count + 1,
            }
          : category
      )
    );
  };

  // Get font size based on category weight
  const getFontSize = (weight) => {
    const baseSize = 0.875; // rem
    return `${baseSize * weight}rem`;
  };

  // Get opacity based on category weight
  const getOpacity = (weight) => {
    return 0.5 + weight / 4;
  };

  return (
    <div className="p-6 bg-muted/50 rounded-lg">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Badge
              variant="outline"
              className="cursor-pointer transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              style={{
                fontSize: "1rem",
                opacity: getOpacity(category.weight),
                padding: `${0.3 * category.weight}rem ${
                  0.5 * category.weight
                }rem`,
              }}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name} ({category.count})
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
