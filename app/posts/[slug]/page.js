"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Bookmark,
  Share2,
  VolumeIcon,
  Eye,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/comment-section";
import ScrollToSummary from "@/components/scroll-to-summary";
import { getDummyPostBySlug, getDummyComments } from "@/lib/data";
import { use } from "react";

export default function PostPage({ params }) {
  const { slug } = use(params); // Unwrap the params object

  const post = getDummyPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const comments = getDummyComments(post.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to posts
          </Link>
        </Button>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              <Link href={`/categories/${category.toLowerCase()}`}>
                {category}
              </Link>
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar || `/placeholder.svg?height=40&width=40`}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span>{post.author.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.publishedAt}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>

          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.views} views</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <div className="mb-8 relative">
            <img
              src={post.coverImage || `/placeholder.svg?height=500&width=1000`}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />

            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="secondary" size="icon" className="rounded-full">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <VolumeIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollToSummary summary={post.summary} />

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p>
              {post.content ||
                `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget
                ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam
                nisl nisl eget nisl.
              `}
            </p>

            <h2>Introduction</h2>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
              vel, ullamcorper sit amet ligula. Curabitur aliquet quam id dui
              posuere blandit. Praesent sapien massa, convallis a pellentesque
              nec, egestas non nisi.
            </p>

            <h2>Main Points</h2>
            <p>
              Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui
              posuere blandit. Curabitur arcu erat, accumsan id imperdiet et,
              porttitor at sem. Vivamus magna justo, lacinia eget consectetur
              sed, convallis at tellus.
            </p>

            <ul>
              <li>Nulla quis lorem ut libero malesuada feugiat.</li>
              <li>
                Curabitur non nulla sit amet nisl tempus convallis quis ac
                lectus.
              </li>
              <li>
                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
              </li>
            </ul>

            <h2>Conclusion</h2>
            <p>
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
              Vivamus magna justo, lacinia eget consectetur sed, convallis at
              tellus. Curabitur aliquet quam id dui posuere blandit. Curabitur
              non nulla sit amet nisl tempus convallis quis ac lectus.
            </p>
          </div>

          <Separator className="my-8" />

          <CommentSection postId={post.id} comments={comments} />
        </div>

        <div className="lg:w-1/4">
          <div className="sticky top-24 space-y-8">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Related Posts</h3>
              <div className="space-y-4">
                {post.relatedPosts?.map((relatedPost) => (
                  <div key={relatedPost.id} className="group">
                    <Link href={`/posts/${relatedPost.slug}`} className="block">
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Popular Categories</h3>
              <div className="flex flex-wrap gap-2">
                {post.popularCategories?.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href={`/categories/${category.toLowerCase()}`}>
                      {category}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
