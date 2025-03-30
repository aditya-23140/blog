// Dummy data for the blog
import { marked } from "marked";

// Dummy categories
export const getDummyCategories = () => [
  { name: "Technology", count: 24, weight: 1.8 },
  { name: "Lifestyle", count: 18, weight: 1.5 },
  { name: "Travel", count: 12, weight: 1.2 },
  { name: "Food", count: 9, weight: 1.0 },
  { name: "Health", count: 15, weight: 1.3 },
  { name: "Finance", count: 7, weight: 0.9 },
  { name: "Art", count: 5, weight: 0.8 },
  { name: "Science", count: 11, weight: 1.1 },
  { name: "Books", count: 8, weight: 0.9 },
  { name: "Movies", count: 6, weight: 0.8 },
  { name: "Music", count: 10, weight: 1.0 },
  { name: "Photography", count: 4, weight: 0.7 },
];

// Dummy posts
export const getDummyPosts = () => [
  {
    id: "1",
    title: "The Future of Web Development: What to Expect in 2025",
    slug: "future-web-development-2025",
    excerpt:
      "Explore the upcoming trends and technologies that will shape web development in the coming years.",
    publishedAt: "March 15, 2025",
    categories: ["Technology", "Web Development"],
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 8,
    views: 1245,
    comments: 32,
    summary: [
      "AI-driven development tools will become mainstream",
      "WebAssembly will enable more complex web applications",
      "Serverless architecture will continue to grow in popularity",
      "AR/VR experiences will be more common on the web",
    ],
    relatedPosts: [
      {
        id: "2",
        title: "Getting Started with WebAssembly",
        slug: "getting-started-webassembly",
        excerpt:
          "A beginner's guide to WebAssembly and how it's changing web performance.",
      },
      {
        id: "3",
        title: "The Rise of Serverless Architecture",
        slug: "rise-serverless-architecture",
        excerpt:
          "Why more developers are moving to serverless and how it impacts development.",
      },
    ],
    popularCategories: [
      "Technology",
      "Web Development",
      "Programming",
      "JavaScript",
    ],
    featuredComments: [
      {
        author: "Sarah Miller",
        content: marked.parse(
          "I'm particularly excited about the advancements in **WebAssembly**. It's going to revolutionize what we can do on the web!"
        ),
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        author: "David Chen",
        content: marked.parse(
          "Great article! I think you missed mentioning the impact of _edge computing_ on web development though."
        ),
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "2",
    title: "10 Hidden Gems in Southeast Asia You Need to Visit",
    slug: "hidden-gems-southeast-asia",
    excerpt:
      "Discover lesser-known but breathtaking destinations across Southeast Asia for your next adventure.",
    publishedAt: "March 10, 2025",
    categories: ["Travel", "Adventure"],
    author: {
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 12,
    views: 2187,
    comments: 45,
    summary: [
      "Explore untouched beaches in the Philippines",
      "Discover ancient temples in Cambodia beyond Angkor Wat",
      "Experience authentic village life in northern Vietnam",
      "Find affordable luxury retreats in lesser-known Thai islands",
    ],
  },
  {
    id: "3",
    title: "How to Build a Sustainable Morning Routine",
    slug: "sustainable-morning-routine",
    excerpt:
      "Create a morning routine that energizes you and sets a positive tone for your entire day.",
    publishedAt: "March 5, 2025",
    categories: ["Lifestyle", "Health"],
    author: {
      name: "Jordan Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 6,
    views: 1876,
    comments: 28,
    summary: [
      "Start with hydration before caffeine",
      "Incorporate mindfulness or meditation for mental clarity",
      "Add light movement to energize your body",
      "Prepare the night before to reduce morning decision fatigue",
    ],
  },
  {
    id: "4",
    title: "Understanding Blockchain Beyond Cryptocurrency",
    slug: "blockchain-beyond-cryptocurrency",
    excerpt:
      "Explore the wide-ranging applications of blockchain technology across various industries.",
    publishedAt: "February 28, 2025",
    categories: ["Technology", "Finance"],
    author: {
      name: "Raj Mehta",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 10,
    views: 1543,
    comments: 19,
    summary: [
      "Blockchain's impact on supply chain transparency",
      "How smart contracts are revolutionizing legal agreements",
      "Blockchain applications in healthcare data management",
      "The future of decentralized identity verification",
    ],
  },
  {
    id: "5",
    title: "Plant-Based Cooking: A Beginner's Guide",
    slug: "plant-based-cooking-beginners-guide",
    excerpt:
      "Simple and delicious ways to incorporate more plant-based meals into your diet.",
    publishedAt: "February 22, 2025",
    categories: ["Food", "Health"],
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 7,
    views: 2034,
    comments: 37,
    summary: [
      "Essential pantry staples for plant-based cooking",
      "Simple protein substitutions for favorite recipes",
      "Quick and nutritious plant-based meal ideas",
      "Tips for balancing nutrition in a plant-based diet",
    ],
  },
  {
    id: "6",
    title: "The Psychology of Productivity: Working Smarter, Not Harder",
    slug: "psychology-productivity",
    excerpt:
      "Understand the mental factors that affect your productivity and learn strategies to optimize your work habits.",
    publishedAt: "February 15, 2025",
    categories: ["Lifestyle", "Psychology"],
    author: {
      name: "Dr. Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 9,
    views: 1765,
    comments: 23,
    summary: [
      "How the brain's reward system affects motivation",
      "The impact of environment on focus and concentration",
      "Techniques to overcome procrastination based on cognitive science",
      "Using time-blocking effectively based on attention spans",
    ],
  },
  {
    id: "7",
    title: "Mastering Mobile Photography: Pro Tips for Smartphone Cameras",
    slug: "mastering-mobile-photography",
    excerpt:
      "Learn how to take stunning photos with just your smartphone using professional techniques.",
    publishedAt: "February 8, 2025",
    categories: ["Photography", "Technology"],
    author: {
      name: "Sofia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 8,
    views: 1892,
    comments: 41,
    summary: [
      "Understanding smartphone camera capabilities and limitations",
      "Composition techniques that transform ordinary scenes",
      "Lighting tips for different environments",
      "Best editing apps and workflows for professional results",
    ],
  },
  {
    id: "8",
    title: "The Art of Mindful Communication in Relationships",
    slug: "mindful-communication-relationships",
    excerpt:
      "Improve your personal and professional relationships through more conscious communication practices.",
    publishedAt: "February 1, 2025",
    categories: ["Lifestyle", "Psychology"],
    author: {
      name: "Dr. Aisha Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 11,
    views: 2156,
    comments: 52,
    summary: [
      "The role of active listening in deepening connections",
      "How to express needs and boundaries clearly",
      "Navigating difficult conversations with empathy",
      "Digital communication pitfalls and how to avoid them",
    ],
  },
  {
    id: "9",
    title: "Sustainable Fashion: Building an Eco-Friendly Wardrobe",
    slug: "sustainable-fashion-eco-friendly-wardrobe",
    excerpt:
      "Practical steps to make your clothing choices more environmentally conscious without sacrificing style.",
    publishedAt: "January 25, 2025",
    categories: ["Lifestyle", "Fashion"],
    author: {
      name: "Zoe Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    readTime: 7,
    views: 1678,
    comments: 29,
    summary: [
      "Understanding fabric sustainability and environmental impact",
      "Building a versatile capsule wardrobe to reduce consumption",
      "Finding ethical and sustainable brands at different price points",
      "Extending clothing lifespan through proper care and repair",
    ],
  },
];

// Get a specific post by slug
export const getDummyPostBySlug = (slug) => {
  const post = getDummyPosts().find((post) => post.slug === slug);

  if (post) {
    // Add related posts if not already present
    if (!post.relatedPosts) {
      const allPosts = getDummyPosts();
      post.relatedPosts = allPosts
        .filter((p) => p.id !== post.id)
        .slice(0, 3)
        .map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
        }));
    }

    // Add popular categories if not already present
    if (!post.popularCategories) {
      post.popularCategories = [
        "Technology",
        "Lifestyle",
        "Travel",
        "Food",
        "Health",
      ];
    }
  }

  return post;
};

// Get comments for a post with markdown compiled
export const getDummyComments = (postId) => [
  {
    id: "comment1",
    author: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: marked.parse(
      "This is such an insightful article! I've been thinking about this topic for a while, and you've articulated many points I hadn't considered before. Looking forward to more content like this."
    ),
    createdAt: "2 days ago",
    likes: 15,
    replies: [
      {
        id: "reply1",
        author: {
          name: "Author",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: marked.parse(
          "Thank you for your kind words, Sarah! I'm glad you found the article valuable. I'll be exploring related topics in upcoming posts."
        ),
        createdAt: "1 day ago",
        likes: 3,
      },
      {
        id: "reply2",
        author: {
          name: "Michael Brown",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: marked.parse(
          "I agree with Sarah. This perspective is refreshing!"
        ),
        createdAt: "1 day ago",
        likes: 2,
      },
    ],
  },
  {
    id: "comment2",
    author: {
      name: "Anonymous User",
      isAnonymous: true,
    },
    content: marked.parse(
      "I have a different take on this. While I appreciate the points made, I think there are some practical challenges that weren't addressed. For example..."
    ),
    createdAt: "3 days ago",
    likes: 7,
    replies: [],
  },
  {
    id: "comment3",
    author: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: marked.parse(
      "Great article! I've shared this with my network. One question though - have you considered how this applies to smaller organizations with limited resources?"
    ),
    createdAt: "4 days ago",
    likes: 9,
    replies: [
      {
        id: "reply3",
        author: {
          name: "Author",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: marked.parse(
          "That's an excellent question, David. For smaller organizations, I would recommend starting with..."
        ),
        createdAt: "3 days ago",
        likes: 4,
      },
    ],
  },
  {
    id: "comment4",
    author: {
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: marked.parse(
      "I've been implementing some of these ideas in my own work, and I can confirm they make a significant difference. One additional tip I'd suggest is..."
    ),
    createdAt: "5 days ago",
    likes: 21,
    replies: [],
  },
];
