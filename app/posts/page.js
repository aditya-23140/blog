import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, Clock, Eye, MessageSquare } from "lucide-react";
import TagCloud from "@/components/tag-cloud";
import FeaturedPosts from "@/components/featured-posts";
import { getDummyPosts, getDummyCategories } from "@/lib/data";

const Posts = () => {
  const posts = getDummyPosts();
  const categories = getDummyCategories();

  return (
    <main className="mb-10 mx-10">
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Interests</h2>
          <Button variant="ghost" size="sm">
            Reset
          </Button>
        </div>
        <TagCloud categories={categories} />
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-40 mb-4 overflow-hidden rounded-md">
                  <img
                    src={
                      post.coverImage || `/placeholder.svg?height=200&width=400`
                    }
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300">
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm font-medium mb-2">Quick Summary:</p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {post.summary.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> {post.comments}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {post.readTime} min read
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Posts;
