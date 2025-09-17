import { useState, useEffect, useMemo, useRef } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import profilePhoto from "@/assets/images/profile-photo.svg"
import { 
  GithubLogo, 
  ArrowUpRight, 
  MagnifyingGlass, 
  Download,
  LinkedinLogo,
  EnvelopeSimple,
  Article,
  Code,
  User,
  Star,
  GitFork,
  SpinnerGap,
  FunnelSimple,
  SortAscending,
  CalendarBlank,
  Camera,
  Upload,
  Plus,
  Trash,
  Gear
} from "@phosphor-icons/react"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
  archived: boolean
}

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  tags: string[]
  stars?: number
  forks?: number
  updatedAt?: string // ISO date string from GitHub API
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
  const [activeTab, setActiveTab] = useState("about")
  const [projects, setProjects] = useKV<Project[]>("projects", [])
  const [allFetchedRepos, setAllFetchedRepos] = useKV<Project[]>("all-fetched-repos", [])
  const [articles] = useKV<Article[]>("articles", [
    {
      id: "1",
      title: "Time-Dependent Behavior: Creep and Stress Relaxation in Heat Treatment-free Fasteners",
      excerpt: "Investigating sustainable manufacturing solutions for the automotive industry through advanced materials analysis and characterization of fastener performance under varying thermal and mechanical conditions.",
      category: "materials science",
      tags: ["creep behavior", "stress relaxation", "automotive", "sustainable manufacturing", "fasteners"],
      publishDate: "2024",
      readTime: "15 min read",
      pdfUrl: "#"
    },
    {
      id: "2", 
      title: "Frugal Innovation in Prosthetic Socket Design for Developing Countries",
      excerpt: "Exploring cost-effective manufacturing approaches and material selection for prosthetic devices in resource-constrained environments, focusing on accessibility and functionality.",
      category: "innovation",
      tags: ["frugal innovation", "prosthetics", "developing countries", "accessibility", "design for manufacturing"],
      publishDate: "2015",
      readTime: "12 min read",
      pdfUrl: "#"
    },
    {
      id: "3",
      title: "Additive Manufacturing Applications in Sustainable Technology Solutions",
      excerpt: "Analysis of 3D printing technologies and their role in creating environmentally conscious manufacturing processes, with focus on material efficiency and waste reduction.",
      category: "additive manufacturing",
      tags: ["3D printing", "sustainability", "green technology", "material efficiency", "waste reduction"],
      publishDate: "2024",
      readTime: "10 min read"
    },
    {
      id: "4",
      title: "Surface Technology and Phase Transformations in Engineering Materials",
      excerpt: "Comprehensive study of surface treatment methods and their impact on material performance, examining phase transformation mechanisms in various engineering applications.",
      category: "materials science", 
      tags: ["surface technology", "phase transformations", "material performance", "engineering materials"],
      publishDate: "2024",
      readTime: "18 min read"
    },
    {
      id: "5",
      title: "Lean Manufacturing Principles in Aircraft Maintenance Operations",
      excerpt: "Implementation of lean methodologies in aerospace maintenance workflows, examining efficiency improvements and quality assurance practices in commercial aviation.",
      category: "aerospace",
      tags: ["lean manufacturing", "aircraft maintenance", "quality assurance", "aerospace", "Boeing 767"],
      publishDate: "2023",
      readTime: "14 min read"
    }
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [githubUsername, setGithubUsername] = useKV("github-username", "")
  const [isLoadingRepos, setIsLoadingRepos] = useState(false)
  const [repoError, setRepoError] = useState<string | null>(null)
  
  // New state for filtering and sorting projects
  const [projectSearchTerm, setProjectSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [sortBy, setSortBy] = useState<"name" | "stars" | "forks" | "updated">("updated")

  // Profile photo upload state
  const [profilePhotoUrl, setProfilePhotoUrl] = useKV<string | null>("profile-photo-url", null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Repository management state
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false)
  const [selectedRepoIds, setSelectedRepoIds] = useState<Set<string>>(new Set())

  // Handle profile photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsUploadingPhoto(true)

    try {
      // Convert image to base64 data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setProfilePhotoUrl(dataUrl)
        setIsUploadingPhoto(false)
      }
      reader.onerror = () => {
        alert('Error reading file')
        setIsUploadingPhoto(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Error uploading photo')
      setIsUploadingPhoto(false)
    }
  }

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click()
  }

  const removePhoto = () => {
    setProfilePhotoUrl(null)
  }

  // Fetch GitHub repositories
  const fetchGitHubRepos = async (username: string) => {
    if (!username.trim()) return

    setIsLoadingRepos(true)
    setRepoError(null)

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`)
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'User not found' : 'Failed to fetch repositories')
      }

      const repos: GitHubRepo[] = await response.json()
      
      // Filter out forks and archived repos, convert to Project format
      const filteredRepos = repos
        .filter(repo => !repo.fork && !repo.archived && repo.description)
        .map(repo => ({
          id: repo.id.toString(),
          title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description || "No description available",
          techStack: repo.language ? [repo.language] : [],
          githubUrl: repo.html_url,
          demoUrl: repo.homepage || undefined,
          tags: repo.topics.slice(0, 5), // Limit to 5 topics
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at
        }))

      // Store all fetched repos for selection
      setAllFetchedRepos(filteredRepos)
      
      // If no projects selected yet, display all fetched repos
      if ((projects || []).length === 0) {
        setProjects(filteredRepos)
      }
    } catch (error) {
      console.error('Error fetching GitHub repos:', error)
      setRepoError(error instanceof Error ? error.message : 'Failed to fetch repositories')
    } finally {
      setIsLoadingRepos(false)
    }
  }

  // Initialize selected repo IDs when projects change
  useEffect(() => {
    const selectedIds = new Set((projects || []).map(p => p.id))
    setSelectedRepoIds(selectedIds)
  }, [projects])

  // Handle repository selection changes
  const handleRepoSelection = (repoId: string, isSelected: boolean) => {
    const newSelectedIds = new Set(selectedRepoIds)
    if (isSelected) {
      newSelectedIds.add(repoId)
    } else {
      newSelectedIds.delete(repoId)
    }
    setSelectedRepoIds(newSelectedIds)
  }

  // Apply repository selection
  const applyRepoSelection = () => {
    const selectedProjects = (allFetchedRepos || []).filter(repo => selectedRepoIds.has(repo.id))
    setProjects(selectedProjects)
    setIsManageDialogOpen(false)
  }

  // Remove a project from the displayed list
  const removeProject = (projectId: string) => {
    setProjects(currentProjects => (currentProjects || []).filter(p => p.id !== projectId))
    setSelectedRepoIds(prev => {
      const newSet = new Set(prev)
      newSet.delete(projectId)
      return newSet
    })
  }

  // Auto-fetch repos when username changes
  useEffect(() => {
    if (githubUsername) {
      fetchGitHubRepos(githubUsername)
    }
  }, [githubUsername])

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get('username') as string
    setGithubUsername(username)
  }

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = (projects || []).filter(project => {
      const matchesSearch = !projectSearchTerm || 
        project.title.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(projectSearchTerm.toLowerCase()))
      
      const matchesLanguage = selectedLanguage === "all" || 
        project.techStack.some(tech => tech.toLowerCase() === selectedLanguage.toLowerCase())
      
      return matchesSearch && matchesLanguage
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "stars":
          return (b.stars || 0) - (a.stars || 0)
        case "forks":
          return (b.forks || 0) - (a.forks || 0)
        case "updated":
          if (!a.updatedAt || !b.updatedAt) return 0
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [projects, projectSearchTerm, selectedLanguage, sortBy])

  // Get unique languages from projects for filter dropdown
  const availableLanguages = useMemo(() => {
    const languages = new Set<string>()
    ;(projects || []).forEach(project => {
      project.techStack.forEach(tech => languages.add(tech))
    })
    return Array.from(languages).sort()
  }, [projects])

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
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 professional-pattern">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-sm">MZ</span>
              </div>
              <h1 className="font-heading font-bold text-xl">Mesfin Asfaw Zewge</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => setActiveTab("about")}
                className={`transition-colors ${activeTab === "about" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab("projects")}
                className={`transition-colors ${activeTab === "projects" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab("research")}
                className={`transition-colors ${activeTab === "research" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                Research
              </button>
              <button 
                onClick={() => setActiveTab("contact")}
                className={`transition-colors ${activeTab === "contact" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-96 mx-auto">
            <TabsTrigger value="about" className={`flex items-center gap-2 ${activeTab === "about" ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" : ""}`}>
              <User size={16} />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className={`flex items-center gap-2 ${activeTab === "projects" ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" : ""}`}>
              <Code size={16} />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="research" className={`flex items-center gap-2 ${activeTab === "research" ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" : ""}`}>
              <Article size={16} />
              <span className="hidden sm:inline">Research</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className={`flex items-center gap-2 ${activeTab === "contact" ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" : ""}`}>
              <EnvelopeSimple size={16} />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          {/* About Section */}
          <TabsContent value="about" className="space-y-8">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32 mx-auto ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                  <AvatarImage 
                    src={profilePhotoUrl || profilePhoto} 
                    alt="Mesfin Asfaw Zewge - Materials Science Engineer" 
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">MZ</AvatarFallback>
                </Avatar>
                
                {/* Photo upload controls */}
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 rounded-full p-0 shadow-lg"
                    onClick={triggerPhotoUpload}
                    disabled={isUploadingPhoto}
                  >
                    {isUploadingPhoto ? (
                      <SpinnerGap size={16} className="animate-spin" />
                    ) : (
                      <Camera size={16} />
                    )}
                  </Button>
                  {profilePhotoUrl && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 rounded-full p-0 shadow-lg text-xs"
                      onClick={removePhoto}
                      title="Remove photo"
                    >
                      ×
                    </Button>
                  )}
                </div>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              
              {/* Upload instructions */}
              {!profilePhotoUrl && (
                <div className="mx-auto max-w-md">
                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6 pb-4">
                      <div className="text-center space-y-2">
                        <Upload size={32} className="mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click the camera icon to upload your professional photo
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports JPG, PNG, WebP • Max 5MB
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div>
                <h2 className="font-heading text-3xl font-bold mb-2">Mesfin Asfaw Zewge</h2>
                <p className="text-muted-foreground text-lg">Materials Science Engineer & Innovation Specialist</p>
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    
                    <span>+46736671975</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <EnvelopeSimple size={14} />
                    <span>zewge@student.chalmers.se</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">About Me</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a motivated and solution-driven Engineer with 12+ years of international work experience 
                    and a fresh MSc in Industrial and Materials Science from Chalmers University of Technology. 
                    I specialize in the mechanical performance of engineering materials, material characterization, 
                    phase transformations, surface technology, and additive manufacturing for sustainable solutions 
                    in greener technology applications. My passion lies in developing sustainable solutions through 
                    the integration of AI technology to drive innovation in materials science and manufacturing processes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">12+ Years</h4>
                      <p className="text-sm text-muted-foreground">International Experience</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Open-minded</h4>
                      <p className="text-sm text-muted-foreground">Collaborative Team Player</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Passionate</h4>
                      <p className="text-sm text-muted-foreground">AI-Integrated Sustainable Solutions</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    My diverse background spans aerospace maintenance, product development, and materials engineering, 
                    with expertise in aircraft maintenance (Boeing 767 type-rated), CAD design, and lean manufacturing. 
                    I'm passionate about developing sustainable solutions through AI technology integration and committed 
                    to delivering quality-driven solutions that comply with industry standards and regulations.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">MSc Industrial and Materials Science</h4>
                      <p className="text-muted-foreground text-sm">Chalmers University of Technology, 2025</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Dissertation: "Time-Dependent Behavior: A Study on Creep and Stress Relaxation Performance for Heat Treatment-free Fasteners" 
                        - Toward Sustainable Manufacturing Solutions in the Automotive Industry
                      </p>
                      <Badge variant="secondary" className="mt-2">Member of Chalmers Student Union</Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold">MSc Mechanical Engineering</h4>
                      <p className="text-muted-foreground text-sm">Halmstad University, 2015</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Development of Product and Manufacturing Technology
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dissertation: "Frugal Innovation of Prosthetic Socket for Developing Countries"
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">Academic Achievement Award</Badge>
                        <Badge variant="secondary">Scholarship</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Service Engineer</h4>
                      <p className="text-muted-foreground text-sm">Direkt Chark Göteborg AB • 2018-2023</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Equipment maintenance, installation, and corrective/preventive maintenance
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Development Engineer</h4>
                      <p className="text-muted-foreground text-sm">SWT Development • 2016</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Product development for healthcare, machine optimization
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Flight Engineer</h4>
                      <p className="text-muted-foreground text-sm">Ethiopian Airlines • 2010-2014</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Aircraft maintenance (Boeing 767 type-rated), avionics, troubleshooting
                      </p>
                      <Badge variant="secondary" className="mt-1">Service Award 2013</Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold">Project Manager</h4>
                      <p className="text-muted-foreground text-sm">Meze Engineering • 2008-2010</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Project execution, risk analysis, stakeholder coordination
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills and Licenses Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Core Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Materials Science & Engineering</h5>
                        <div className="flex flex-wrap gap-1">
                          {[
                            "Material Characterization", "Failure Analysis", "Surface Technology", 
                            "Additive Manufacturing", "Phase Transformations", "Battery Materials"
                          ].map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Software & Digital Tools</h5>
                        <div className="flex flex-wrap gap-1">
                          {[
                            "CATIA V5", "SolidWorks", "MATLAB", "Python", "CAD/CAM", "3D Design"
                          ].map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Quality & Process</h5>
                        <div className="flex flex-wrap gap-1">
                          {[
                            "Six Sigma", "Lean Manufacturing", "FMEA", "Quality Assurance", "Project Management"
                          ].map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Languages & Licenses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Languages</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Amharic</span>
                          <Badge variant="secondary">Native</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">English</span>
                          <Badge variant="secondary">Professional</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Swedish</span>
                          <Badge variant="secondary">Working</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Professional Licenses</h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">B License</Badge>
                          <span className="text-sm text-muted-foreground">Swedish Driving License</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">A&P License</Badge>
                          <span className="text-sm text-muted-foreground">Airframe & Power Plant (B1)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">B2 License</Badge>
                          <span className="text-sm text-muted-foreground">Aircraft Avionics Maintenance</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Section */}
          <TabsContent value="projects" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-heading text-3xl font-bold">Software Projects & GitHub Portfolio</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My software development work showcases programming skills in Python, MATLAB, and CAD automation with a focus on AI integration. 
                Connect your GitHub profile to automatically display your latest repositories with filtering and sorting capabilities.
              </p>
            </div>

            {/* GitHub Username Input */}
            {!githubUsername && (
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="font-heading text-center">Connect Your GitHub</CardTitle>
                  <CardDescription className="text-center">
                    Enter your GitHub username to automatically display your latest repositories with advanced filtering and sorting options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUsernameSubmit} className="space-y-4">
                    <Input
                      name="username"
                      placeholder="e.g. your-github-username"
                      required
                    />
                    <Button type="submit" className="w-full">
                      <GithubLogo className="mr-2" size={16} />
                      Fetch My Repositories
                    </Button>
                  </form>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      This will fetch your public repositories and display them with GitHub stats, 
                      language filtering, and sorting by stars, forks, or last updated.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {isLoadingRepos && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-4">
                    <SpinnerGap size={48} className="mx-auto text-primary animate-spin" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Fetching Repositories</h3>
                      <p className="text-muted-foreground">
                        Loading your latest GitHub projects...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error State */}
            {repoError && (
              <Card className="text-center py-12 border-destructive/20">
                <CardContent>
                  <div className="space-y-4">
                    <GithubLogo size={48} className="mx-auto text-destructive" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-destructive">Error Loading Repositories</h3>
                      <p className="text-muted-foreground mb-4">{repoError}</p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={() => githubUsername && fetchGitHubRepos(githubUsername)} variant="outline">
                          Try Again
                        </Button>
                        <Button onClick={() => setGithubUsername("")} variant="ghost">
                          Change Username
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State - No repos or username set */}
            {!isLoadingRepos && !repoError && githubUsername && (projects || []).length === 0 && (allFetchedRepos || []).length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-4">
                    <GithubLogo size={48} className="mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No Public Repositories Found</h3>
                      <p className="text-muted-foreground mb-4">
                        No public repositories with descriptions were found for @{githubUsername}
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button asChild>
                          <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer">
                            <GithubLogo className="mr-2" size={16} />
                            View GitHub Profile
                          </a>
                        </Button>
                        <Button onClick={() => setGithubUsername("")} variant="outline">
                          Change Username
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State - Repos fetched but none selected */}
            {!isLoadingRepos && !repoError && githubUsername && (projects || []).length === 0 && (allFetchedRepos || []).length > 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-4">
                    <Gear size={48} className="mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No Repositories Selected</h3>
                      <p className="text-muted-foreground mb-4">
                        You have {(allFetchedRepos || []).length} repositories available from @{githubUsername}. 
                        Select which ones you'd like to showcase in your portfolio.
                      </p>
                      <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="mr-2" size={16} />
                            Select Repositories
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Select Repositories to Display</DialogTitle>
                            <DialogDescription>
                              Choose which repositories from your GitHub profile you want to showcase on your portfolio.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {selectedRepoIds.size} of {(allFetchedRepos || []).length} repositories selected
                              </span>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => setSelectedRepoIds(new Set((allFetchedRepos || []).map(r => r.id)))}
                                >
                                  Select All
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => setSelectedRepoIds(new Set())}
                                >
                                  Clear All
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                              {(allFetchedRepos || []).map((repo) => (
                                <div key={repo.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30">
                                  <Checkbox
                                    id={`empty-repo-${repo.id}`}
                                    checked={selectedRepoIds.has(repo.id)}
                                    onCheckedChange={(checked) => handleRepoSelection(repo.id, checked === true)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <label htmlFor={`empty-repo-${repo.id}`} className="cursor-pointer">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-sm">{repo.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          {typeof repo.stars === 'number' && (
                                            <div className="flex items-center gap-1">
                                              <Star size={12} />
                                              <span>{repo.stars}</span>
                                            </div>
                                          )}
                                          {repo.techStack.length > 0 && (
                                            <Badge variant="secondary" className="text-xs px-1 py-0">
                                              {repo.techStack[0]}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {repo.description}
                                      </p>
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={() => setIsManageDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={applyRepoSelection}>
                              Apply Selection
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects Grid */}
            {!isLoadingRepos && !repoError && (projects || []).length > 0 && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Showing repositories for @{githubUsername}</span>
                    <Button size="sm" variant="ghost" onClick={() => setGithubUsername("")}>
                      Change Username
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => githubUsername && fetchGitHubRepos(githubUsername)}>
                      Refresh
                    </Button>
                    <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Gear size={14} className="mr-2" />
                          Manage Repositories
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Select Repositories to Display</DialogTitle>
                          <DialogDescription>
                            Choose which repositories from your GitHub profile you want to showcase on your portfolio.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {selectedRepoIds.size} of {(allFetchedRepos || []).length} repositories selected
                            </span>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setSelectedRepoIds(new Set((allFetchedRepos || []).map(r => r.id)))}
                              >
                                Select All
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setSelectedRepoIds(new Set())}
                              >
                                Clear All
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {(allFetchedRepos || []).map((repo) => (
                              <div key={repo.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30">
                                <Checkbox
                                  id={`repo-${repo.id}`}
                                  checked={selectedRepoIds.has(repo.id)}
                                  onCheckedChange={(checked) => handleRepoSelection(repo.id, checked === true)}
                                  className="mt-1"
                                />
                                <div className="flex-1 min-w-0">
                                  <label htmlFor={`repo-${repo.id}`} className="cursor-pointer">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium text-sm">{repo.title}</h4>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {typeof repo.stars === 'number' && (
                                          <div className="flex items-center gap-1">
                                            <Star size={12} />
                                            <span>{repo.stars}</span>
                                          </div>
                                        )}
                                        {repo.techStack.length > 0 && (
                                          <Badge variant="secondary" className="text-xs px-1 py-0">
                                            {repo.techStack[0]}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {repo.description}
                                    </p>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                          <Button variant="outline" onClick={() => setIsManageDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={applyRepoSelection}>
                            Apply Selection
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Filtering and Sorting Controls */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        placeholder="Search projects..."
                        value={projectSearchTerm}
                        onChange={(e) => setProjectSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    {/* Language Filter */}
                    <div className="flex items-center gap-2">
                      <FunnelSimple size={16} className="text-muted-foreground" />
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          {availableLanguages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-2">
                      <SortAscending size={16} className="text-muted-foreground" />
                      <Select value={sortBy} onValueChange={(value: "name" | "stars" | "forks" | "updated") => setSortBy(value)}>
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="updated">
                            <div className="flex items-center gap-2">
                              <CalendarBlank size={14} />
                              Recently Updated
                            </div>
                          </SelectItem>
                          <SelectItem value="stars">
                            <div className="flex items-center gap-2">
                              <Star size={14} />
                              Most Stars
                            </div>
                          </SelectItem>
                          <SelectItem value="forks">
                            <div className="flex items-center gap-2">
                              <GitFork size={14} />
                              Most Forks
                            </div>
                          </SelectItem>
                          <SelectItem value="name">Name A-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Results Summary */}
                  <div className="text-center text-sm text-muted-foreground">
                    Showing {filteredAndSortedProjects.length} of {(projects || []).length} repositories
                    {projectSearchTerm && ` matching "${projectSearchTerm}"`}
                    {selectedLanguage !== "all" && ` in ${selectedLanguage}`}
                  </div>
                </div>

                {/* No Results State */}
                {filteredAndSortedProjects.length === 0 && (projects || []).length > 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <div className="space-y-4">
                        <MagnifyingGlass size={48} className="mx-auto text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">No Projects Found</h3>
                          <p className="text-muted-foreground mb-4">
                            No repositories match your current filters.
                          </p>
                          <div className="flex gap-2 justify-center">
                            <Button onClick={() => {
                              setProjectSearchTerm("")
                              setSelectedLanguage("all")
                              setSortBy("updated")
                            }} variant="outline">
                              Clear Filters
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Projects Grid */}
                {filteredAndSortedProjects.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedProjects.map((project) => (
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
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => removeProject(project.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                title="Remove from portfolio"
                              >
                                <Trash size={16} />
                              </Button>
                            </div>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Tech Stack */}
                            {project.techStack.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                  <Badge 
                                    key={tech} 
                                    variant={selectedLanguage === tech ? "default" : "secondary"} 
                                    className="text-xs cursor-pointer hover:bg-accent"
                                    onClick={() => setSelectedLanguage(tech)}
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            {/* Tags/Topics */}
                            {project.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* GitHub Stats */}
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                {typeof project.stars === 'number' && (
                                  <div className="flex items-center gap-1">
                                    <Star size={14} />
                                    <span>{project.stars}</span>
                                  </div>
                                )}
                                {typeof project.forks === 'number' && (
                                  <div className="flex items-center gap-1">
                                    <GitFork size={14} />
                                    <span>{project.forks}</span>
                                  </div>
                                )}
                              </div>
                              {project.updatedAt && (
                                <span className="text-xs">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Research Section */}
          <TabsContent value="research" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-heading text-3xl font-bold">Research & Publications</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Research focus areas include materials engineering, AI-integrated sustainable manufacturing, 
                and innovative solutions for engineering challenges in aerospace and automotive industries.
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
                Interested in collaboration on materials engineering projects, AI-integrated sustainable manufacturing solutions, 
                or discussing innovative approaches to engineering challenges? I'd love to connect.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="text-center hover-lift transition-all duration-200 cursor-pointer" onClick={() => window.open('mailto:zewge@student.chalmers.se', '_blank')}>
                  <CardContent className="pt-6">
                    <EnvelopeSimple size={32} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm hover:text-primary transition-colors">zewge@student.chalmers.se</p>
                    <p className="text-muted-foreground text-xs hover:text-primary transition-colors">mazefirst@gmail.com</p>
                    <Button size="sm" variant="ghost" className="mt-2 text-xs">
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover-lift transition-all duration-200 cursor-pointer" onClick={() => window.open('https://www.linkedin.com/in/mesfinasfaw-zewge-5b8b8b123', '_blank')}>
                  <CardContent className="pt-6">
                    <LinkedinLogo size={32} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">LinkedIn</h3>
                    <p className="text-muted-foreground text-sm hover:text-primary transition-colors">Connect professionally</p>
                    <Button size="sm" variant="ghost" className="mt-2 text-xs">
                      <LinkedinLogo size={14} className="mr-1" />
                      View Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover-lift transition-all duration-200 cursor-pointer" onClick={() => window.open(`https://github.com/${githubUsername || 'your-username'}`, '_blank')}>
                  <CardContent className="pt-6">
                    <GithubLogo size={32} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">GitHub</h3>
                    <p className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {githubUsername ? `@${githubUsername}` : 'View my repositories'}
                    </p>
                    <Button size="sm" variant="ghost" className="mt-2 text-xs">
                      <GithubLogo size={14} className="mr-1" />
                      View Repositories
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="text-center space-y-4">
                <h3 className="font-heading text-xl font-semibold">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "AI & Machine Learning",
                    "Materials Science",
                    "Material Characterization", 
                    "Additive Manufacturing",
                    "Surface Technology",
                    "Aircraft Maintenance",
                    "CAD Design (CATIA V5)",
                    "SolidWorks",
                    "Product Development",
                    "Quality Assurance",
                    "Six Sigma",
                    "Lean Manufacturing",
                    "Python Programming",
                    "MATLAB",
                    "Phase Transformations",
                    "Battery Materials",
                    "FMEA Analysis",
                    "Project Management"
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
            <p>&copy; 2024 Mesfinasfaw Zewge - Materials Science Engineer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App