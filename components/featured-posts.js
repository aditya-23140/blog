"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Flame,
  Lightbulb,
  VenetianMaskIcon as TheatreMask,
  Heart,
  Clock,
  MessageSquare,
} from "lucide-react";

export default function FeaturedPosts({ posts }) {
  const [expandedPost, setExpandedPost] = useState(null);
  const [reactions, setReactions] = useState({});

  const toggleExpand = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handleReaction = (postId, reaction) => {
    setReactions((prev) => ({
      ...prev,
      [postId]: {
        ...(prev[postId] || {}),
        [reaction]: ((prev[postId] || {})[reaction] || 0) + 1,
      },
    }));
  };

  const reactionIcons = {
    fire: <Flame className="h-4 w-4" />,
    idea: <Lightbulb className="h-4 w-4" />,
    fun: <TheatreMask className="h-4 w-4" />,
    love: <Heart className="h-4 w-4" />,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className={`overflow-hidden transition-all duration-500 ${
            expandedPost === post.id ? "lg:col-span-2 shadow-lg" : ""
          }`}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.coverImage || `/placeholder.svg?height=300&width=600`}
              alt={post.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-xl font-bold text-white mb-2">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <CardContent className="pt-4">
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>

            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {Object.entries(reactionIcons).map(([key, icon]) => (
                  <Button
                    key={key}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 hover:bg-muted"
                    onClick={() => handleReaction(post.id, key)}
                  >
                    {icon}
                    <span className="ml-1 text-xs">
                      {reactions[post.id]?.[key] || 0}
                    </span>
                  </Button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(post.id)}
              >
                {expandedPost === post.id ? "Collapse" : "Expand"}
              </Button>
            </div>

            {expandedPost === post.id && (
              <div className="mt-4 space-y-4 animate-in fade-in-50 duration-300">
                <div className="bg-muted p-3 rounded-md">
                  <p className="font-medium mb-2">Quick Summary:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {post.summary.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                {post.featuredComments && post.featuredComments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Featured Comments:</h4>
                    <div className="space-y-3">
                      {post.featuredComments.map((comment, i) => (
                        <div
                          key={i}
                          className="bg-background border rounded-md p-3"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                              <img
                                src={
                                  comment.avatar ||
                                  `/placeholder.svg?height=32&width=32`
                                }
                                alt={comment.author}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">
                              {comment.author}
                            </span>
                          </div>
                          <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                              __html: comment.content,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button asChild>
                    <Link href={`/posts/${post.slug}`}>Read Full Post</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between text-sm text-muted-foreground border-t py-3">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" /> {post.comments} comments
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
