"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Image,
  Code,
  Quote,
  Smile,
} from "lucide-react";
import { marked } from "marked";

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your comment...",
  minHeight = "150px",
}) {
  const [activeTab, setActiveTab] = useState("write");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = document.getElementById("markdown-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newValue = beforeText + prefix + selectedText + suffix + afterText;
    onChange(newValue);

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const formatButtons = [
    {
      icon: <Bold className="h-4 w-4" />,
      action: () => insertMarkdown("**", "**"),
      tooltip: "Bold",
    },
    {
      icon: <Italic className="h-4 w-4" />,
      action: () => insertMarkdown("*", "*"),
      tooltip: "Italic",
    },
    {
      icon: <List className="h-4 w-4" />,
      action: () => insertMarkdown("- "),
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      action: () => insertMarkdown("1. "),
      tooltip: "Numbered List",
    },
    {
      icon: <Link2 className="h-4 w-4" />,
      action: () => insertMarkdown("[", "](url)"),
      tooltip: "Link",
    },
    {
      icon: <Image className="h-4 w-4" />,
      action: () => insertMarkdown("![alt text](", ")"),
      tooltip: "Image",
    },
    {
      icon: <Code className="h-4 w-4" />,
      action: () => insertMarkdown("`", "`"),
      tooltip: "Inline Code",
    },
    {
      icon: <Quote className="h-4 w-4" />,
      action: () => insertMarkdown("> "),
      tooltip: "Quote",
    },
  ];

  const emojiPicker = [
    { emoji: "👍", action: () => insertMarkdown("👍") },
    { emoji: "❤️", action: () => insertMarkdown("❤️") },
    { emoji: "😊", action: () => insertMarkdown("😊") },
    { emoji: "🎉", action: () => insertMarkdown("🎉") },
    { emoji: "🤔", action: () => insertMarkdown("🤔") },
    { emoji: "😂", action: () => insertMarkdown("😂") },
    { emoji: "👏", action: () => insertMarkdown("👏") },
    { emoji: "🙏", action: () => insertMarkdown("🙏") },
  ];

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 p-2 border-b">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={button.action}
            title={button.tooltip}
          >
            {button.icon}
          </Button>
        ))}

        <div className="relative ml-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emoji"
          >
            <Smile className="h-4 w-4" />
          </Button>

          {showEmojiPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-background border rounded-md shadow-md z-10 flex flex-wrap gap-2 w-[200px]">
              {emojiPicker.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    item.action();
                    setShowEmojiPicker(false);
                  }}
                >
                  {item.emoji}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="write" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <Textarea
            id="markdown-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ minHeight }}
          />
        </TabsContent>

        <TabsContent
          value="preview"
          className="p-4 m-0 prose-sm dark:prose-invert max-w-none min-h-[150px]"
        >
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: marked.parse(value) }} />
          ) : (
            <p className="text-muted-foreground">Nothing to preview</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
