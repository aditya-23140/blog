"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ThumbsUp, MessageSquare, Flag, Reply } from "lucide-react";
import MarkdownEditor from "@/components/markdown-editor";
import { marked } from "marked";

export default function CommentSection({ postId, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [expandedComments, setExpandedComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [likedComments, setLikedComments] = useState(new Set());
  const [likedReplies, setLikedReplies] = useState(new Set());

  const toggleExpandComment = (commentId) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleReplyLike = (commentId, replyId) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: likedReplies.has(replyId)
                        ? reply.likes - 1
                        : reply.likes + 1,
                    }
                  : reply
              ),
            }
          : comment
      )
    );

    setLikedReplies((prev) => {
      const newLikedReplies = new Set(prev);
      newLikedReplies.has(replyId)
        ? newLikedReplies.delete(replyId)
        : newLikedReplies.add(replyId);
      return newLikedReplies;
    });
  };

  const handleLike = (commentId) => {
    if (!likedComments.has(commentId)) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      );
      setLikedComments((prev) => new Set(prev).add(commentId));
    } else {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes - 1 }
            : comment
        )
      );
      setLikedComments((prev) => {
        const newLikedComments = new Set(prev);
        newLikedComments.delete(commentId);
        return newLikedComments;
      });
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent("");
  };

  const submitReply = (parentId) => {
    if (!replyContent.trim()) return;

    // Compile markdown to HTML before storing
    const compiledContent = marked.parse(replyContent);

    const newReply = {
      id: `reply-${Date.now()}`,
      author: {
        name: isAnonymous ? "Anonymous User" : "Current User",
        avatar: isAnonymous ? undefined : "/placeholder.svg?height=40&width=40",
        isAnonymous,
      },
      content: compiledContent,
      rawContent: replyContent, // Store the original markdown too if needed
      createdAt: new Date().toLocaleDateString(),
      likes: 0,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyContent("");
  };

  const submitComment = () => {
    if (!newComment.trim()) return;

    // Compile markdown to HTML before storing
    const compiledContent = marked.parse(newComment);

    const comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: isAnonymous ? "Anonymous User" : "Current User",
        avatar: isAnonymous ? undefined : "/placeholder.svg?height=40&width=40",
        isAnonymous,
      },
      content: compiledContent,
      rawContent: newComment, // Store the original markdown too if needed
      createdAt: new Date().toLocaleDateString(),
      likes: 0,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 max-sm:flex-col flex-row max-sm:gap-2.5 max-sm:items-start">
          <h3 className="text-lg font-medium">Add a Comment</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous-mode"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
            <Label htmlFor="anonymous-mode"> Whisper Mode (Anonymous)</Label>
          </div>
        </div>

        <MarkdownEditor
          value={newComment}
          onChange={setNewComment}
          placeholder="Share your thoughts..."
        />

        <div className="flex justify-end mt-4">
          <Button onClick={submitComment}>Post Comment</Button>
        </div>
      </div>

      <Tabs defaultValue="newest" className="mb-6">
        <TabsList>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="discussed">Most Discussed</TabsTrigger>
        </TabsList>

        <TabsContent value="newest" className="space-y-6 mt-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback>
                    {comment.author.isAnonymous
                      ? "AN"
                      : comment.author.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        {comment.createdAt}
                      </span>
                    </div>

                    <Button variant="ghost" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-2 prose-sm dark:prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleLike(comment.id)}
                    >
                      <ThumbsUp
                        className="h-4 w-4"
                        fill={
                          likedComments.has(comment.id)
                            ? "white"
                            : "transparent"
                        }
                      />
                      <span>{comment.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleReply(comment.id)}
                    >
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </Button>

                    {comment.replies && comment.replies.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleExpandComment(comment.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>
                          {expandedComments.includes(comment.id)
                            ? "Hide Replies"
                            : `View Replies (${comment.replies.length})`}
                        </span>
                      </Button>
                    )}
                  </div>

                  {replyingTo === comment.id && (
                    <div className="mt-4 pl-4 border-l-2 border-muted">
                      <MarkdownEditor
                        value={replyContent}
                        onChange={setReplyContent}
                        placeholder="Write a reply..."
                        minHeight="100px"
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => submitReply(comment.id)}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}

                  {expandedComments.includes(comment.id) &&
                    comment.replies &&
                    comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4 pl-4 border-l-2 border-muted">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-background rounded-md p-3"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={reply.author.avatar} />
                                <AvatarFallback>
                                  {reply.author.isAnonymous
                                    ? "AN"
                                    : reply.author.name
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium text-sm">
                                      {reply.author.name}
                                    </span>
                                    <span className="text-muted-foreground text-xs ml-2">
                                      {reply.createdAt}
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-1 prose-sm dark:prose-invert max-w-none">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: reply.content,
                                    }}
                                  />
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-1"
                                    onClick={() =>
                                      handleReplyLike(comment.id, reply.id)
                                    }
                                  >
                                    <ThumbsUp
                                      className="h-4 w-4"
                                      fill={
                                        likedReplies.has(reply.id)
                                          ? "white"
                                          : "transparent"
                                      }
                                    />
                                    <span>{reply.likes}</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="popular" className="space-y-6 mt-6">
          {[...comments]
            .sort((a, b) => b.likes - a.likes)
            .map((comment) => (
              <div key={comment.id} className="bg-muted/30 rounded-lg p-4">
                {/* Same comment structure as above */}
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>
                      {comment.author.isAnonymous
                        ? "AN"
                        : comment.author.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">
                          {comment.author.name}
                        </span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {comment.createdAt}
                        </span>
                      </div>

                      <Button variant="ghost" size="icon">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-2 prose-sm dark:prose-invert max-w-none">
                      <div
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleLike(comment.id)}
                      >
                        <ThumbsUp
                          className="h-4 w-4"
                          fill={
                            likedComments.has(comment.id)
                              ? "white"
                              : "transparent"
                          }
                        />
                        <span>{comment.likes}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleReply(comment.id)}
                      >
                        <Reply className="h-4 w-4" />
                        <span>Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </TabsContent>

        <TabsContent value="discussed" className="space-y-6 mt-6">
          {[...comments]
            .sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0))
            .map((comment) => (
              <div key={comment.id} className="bg-muted/30 rounded-lg p-4">
                {/* Same comment structure as above */}
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>
                      {comment.author.isAnonymous
                        ? "AN"
                        : comment.author.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">
                          {comment.author.name}
                        </span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {comment.createdAt}
                        </span>
                      </div>

                      <Button variant="ghost" size="icon">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-2 prose-sm dark:prose-invert max-w-none">
                      <div
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleLike(comment.id)}
                      >
                        <ThumbsUp
                          className="h-4 w-4"
                          fill={
                            likedComments.has(comment.id)
                              ? "white"
                              : "transparent"
                          }
                        />
                        <span>{comment.likes}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleReply(comment.id)}
                      >
                        <Reply className="h-4 w-4" />
                        <span>Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
