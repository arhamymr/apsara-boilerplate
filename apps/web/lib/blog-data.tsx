"use client"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  author: {
    name: string
    role: string
    avatar: string
  }
  publishedAt: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    slug: "building-accessible-ui-components",
    title: "Building Accessible UI Components: A Comprehensive Guide",
    excerpt: "Learn how to create inclusive user interfaces that work for everyone, regardless of ability or device.",
    content: `
# Building Accessible UI Components

Accessibility isn't just a feature—it's a fundamental aspect of good design. When we build accessible interfaces, we create better experiences for everyone.

## Why Accessibility Matters

Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites effectively. But it goes beyond that—accessible design often leads to better usability for all users.

### Key Principles

1. **Perceivable**: Information must be presentable in ways users can perceive
2. **Operable**: Interface components must be operable by all users
3. **Understandable**: Content must be understandable
4. **Robust**: Content must work with current and future technologies

## Implementing Accessible Components

Here's an example of an accessible button component:

\`\`\`tsx
function AccessibleButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className="px-4 py-2 rounded-md focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </button>
  )
}
\`\`\`

### Focus Management

Proper focus management is crucial for keyboard navigation. Always ensure that:

- Focus indicators are clearly visible
- Focus order follows a logical sequence
- Modal dialogs trap focus appropriately

## Testing for Accessibility

Use these tools to test your components:

- **axe DevTools**: Browser extension for accessibility testing
- **NVDA/VoiceOver**: Screen readers for real-world testing
- **Lighthouse**: Built-in Chrome accessibility audits

## Conclusion

Building accessible components requires intentionality, but the result is a better experience for all users. Start with semantic HTML, add proper ARIA attributes when needed, and always test with real assistive technologies.
    `,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=450&fit=crop",
    category: "Accessibility",
    tags: ["Accessibility", "UI Design", "Best Practices", "ARIA"],
    author: {
      name: "Jane Doe",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    publishedAt: "2024-12-20",
    readTime: "8 min read",
  },
  {
    slug: "design-tokens-at-scale",
    title: "Design Tokens at Scale: Managing Design Systems",
    excerpt: "Discover how design tokens can help maintain consistency across your design system as it grows.",
    content: `
# Design Tokens at Scale

Design tokens are the atoms of your design system—the smallest pieces that define visual properties like colors, typography, and spacing.

## What Are Design Tokens?

Design tokens are named entities that store visual design attributes. Instead of hard-coding values, you reference tokens:

\`\`\`css
/* Instead of this */
.button {
  background-color: #3b82f6;
  padding: 12px 24px;
}

/* Use tokens */
.button {
  background-color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
}
\`\`\`

## Benefits of Design Tokens

### 1. Consistency
Tokens ensure visual consistency across your entire application. Change a token once, and it updates everywhere.

### 2. Theming
With tokens, implementing dark mode or brand themes becomes straightforward:

\`\`\`css
:root {
  --color-background: #ffffff;
  --color-foreground: #000000;
}

.dark {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
}
\`\`\`

### 3. Scalability
As your design system grows, tokens provide a single source of truth that scales with your team.

## Implementing Tokens

Start with these categories:

- **Colors**: Primary, secondary, semantic colors
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Borders**: Radius, widths
- **Shadows**: Elevation levels

## Conclusion

Design tokens are the foundation of scalable design systems. Start small, document well, and evolve your token structure as your needs grow.
    `,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop",
    category: "Design Systems",
    tags: ["Design Tokens", "CSS", "Theming", "Scalability"],
    author: {
      name: "John Smith",
      role: "Lead Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    publishedAt: "2024-12-15",
    readTime: "6 min read",
  },
  {
    slug: "react-server-components-explained",
    title: "React Server Components Explained: A Deep Dive",
    excerpt: "Understanding the new paradigm of React Server Components and how they change web development.",
    content: `
# React Server Components Explained

React Server Components (RSC) represent a fundamental shift in how we think about React applications. They allow components to run on the server, reducing client-side JavaScript.

## The Problem RSC Solves

Traditional React apps ship all component code to the client. This means:

- Larger bundle sizes
- More JavaScript to parse and execute
- Slower initial page loads

## How Server Components Work

Server Components render on the server and send HTML to the client. They can:

- Access databases directly
- Read from the filesystem
- Keep sensitive logic on the server

\`\`\`tsx
// This runs only on the server
async function BlogPosts() {
  const posts = await db.posts.findMany()
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

## Client vs Server Components

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| Interactivity | No | Yes |
| State/Effects | No | Yes |
| Browser APIs | No | Yes |
| Database Access | Yes | No |
| Bundle Size | Zero | Included |

## When to Use Each

**Use Server Components for:**
- Data fetching
- Static content
- Large dependencies

**Use Client Components for:**
- Interactivity (onClick, onChange)
- State management
- Browser APIs

## Conclusion

React Server Components offer a powerful way to optimize performance by moving work to the server. Understanding when to use each type is key to building efficient applications.
    `,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    category: "React",
    tags: ["React", "Server Components", "Performance", "Next.js"],
    author: {
      name: "Sarah Wilson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    publishedAt: "2024-12-10",
    readTime: "10 min read",
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt: "Explore the latest CSS features that make styling easier and more powerful than ever.",
    content: `
# Modern CSS Techniques

CSS has evolved dramatically. Features that once required JavaScript or preprocessors are now native to CSS.

## Container Queries

Style elements based on their container size, not just viewport:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## CSS Nesting

Native nesting without preprocessors:

\`\`\`css
.card {
  padding: 1rem;
  
  & .title {
    font-size: 1.5rem;
  }
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
\`\`\`

## The :has() Selector

Style parent elements based on children:

\`\`\`css
/* Style form when it contains an invalid input */
form:has(input:invalid) {
  border-color: red;
}

/* Style cards that have images */
.card:has(img) {
  padding: 0;
}
\`\`\`

## Logical Properties

Write direction-agnostic CSS:

\`\`\`css
.element {
  /* Instead of margin-left and margin-right */
  margin-inline: auto;
  
  /* Instead of padding-top and padding-bottom */
  padding-block: 1rem;
}
\`\`\`

## Conclusion

Modern CSS is incredibly powerful. These techniques can simplify your stylesheets and reduce your reliance on JavaScript for layout and styling needs.
    `,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop",
    category: "CSS",
    tags: ["CSS", "Web Development", "Frontend", "Styling"],
    author: {
      name: "Jane Doe",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    publishedAt: "2024-12-05",
    readTime: "7 min read",
  },
]

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
