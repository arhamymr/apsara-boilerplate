import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Calendar, Clock } from "lucide-react"

const samplePosts = [
  {
    slug: "getting-started",
    title: "Getting Started with UI Kit",
    excerpt: "Learn how to set up and use our comprehensive UI component library in your Next.js projects.",
    category: "Tutorial",
    image: "https://source.unsplash.com/800x600/?code,programming",
    author: {
      name: "John Doe",
      avatar: "https://source.unsplash.com/100x100/?portrait,man",
    },
    publishedAt: "2024-01-15",
    readTime: "5 min read",
  },
  {
    slug: "design-system",
    title: "Building a Design System",
    excerpt: "Best practices for creating and maintaining a scalable design system for your organization.",
    category: "Design",
    image: "https://source.unsplash.com/800x600/?design,ui",
    author: {
      name: "Jane Smith",
      avatar: "https://source.unsplash.com/100x100/?portrait,woman",
    },
    publishedAt: "2024-01-10",
    readTime: "8 min read",
  },
  {
    slug: "accessibility",
    title: "Accessibility Best Practices",
    excerpt: "Making your web applications accessible to everyone with these essential guidelines.",
    category: "Accessibility",
    image: "https://source.unsplash.com/800x600/?accessibility,web",
    author: {
      name: "Mike Johnson",
      avatar: "https://source.unsplash.com/100x100/?portrait,person",
    },
    publishedAt: "2024-01-05",
    readTime: "6 min read",
  },
]

export function BlogGrid() {
  const featuredPost = samplePosts[0]
  const otherPosts = samplePosts.slice(1)

  return (
    <div className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and updates from our team.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="overflow-hidden mb-12 transition-all hover:shadow-lg hover:border-accent/50">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto overflow-hidden bg-secondary">
              <img
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={featuredPost.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{featuredPost.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{featuredPost.author.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Other Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Card
              key={post.slug}
              className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-accent/50"
            >
              <div className="aspect-video overflow-hidden bg-secondary">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <Badge variant="secondary" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">{post.author.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
