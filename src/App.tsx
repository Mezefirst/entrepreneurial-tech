import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  GithubLogo, 
  ArrowUpRight, 
  MagnifyingGlass, 
  Download,
  LinkedinLogo,
  EnvelopeSimple,
  Article,
  Code,
  User
} from "@phosphor-icons/react"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  tags: string[]
}

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  publishDate: string
  readTime: string
  pdfUrl?: string
}

function App() {
  const [projects] = useKV<Project[]>("projects", [])
  const [articles] = useKV<Article[]>("articles", [])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredArticles = (articles || []).filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set((articles || []).map(a => a.category)))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EI</span>
              </div>
              <h1 className="font-heading font-bold text-xl">Entrepreneurial Insights</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
              <a href="#research" className="text-muted-foreground hover:text-foreground transition-colors">Research</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-96 mx-auto">
            <TabsTrigger value="about" className="flex items-center gap-2">
              <User size={16} />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Code size={16} />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <Article size={16} />
              <span className="hidden sm:inline">Research</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <EnvelopeSimple size={16} />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          {/* About Section */}
          <TabsContent value="about" className="space-y-8">
            <div className="text-center space-y-6">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src="/api/placeholder/300/300" alt="Profile" />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-heading text-3xl font-bold mb-2">Dr. Jane Developer</h2>
                <p className="text-muted-foreground text-lg">Entrepreneur, Researcher & Software Developer</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">About Me</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a passionate entrepreneur and researcher at the intersection of technology and business innovation. 
                    With a PhD in Business Administration and over a decade of software development experience, I bridge 
                    the gap between cutting-edge technology and practical business applications.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    My work focuses on how emerging technologies can drive entrepreneurial success, with particular expertise 
                    in AI applications, startup strategy, and venture capital dynamics. I regularly publish research on 
                    innovation patterns and maintain several open-source projects that demonstrate practical implementations 
                    of business technology solutions.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold">PhD in Business Administration</h4>
                      <p className="text-muted-foreground text-sm">Stanford University, 2018</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">MS Computer Science</h4>
                      <p className="text-muted-foreground text-sm">MIT, 2014</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">BS Electrical Engineering</h4>
                      <p className="text-muted-foreground text-sm">UC Berkeley, 2012</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Senior Research Fellow</h4>
                      <p className="text-muted-foreground text-sm">Innovation Lab, 2020-Present</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">CTO & Co-founder</h4>
                      <p className="text-muted-foreground text-sm">TechStart Inc., 2018-2020</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Software Engineer</h4>
                      <p className="text-muted-foreground text-sm">Google, 2014-2018</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Section */}
          <TabsContent value="projects" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-heading text-3xl font-bold">Software Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A collection of open-source tools and applications that demonstrate practical implementations 
                of business technology solutions.
              </p>
            </div>

            {(projects || []).length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-4">
                    <GithubLogo size={48} className="mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Projects Coming Soon</h3>
                      <p className="text-muted-foreground">
                        I'm currently working on several exciting projects. Check back soon to see my latest work!
                      </p>
                    </div>
                    <Button asChild>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <GithubLogo className="mr-2" size={16} />
                        View GitHub Profile
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(projects || []).map((project) => (
                  <Card key={project.id} className="hover-lift transition-all duration-200 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="font-heading">{project.title}</CardTitle>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <GithubLogo size={16} />
                            </a>
                          </Button>
                          {project.demoUrl && (
                            <Button size="sm" variant="ghost" asChild>
                              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ArrowUpRight size={16} />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Research Section */}
          <TabsContent value="research" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-heading text-3xl font-bold">Research & Insights</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Academic research and thought pieces exploring the intersection of technology, 
                entrepreneurship, and business innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-4">
                    <Article size={48} className="mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {searchTerm ? "No articles found" : "Research Articles Coming Soon"}
                      </h3>
                      <p className="text-muted-foreground">
                        {searchTerm 
                          ? "Try adjusting your search terms or browse all categories."
                          : "I'm currently working on several research papers. Check back soon for new insights!"
                        }
                      </p>
                    </div>
                    {searchTerm && (
                      <Button onClick={() => setSearchTerm("")} variant="outline">
                        Clear Search
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover-lift transition-all duration-200 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span className="text-muted-foreground text-sm">{article.readTime}</span>
                          </div>
                          <CardTitle className="font-heading mb-2">{article.title}</CardTitle>
                          <CardDescription className="text-base">{article.excerpt}</CardDescription>
                        </div>
                        {article.pdfUrl && (
                          <Button size="sm" variant="ghost" asChild>
                            <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <Download size={16} />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-muted-foreground text-sm">{article.publishDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-heading text-3xl font-bold">Get In Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Interested in collaboration, research partnerships, or discussing innovative business technology solutions? 
                I'd love to hear from you.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="text-center hover-lift transition-all duration-200">
                  <CardContent className="pt-6">
                    <EnvelopeSimple size={32} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm">jane@innovations.dev</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover-lift transition-all duration-200">
                  <CardContent className="pt-6">
                    <LinkedinLogo size={32} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">LinkedIn</h3>
                    <p className="text-muted-foreground text-sm">Connect professionally</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover-lift transition-all duration-200">
                  <CardContent className="pt-6">
                    <GithubLogo size={32} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">GitHub</h3>
                    <p className="text-muted-foreground text-sm">View my code</p>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="text-center space-y-4">
                <h3 className="font-heading text-xl font-semibold">Areas of Interest</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Startup Strategy",
                    "AI Applications",
                    "Venture Capital",
                    "Business Innovation",
                    "Open Source",
                    "Research Collaboration"
                  ].map((interest) => (
                    <Badge key={interest} variant="secondary" className="px-3 py-1">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Entrepreneurial Insights & Innovations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App