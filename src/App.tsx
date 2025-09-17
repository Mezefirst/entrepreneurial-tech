import React, { useState, useEffect, useMemo, useRef } from "react"
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
import { Textarea } from "@/components/ui/textarea"
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
  Gear,
  ChatCircle,
  Heart,
  ArrowBendUpLeft,
  PaperPlaneTilt,
  ShareNetwork,
  TwitterLogo,
  FacebookLogo,
  Copy,
  Check,
  Eye,
  X,
  Clock,
  BookOpen,
  FileText,
  PaperPlane
} from "@phosphor-icons/react"

interface GitHubRepo {
  id: number
  name: string
  full_name: string
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
  fullDescription?: string
  readmeContent?: string // README.md content from GitHub
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
  abstract?: string // New field for structured abstract
  fullContent?: string
  category: string
  tags: string[]
  publishDate: string
  readTime: string
  pdfUrl?: string
}

interface Comment {
  id: string
  author: string
  authorAvatar?: string
  content: string
  timestamp: string
  parentId?: string // For replies
  likes: number
  replies?: Comment[]
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
      abstract: "This research investigates the time-dependent mechanical behavior of heat treatment-free fasteners, focusing on creep and stress relaxation performance in automotive applications. The study addresses critical sustainability challenges by exploring alternatives to traditional heat-treated fasteners. Through systematic material characterization using advanced microscopy, X-ray diffraction, and mechanical testing protocols, we evaluated fastener performance under elevated temperatures (150°C-300°C) and varying stress conditions. Results demonstrate that properly designed heat treatment-free fasteners exhibit excellent creep resistance with deformation rates comparable to traditional alternatives. Stress relaxation testing showed minimal load loss over 1000 hours, maintaining >95% of initial preload. The elimination of heat treatment processes results in 40% reduction in energy consumption, significant carbon footprint decrease, and improved manufacturing efficiency. This research demonstrates the feasibility of high-performance fasteners without traditional heat treatment, contributing to sustainable automotive manufacturing practices.",
      fullContent: `
# Introduction

This comprehensive study investigates the time-dependent mechanical behavior of heat treatment-free fasteners, focusing on creep and stress relaxation performance in automotive applications. The research addresses critical sustainability challenges in modern manufacturing by examining alternatives to traditional heat-treated fasteners.

# Background and Motivation

The automotive industry faces increasing pressure to adopt sustainable manufacturing practices while maintaining high performance standards. Traditional fastener manufacturing relies heavily on energy-intensive heat treatment processes that contribute significantly to carbon emissions. This research explores innovative approaches to achieve comparable mechanical performance without conventional heat treatment methods.

# Methodology

## Material Selection and Characterization

The study employed a systematic approach to material characterization, utilizing advanced microscopy techniques, X-ray diffraction analysis, and mechanical testing protocols. Specimens were prepared according to ASTM standards, ensuring reproducible and reliable results.

## Testing Procedures

Creep testing was conducted at elevated temperatures (150°C to 300°C) under constant stress conditions ranging from 60% to 80% of yield strength. Stress relaxation experiments were performed using precision load cells and environmental chambers to simulate real-world automotive operating conditions.

# Results and Analysis

## Creep Behavior

The experimental results demonstrate that properly designed heat treatment-free fasteners exhibit excellent creep resistance, with deformation rates comparable to traditional heat-treated alternatives. The microstructural analysis revealed enhanced grain boundary strengthening mechanisms that contribute to improved high-temperature performance.

## Stress Relaxation Performance

Stress relaxation testing showed minimal load loss over extended periods, indicating superior dimensional stability under varying thermal and mechanical loads. The fasteners maintained over 95% of initial preload after 1000 hours of testing at operating temperatures.

# Sustainability Implications

The elimination of heat treatment processes results in:
- 40% reduction in energy consumption during manufacturing
- Significant decrease in carbon footprint
- Improved manufacturing efficiency
- Reduced processing time and costs

# Conclusions

This research demonstrates the feasibility of developing high-performance fasteners without traditional heat treatment processes. The findings contribute to sustainable manufacturing practices in the automotive industry while maintaining strict performance requirements.

The developed fasteners show excellent potential for commercial application, offering both environmental and economic benefits without compromising mechanical performance.
      `,
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
      abstract: "Prosthetic technology accessibility remains a significant challenge in developing countries where traditional manufacturing approaches are cost-prohibitive and technically complex. This research explores frugal innovation principles applied to prosthetic socket design, creating functional, affordable solutions for resource-constrained environments. The study addresses high manufacturing costs, complex fitting procedures, limited material availability, and lack of maintenance support. Through extensive material research, we identified locally sourced materials including natural fiber composites, low-cost thermoplastics, and bio-compatible padding materials. Advanced CAD modeling and finite element analysis optimized socket geometry for uniform stress distribution, enhanced comfort, and simplified manufacturing. Field testing with 50 participants across various amputation levels demonstrated 85% user satisfaction, 70% cost reduction compared to traditional solutions, and successful local manufacturing implementation. The solution addresses sustainability through local material sourcing, skills transfer to local craftsmen, and establishment of regional manufacturing hubs with community-based maintenance programs.",
      fullContent: `
# Introduction

Prosthetic technology accessibility remains a significant challenge in developing countries, where traditional manufacturing approaches are often cost-prohibitive and technically complex. This research explores frugal innovation principles applied to prosthetic socket design, aiming to create functional, affordable solutions for resource-constrained environments.

# Problem Statement

Current prosthetic solutions face several challenges in developing countries:
- High manufacturing costs
- Complex fitting procedures requiring specialized equipment
- Limited availability of materials and technical expertise
- Lack of ongoing maintenance support

# Frugal Innovation Approach

## Design Philosophy

The frugal innovation methodology emphasizes:
- Simplicity in design and manufacturing
- Use of locally available materials
- Low-cost production methods
- Easy maintenance and repair

## Material Selection

Extensive research identified locally sourced materials that provide adequate strength and comfort:
- Natural fiber composites
- Low-cost thermoplastics
- Recycled materials where applicable
- Bio-compatible padding materials

# Design Development

## Socket Geometry Optimization

Advanced CAD modeling and finite element analysis were employed to optimize socket geometry for:
- Uniform stress distribution
- Enhanced comfort during extended wear
- Simplified manufacturing process
- Accommodation of anatomical variations

## Manufacturing Process

The developed manufacturing process utilizes:
- Simple molding techniques requiring minimal equipment
- Room temperature curing systems
- Manual finishing processes
- Quality control methods suitable for low-resource settings

# Field Testing and Validation

## Clinical Trials

Extensive field testing was conducted in partnership with local healthcare providers:
- 50 participants across various amputation levels
- 6-month follow-up period
- Regular comfort and functionality assessments
- Feedback integration for design improvements

## Results

Field testing demonstrated:
- 85% user satisfaction rate
- 70% cost reduction compared to traditional solutions
- Successful local manufacturing implementation
- Positive impact on user mobility and quality of life

# Sustainability and Scalability

The solution addresses sustainability through:
- Local material sourcing reducing transportation costs
- Skills transfer to local craftsmen
- Establishment of regional manufacturing hubs
- Community-based maintenance programs

# Future Directions

Ongoing research focuses on:
- Integration of smart materials for enhanced comfort
- Development of modular designs for different amputation types
- Expansion to additional geographic regions
- Partnership development with NGOs and healthcare organizations

# Conclusion

This research demonstrates that frugal innovation principles can successfully address complex healthcare challenges in resource-constrained environments. The developed prosthetic socket design offers a sustainable, scalable solution that improves accessibility to prosthetic technology while maintaining functional performance.
      `,
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
      abstract: "Additive manufacturing (AM) technologies represent a paradigm shift in production methodologies, offering unprecedented opportunities for sustainable manufacturing. This comprehensive analysis examines the role of 3D printing technologies in developing environmentally conscious manufacturing processes with emphasis on material efficiency and waste reduction strategies. The study evaluates various AM technologies including FDM, SLA, SLS, DMLS, and EBM, comparing their environmental impact against traditional manufacturing processes. Traditional manufacturing often results in up to 90% material waste in machining operations, high energy consumption, and complex supply chains. AM excels in near-net-shape production, topology optimization for lightweight designs, recycled material utilization, and on-demand production. Case studies demonstrate 60% weight reduction in aerospace turbine components, 40% material savings, and significant fuel savings through lightweight designs. Automotive applications show rapid prototyping benefits, customized tooling, and reduced assembly complexity. Medical applications highlight patient-specific implants and enhanced functionality through complex geometries. The research addresses current constraints including limited material selection and production speed limitations while identifying solutions through new sustainable materials and process optimization.",
      fullContent: `
# Introduction

Additive manufacturing (AM) technologies represent a paradigm shift in production methodologies, offering unprecedented opportunities for sustainable manufacturing. This comprehensive analysis examines the role of 3D printing technologies in developing environmentally conscious manufacturing processes, with particular emphasis on material efficiency and waste reduction strategies.

# Current State of Additive Manufacturing

## Technology Overview

Modern additive manufacturing encompasses various technologies:
- Fused Deposition Modeling (FDM)
- Stereolithography (SLA)
- Selective Laser Sintering (SLS)
- Direct Metal Laser Sintering (DMLS)
- Electron Beam Melting (EBM)

Each technology offers unique advantages for sustainable manufacturing applications.

## Environmental Impact Assessment

Traditional manufacturing processes often result in:
- Significant material waste (up to 90% in machining operations)
- High energy consumption for material removal
- Complex supply chains with extensive transportation requirements
- Limited design freedom leading to over-engineered components

# Sustainable Applications

## Material Efficiency

Additive manufacturing excels in:
- Near-net-shape production minimizing material waste
- Topology optimization enabling lightweight designs
- Use of recycled materials in feedstock
- On-demand production reducing inventory requirements

## Waste Reduction Strategies

Key waste reduction mechanisms include:
- Elimination of tooling and fixtures
- Reduced support material requirements through design optimization
- In-situ recycling of unused powder materials
- Localized production reducing transportation impacts

# Case Studies

## Aerospace Applications

Implementation in aerospace demonstrates:
- 60% weight reduction in turbine components
- 40% material savings compared to traditional manufacturing
- Consolidation of multi-part assemblies into single components
- Significant fuel savings through lightweight designs

## Automotive Industry

Automotive applications show:
- Rapid prototyping reducing development cycles
- Customized tooling and fixtures on-demand
- Low-volume production of specialized components
- Integration of functional features reducing assembly complexity

## Medical Devices

Medical applications highlight:
- Patient-specific implants and prosthetics
- Biocompatible material utilization
- Reduced sterilization packaging through point-of-use manufacturing
- Enhanced functionality through complex geometries

# Challenges and Limitations

## Current Constraints

- Limited material selection compared to traditional manufacturing
- Surface finish requirements may necessitate post-processing
- Production speed limitations for high-volume applications
- Quality consistency challenges in powder-based processes

## Solutions and Improvements

Ongoing research addresses:
- Development of new sustainable materials
- Process optimization for improved efficiency
- Multi-material printing capabilities
- Advanced quality control systems

# Future Outlook

## Technology Development

Emerging trends include:
- Integration of AI for process optimization
- Development of bio-based printing materials
- Hybrid manufacturing combining additive and subtractive processes
- In-space manufacturing for ultimate sustainability

## Economic Implications

Additive manufacturing promises:
- Reduced capital equipment requirements
- Elimination of traditional tooling costs
- Distributed manufacturing models
- Shortened supply chains

# Conclusion

Additive manufacturing technologies offer transformative potential for sustainable manufacturing across multiple industries. The demonstrated benefits in material efficiency, waste reduction, and design freedom position AM as a cornerstone technology for environmentally conscious production methodologies.

Continued research and development will further enhance the sustainability benefits while addressing current limitations, making additive manufacturing an increasingly viable solution for sustainable technology applications.
      `,
      category: "additive manufacturing",
      tags: ["3D printing", "sustainability", "green technology", "material efficiency", "waste reduction"],
      publishDate: "2024",
      readTime: "10 min read"
    },
    {
      id: "4",
      title: "Surface Technology and Phase Transformations in Engineering Materials",
      excerpt: "Comprehensive study of surface treatment methods and their impact on material performance, examining phase transformation mechanisms in various engineering applications.",
      abstract: "Surface technology and phase transformations play crucial roles in determining the performance characteristics of engineering materials. This comprehensive study examines various surface treatment methods including Physical Vapor Deposition (PVD), Chemical Vapor Deposition (CVD), and thermal spray processes, analyzing their relationship with phase transformation mechanisms across different engineering applications. The research investigates both diffusionless transformations (martensitic) and diffusion-controlled transformations, examining nucleation and growth mechanisms, precipitation strengthening effects, and texture development. Advanced characterization methods including SEM, TEM, X-ray diffraction, and electron backscatter diffraction were employed for microstructural analysis. Applications span aerospace components with thermal barrier coatings, automotive cylinder bore coatings, and biomedical device surface modifications. The study addresses process optimization through parameter control including temperature profiles, atmospheric composition, and time-temperature relationships. Quality assurance methods include statistical process control and non-destructive testing techniques. Future directions focus on emerging technologies including additive manufacturing of surface features, laser-based surface modification, and smart coatings with responsive properties, while considering sustainability through elimination of hazardous chemicals and energy-efficient processing methods.",
      fullContent: `
# Introduction

Surface technology and phase transformations play crucial roles in determining the performance characteristics of engineering materials. This comprehensive study examines various surface treatment methods and their relationship with phase transformation mechanisms across different engineering applications.

# Surface Treatment Technologies

## Physical Vapor Deposition (PVD)

PVD processes offer excellent control over coating composition and microstructure:
- Sputtering techniques for uniform coverage
- Evaporation methods for specialized applications
- Ion plating for enhanced adhesion
- Multi-layer coatings for optimized properties

## Chemical Vapor Deposition (CVD)

CVD processes enable complex coating compositions:
- Thermal CVD for high-temperature applications
- Plasma-enhanced CVD for temperature-sensitive substrates
- Metal-organic CVD for precision applications
- Atomic layer deposition for ultra-thin films

## Thermal Spray Processes

Thermal spray technologies provide versatile coating solutions:
- Plasma spraying for ceramic coatings  
- High-velocity oxy-fuel (HVOF) for dense metallic coatings
- Cold spray for temperature-sensitive materials
- Detonation gun spraying for specialized applications

# Phase Transformation Mechanisms

## Diffusionless Transformations

Martensitic transformations occur rapidly:
- Athermal transformation kinetics
- Crystallographic relationships between phases
- Shape memory effects in specific alloys
- Stress-induced transformation mechanisms

## Diffusion-Controlled Transformations

Phase evolution through atomic diffusion:
- Nucleation and growth mechanisms
- Precipitation strengthening effects
- Grain boundary engineering
- Texture development during transformation

# Engineering Applications

## Aerospace Components

Surface treatments for aerospace applications:
- Thermal barrier coatings for turbine blades
- Wear-resistant coatings for landing gear
- Corrosion protection for structural components
- Lightning strike protection systems

## Automotive Industry

Surface engineering in automotive applications:
- Cylinder bore coatings for engine components
- Decorative and protective coatings for body panels
- Wear-resistant treatments for transmission components
- Brake system coatings for enhanced performance

## Biomedical Devices

Specialized surface treatments for medical applications:
- Biocompatible coatings for implants
- Drug-eluting surface modifications
- Antimicrobial surface treatments
- Osseointegration enhancement coatings

# Characterization Techniques

## Microstructural Analysis

Advanced characterization methods:
- Scanning electron microscopy (SEM) for surface morphology
- Transmission electron microscopy (TEM) for fine-scale features
- X-ray diffraction for phase identification
- Electron backscatter diffraction for texture analysis

## Mechanical Property Assessment

Evaluation of surface-modified materials:
- Nanoindentation for hardness mapping
- Scratch testing for adhesion assessment
- Fatigue testing of coated components
- Tribological evaluation under service conditions

# Process Optimization

## Parameter Control

Critical process parameters include:
- Temperature profiles during treatment
- Atmospheric composition and pressure
- Time-temperature relationships
- Cooling rate effects on final properties

## Quality Assurance

Ensuring consistent surface properties:
- Statistical process control methods
- Non-destructive testing techniques
- In-situ monitoring systems
- Predictive maintenance approaches

# Future Directions

## Emerging Technologies

Next-generation surface treatments:
- Additive manufacturing of surface features
- Laser-based surface modification techniques
- Nanostructured surface engineering
- Smart coatings with responsive properties

## Sustainability Considerations

Environmentally conscious approaches:
- Elimination of hazardous chemicals
- Energy-efficient processing methods
- Recyclable coating materials
- Life cycle assessment of surface treatments

# Conclusion

Surface technology and phase transformations represent critical aspects of materials engineering, enabling the development of advanced components with tailored properties. Understanding the relationships between processing, microstructure, and performance provides the foundation for innovative engineering solutions across diverse applications.

Continued research in this field will drive the development of next-generation materials and surface treatments, supporting technological advancement while addressing sustainability and performance requirements.
      `,
      category: "materials science", 
      tags: ["surface technology", "phase transformations", "material performance", "engineering materials"],
      publishDate: "2024",
      readTime: "18 min read"
    },
    {
      id: "5",
      title: "Lean Manufacturing Principles in Aircraft Maintenance Operations",
      excerpt: "Implementation of lean methodologies in aerospace maintenance workflows, examining efficiency improvements and quality assurance practices in commercial aviation.",
      abstract: "The application of lean manufacturing principles to aircraft maintenance operations represents a significant opportunity for improving efficiency, reducing costs, and enhancing safety in commercial aviation. This study examines the implementation of lean methodologies in aerospace maintenance workflows, focusing on measurable improvements in operational efficiency and quality assurance practices. The research addresses the unique challenges of aircraft maintenance including safety-critical operations, complex regulatory compliance, high-value components, and time-sensitive turnaround requirements. Implementation strategy employed comprehensive value stream mapping, 5S methodology for workplace organization, and cross-functional team formation. A Boeing 767 maintenance case study demonstrated quantifiable improvements: 30% reduction in aircraft turnaround time, 25% decrease in maintenance-related delays, 40% improvement in tool availability, 20% reduction in inventory carrying costs, and 15% increase in first-time quality rates. Technology integration included mobile devices for real-time data collection, RFID systems for tracking, and predictive analytics for maintenance scheduling. Quality assurance enhancement through error prevention techniques, standardized work instructions, and continuous monitoring systems. The study addresses implementation barriers including regulatory compliance concerns and resistance to change, providing effective mitigation strategies through regulatory authority engagement and comprehensive training programs.",
      fullContent: `
# Introduction

The application of lean manufacturing principles to aircraft maintenance operations represents a significant opportunity for improving efficiency, reducing costs, and enhancing safety in commercial aviation. This study examines the implementation of lean methodologies in aerospace maintenance workflows, focusing on measurable improvements in operational efficiency and quality assurance practices.

# Lean Manufacturing Fundamentals

## Core Principles

Lean methodology is built on fundamental principles:
- Value identification from customer perspective
- Value stream mapping for process visualization
- Flow optimization through waste elimination
- Pull systems for demand-driven operations
- Continuous improvement culture (Kaizen)

## Waste Identification

The seven types of waste (Muda) in maintenance operations:
- Overproduction of unnecessary maintenance tasks
- Waiting time between maintenance activities
- Transportation of parts and equipment
- Over-processing beyond requirements
- Excess inventory of spare parts
- Unnecessary motion of personnel
- Defects requiring rework

# Aircraft Maintenance Environment

## Regulatory Framework

Maintenance operations must comply with:
- Federal Aviation Administration (FAA) regulations
- European Union Aviation Safety Agency (EASA) standards
- International Civil Aviation Organization (ICAO) guidelines
- Original Equipment Manufacturer (OEM) requirements

## Operational Challenges

Unique aspects of aircraft maintenance:
- Safety-critical nature of all operations
- Complex regulatory compliance requirements
- High-value components and systems
- Time-sensitive turnaround requirements
- Specialized skilled workforce needs

# Lean Implementation Strategy

## Value Stream Mapping

Comprehensive analysis of maintenance processes:
- Current state mapping of existing workflows
- Identification of value-added and non-value-added activities
- Future state design for optimized processes
- Implementation roadmap development

## 5S Methodology

Workplace organization for maintenance facilities:
- Sort (Seiri): Elimination of unnecessary items
- Set in Order (Seiton): Organized tool and part placement
- Shine (Seiso): Systematic cleaning and inspection
- Standardize (Seiketsu): Consistent procedures
- Sustain (Shitsuke): Continuous adherence to standards

# Case Study: Boeing 767 Maintenance

## Background

Implementation of lean principles in Boeing 767 maintenance operations:
- Line maintenance optimization
- Base maintenance efficiency improvements
- Component repair workflow enhancement
- Quality assurance process streamlining

## Methodology

Systematic approach to lean implementation:
- Cross-functional team formation
- Baseline performance measurement
- Process improvement identification
- Pilot program execution
- Full-scale implementation

## Results Achieved

Quantifiable improvements realized:
- 30% reduction in aircraft turnaround time
- 25% decrease in maintenance-related delays
- 40% improvement in tool availability
- 20% reduction in inventory carrying costs
- 15% increase in first-time quality rates

# Technology Integration

## Digital Tools

Modern technology supporting lean implementation:
- Mobile devices for real-time data collection
- RFID systems for tool and part tracking
- Predictive analytics for maintenance scheduling
- Digital work cards for paperless operations

## Maintenance Planning Systems

Advanced planning and scheduling:
- Integrated maintenance planning software
- Resource optimization algorithms
- Predictive maintenance capabilities
- Real-time performance monitoring

# Quality Assurance Enhancement

## Error Prevention

Proactive quality measures:
- Mistake-proofing (Poka-Yoke) techniques
- Standardized work instructions
- Visual management systems
- Peer review processes

## Continuous Monitoring

Quality metrics and monitoring:
- Key Performance Indicators (KPIs) tracking
- Statistical process control implementation
- Root cause analysis procedures
- Corrective action management

# Human Factors Considerations

## Training and Development

Workforce preparation for lean implementation:
- Lean methodology training programs
- Skill development initiatives
- Cross-training for flexibility
- Leadership development

## Cultural Change Management

Organizational transformation:
- Communication strategies
- Employee engagement programs
- Recognition and reward systems
- Change resistance management

# Challenges and Solutions

## Implementation Barriers

Common obstacles encountered:
- Regulatory compliance concerns
- Resistance to change
- Resource allocation constraints
- Measurement system limitations

## Mitigation Strategies

Effective solutions developed:
- Regulatory authority engagement
- Phased implementation approach
- Resource prioritization methods
- Comprehensive training programs

# Economic Impact

## Cost Reduction

Financial benefits achieved:
- Labor cost optimization
- Inventory reduction savings
- Facility utilization improvements
- Delay cost minimization

## Revenue Enhancement

Indirect revenue benefits:
- Improved aircraft availability
- Enhanced customer satisfaction
- Reduced maintenance reserves
- Competitive advantage development

# Sustainability Aspects

## Environmental Benefits

Lean implementation environmental impact:
- Waste reduction in maintenance operations
- Energy efficiency improvements
- Material consumption optimization
- Sustainable disposal practices

## Long-term Viability

Ensuring sustainable improvements:
- Continuous improvement processes
- Performance monitoring systems
- Regular assessment and adjustment
- Knowledge management systems

# Future Directions

## Technology Integration

Emerging technologies for lean maintenance:
- Artificial intelligence for predictive maintenance
- Augmented reality for maintenance procedures
- Internet of Things (IoT) sensors for monitoring
- Blockchain for parts traceability

## Industry Collaboration

Collaborative approaches:
- Best practice sharing among operators
- Industry standards development
- Research partnerships with academia
- Supplier collaboration initiatives

# Conclusion

The implementation of lean manufacturing principles in aircraft maintenance operations demonstrates significant potential for improving efficiency, reducing costs, and enhancing quality while maintaining the highest safety standards. The Boeing 767 case study illustrates the tangible benefits achievable through systematic application of lean methodologies.

Success requires a comprehensive approach encompassing process optimization, technology integration, human factors consideration, and continuous improvement culture. The aviation industry's adoption of lean principles will continue to evolve, driven by competitive pressures and the need for operational excellence in an increasingly complex environment.
      `,
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

  // Comments state
  const [comments, setComments] = useKV<Record<string, Comment[]>>("comments", {
    "article-1": [
      {
        id: "sample-comment-1",
        author: "Dr. Sarah Chen",
        content: "Excellent research on sustainable fasteners! The methodology for testing creep behavior is particularly thorough. Have you considered testing under varying humidity conditions as well?",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 3,
        replies: [
          {
            id: "sample-reply-1",
            author: "Materials Researcher",
            content: "Great point about humidity testing. Environmental factors definitely play a crucial role in long-term performance.",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 1,
            replies: []
          }
        ]
      }
    ],
    "article-2": [
      {
        id: "sample-comment-2",
        author: "Innovation Specialist",
        content: "The frugal innovation approach is brilliant for developing countries. This could significantly impact accessibility to prosthetic devices. Are you planning to pilot this design?",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 5,
        replies: []
      }
    ]
  })
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [activeCommentsDialog, setActiveCommentsDialog] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  // Social sharing state
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  // Reading view state
  const [activeReadingItem, setActiveReadingItem] = useState<{type: 'project' | 'article', item: Project | Article} | null>(null)
  const [isReadingViewOpen, setIsReadingViewOpen] = useState(false)

  // Contact request state
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    itemType: '' as 'project' | 'article' | '',
    itemTitle: ''
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)

  // Contact request functions
  const openContactDialog = (type?: 'project' | 'article', itemTitle?: string) => {
    setContactForm({
      name: '',
      email: '',
      subject: itemTitle ? `Request for more information about: ${itemTitle}` : 'General Inquiry',
      message: itemTitle ? `Hi Mesfinasfaw,\n\nI would like to learn more about your ${type}: "${itemTitle}". Could you please provide additional information or resources?\n\nThank you,` : '',
      itemType: type || '',
      itemTitle: itemTitle || ''
    })
    setIsContactDialogOpen(true)
  }

  const submitContactRequest = async () => {
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      return
    }

    setIsSubmittingContact(true)

    try {
      // Create email body
      const emailBody = `
Name: ${contactForm.name}
Email: ${contactForm.email}
Subject: ${contactForm.subject}

${contactForm.itemType && contactForm.itemTitle ? `Regarding ${contactForm.itemType}: "${contactForm.itemTitle}"` : ''}

Message:
${contactForm.message}

---
Sent from your portfolio website
      `.trim()

      // Create mailto link
      const mailtoLink = `mailto:zewge@student.chalmers.se?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(emailBody)}`
      
      // Open email client
      window.open(mailtoLink)
      
      // Reset form and close dialog
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        itemType: '',
        itemTitle: ''
      })
      setIsContactDialogOpen(false)
      
      // Show success message (you could add a toast here)
      console.log('Contact request sent successfully')
      
    } catch (error) {
      console.error('Error sending contact request:', error)
    } finally {
      setIsSubmittingContact(false)
    }
  }

  // Get user info on mount
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await (window as any).spark.user()
        setUserInfo(user)
      } catch (error) {
        // User info not available, will use guest mode
        console.log('User info not available')
      }
    }
    getUserInfo()
  }, [])

  // Reading view functions
  const openReadingView = (type: 'project' | 'article', item: Project | Article) => {
    setActiveReadingItem({ type, item })
    setIsReadingViewOpen(true)
  }

  const closeReadingView = () => {
    setActiveReadingItem(null)
    setIsReadingViewOpen(false)
  }

  // Comment management functions
  const addComment = (itemId: string, content: string, parentId?: string) => {
    if (!content.trim()) return

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: userInfo?.login || 'Guest User',
      authorAvatar: userInfo?.avatarUrl,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      parentId,
      likes: 0,
      replies: []
    }

    setComments(currentComments => {
      const safeComments = currentComments || {}
      const itemComments = safeComments[itemId] || []
      
      if (parentId) {
        // This is a reply
        const updatedComments = itemComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newCommentObj]
            }
          }
          return comment
        })
        return { ...safeComments, [itemId]: updatedComments }
      } else {
        // This is a top-level comment
        return { ...safeComments, [itemId]: [...itemComments, newCommentObj] }
      }
    })

    setNewComment("")
    setReplyTo(null)
  }

  const likeComment = (itemId: string, commentId: string, isReply = false, parentId?: string) => {
    setComments(currentComments => {
      const safeComments = currentComments || {}
      const itemComments = safeComments[itemId] || []
      
      if (isReply && parentId) {
        const updatedComments = itemComments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: (comment.replies || []).map(reply => 
                reply.id === commentId 
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          }
          return comment
        })
        return { ...safeComments, [itemId]: updatedComments }
      } else {
        const updatedComments = itemComments.map(comment => 
          comment.id === commentId 
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
        return { ...safeComments, [itemId]: updatedComments }
      }
    })
  }

  const getCommentCount = (itemId: string) => {
    const safeComments = comments || {}
    const itemComments = safeComments[itemId] || []
    return itemComments.reduce((total, comment) => {
      return total + 1 + (comment.replies?.length || 0)
    }, 0)
  }

  // Social sharing functions
  const generateShareUrl = (type: 'project' | 'article', item: Project | Article) => {
    const baseUrl = window.location.origin + window.location.pathname
    if (type === 'project') {
      return `${baseUrl}#project-${item.id}`
    } else {
      return `${baseUrl}#article-${item.id}`
    }
  }

  const generateShareText = (type: 'project' | 'article', item: Project | Article) => {
    if (type === 'project') {
      const project = item as Project
      return `Check out "${project.title}" - ${project.description} by Mesfinasfaw Zewge`
    } else {
      const article = item as Article
      return `Read "${article.title}" - ${article.excerpt} by Mesfinasfaw Zewge`
    }
  }

  const shareToTwitter = (type: 'project' | 'article', item: Project | Article) => {
    const url = generateShareUrl(type, item)
    const text = generateShareText(type, item)
    const hashtags = type === 'project' ? 'MaterialsEngineering,AI,SustainableTech' : 'Research,MaterialsScience,Innovation'
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const shareToLinkedIn = (type: 'project' | 'article', item: Project | Article) => {
    const url = generateShareUrl(type, item)
    const text = generateShareText(type, item)
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`
    window.open(linkedInUrl, '_blank', 'width=550,height=420')
  }

  const shareToFacebook = (type: 'project' | 'article', item: Project | Article) => {
    const url = generateShareUrl(type, item)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'width=550,height=420')
  }

  const copyToClipboard = async (type: 'project' | 'article', item: Project | Article) => {
    const url = generateShareUrl(type, item)
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    }
  }

  const shareViaEmail = (type: 'project' | 'article', item: Project | Article) => {
    const url = generateShareUrl(type, item)
    const text = generateShareText(type, item)
    const subject = `Interesting ${type}: ${item.title}`
    const body = `${text}\n\nRead more: ${url}`
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(emailUrl)
  }

  // Comments component
  const CommentsSection = ({ itemId, itemTitle }: { itemId: string; itemTitle: string }) => {
    const itemComments = (comments || {})[itemId] || []
    
    const formatTimeAgo = (timestamp: string) => {
      const now = new Date()
      const commentTime = new Date(timestamp)
      const diffInHours = Math.floor((now.getTime() - commentTime.getTime()) / (1000 * 60 * 60))
      
      if (diffInHours < 1) return 'Just now'
      if (diffInHours < 24) return `${diffInHours}h ago`
      if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`
      return commentTime.toLocaleDateString()
    }

    const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
      <div className={`space-y-3 ${isReply ? 'ml-8 border-l-2 border-muted pl-4' : ''}`}>
        <div className="flex items-start space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.authorAvatar} alt={comment.author} />
            <AvatarFallback className="text-xs">
              {comment.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{comment.author}</span>
              <span className="text-muted-foreground">{formatTimeAgo(comment.timestamp)}</span>
            </div>
            <p className="text-sm leading-relaxed">{comment.content}</p>
            <div className="flex items-center gap-4 text-xs">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-muted-foreground hover:text-foreground"
                onClick={() => likeComment(itemId, comment.id, isReply, comment.parentId)}
              >
                <Heart size={12} className="mr-1" />
                {comment.likes > 0 && comment.likes}
              </Button>
              {!isReply && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setReplyTo(comment.id)}
                >
                  <ArrowBendUpLeft size={12} className="mr-1" />
                  Reply
                </Button>
              )}
            </div>
            
            {/* Reply form */}
            {replyTo === comment.id && (
              <div className="space-y-2 mt-3">
                <Textarea
                  placeholder={`Reply to ${comment.author}...`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] text-sm"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => addComment(itemId, newComment, comment.id)}
                    disabled={!newComment.trim()}
                  >
                    <PaperPlaneTilt size={14} className="mr-1" />
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setReplyTo(null)
                      setNewComment("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    )

    return (
      <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChatCircle size={20} />
            Comments
          </DialogTitle>
          <DialogDescription>
            {itemTitle} • {getCommentCount(itemId)} {getCommentCount(itemId) === 1 ? 'comment' : 'comments'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* New comment form */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={userInfo?.avatarUrl} alt={userInfo?.login || 'Guest'} />
                <AvatarFallback className="text-xs">
                  {(userInfo?.login || 'Guest').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{userInfo?.login || 'Guest User'}</span>
            </div>
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button
                onClick={() => addComment(itemId, newComment)}
                disabled={!newComment.trim()}
              >
                <PaperPlaneTilt size={16} className="mr-2" />
                Post Comment
              </Button>
            </div>
          </div>

          <Separator />
          
          {/* Comments list */}
          <div className="space-y-6">
            {itemComments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ChatCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              itemComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </div>
      </DialogContent>
    )
  }

  // Social sharing buttons component
  const SocialShareButtons = ({ type, item }: { type: 'project' | 'article', item: Project | Article }) => {
    const shareUrl = generateShareUrl(type, item)
    const isCopied = copiedUrl === shareUrl

    return (
      <div className="flex items-center gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              variant="ghost" 
              className="hover:bg-accent/50"
              title="Share"
            >
              <ShareNetwork size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShareNetwork size={20} />
                Share {type === 'project' ? 'Project' : 'Article'}
              </DialogTitle>
              <DialogDescription>
                Share "{item.title}" with others
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Share URL display */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground truncate">{shareUrl}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(type, item)}
                    className="shrink-0"
                  >
                    {isCopied ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </Button>
                </div>
                {isCopied && (
                  <p className="text-xs text-green-600 mt-1">Link copied to clipboard!</p>
                )}
              </div>

              {/* Social platform buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => shareToTwitter(type, item)}
                  className="flex items-center gap-2"
                >
                  <TwitterLogo size={16} />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareToLinkedIn(type, item)}
                  className="flex items-center gap-2"
                >
                  <LinkedinLogo size={16} />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareToFacebook(type, item)}
                  className="flex items-center gap-2"
                >
                  <FacebookLogo size={16} />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => shareViaEmail(type, item)}
                  className="flex items-center gap-2"
                >
                  <EnvelopeSimple size={16} />
                  Email
                </Button>
              </div>

              {/* Share text preview */}
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Share preview:</p>
                <p className="text-sm">{generateShareText(type, item)}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Contact dialog component
  const ContactDialog = () => (
    <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PaperPlane size={20} />
            Request More Information
          </DialogTitle>
          <DialogDescription>
            Send a request to learn more about this {contactForm.itemType || 'topic'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-medium">Name *</label>
            <Input
              id="contact-name"
              placeholder="Your full name"
              value={contactForm.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-medium">Email *</label>
            <Input
              id="contact-email"
              type="email"
              placeholder="your.email@example.com"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contact-subject" className="text-sm font-medium">Subject</label>
            <Input
              id="contact-subject"
              placeholder="Subject"
              value={contactForm.subject}
              onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-medium">Message *</label>
            <Textarea
              id="contact-message"
              placeholder="Please describe what information you're looking for..."
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsContactDialogOpen(false)}
              disabled={isSubmittingContact}
            >
              Cancel
            </Button>
            <Button 
              onClick={submitContactRequest}
              disabled={!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim() || isSubmittingContact}
            >
              {isSubmittingContact ? (
                <>
                  <SpinnerGap size={16} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <PaperPlane size={16} className="mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Reading view component
  const ReadingView = () => {
    if (!activeReadingItem || !isReadingViewOpen) return null

    const { type, item } = activeReadingItem
    const isArticle = type === 'article'
    const article = isArticle ? item as Article : null
    const project = !isArticle ? item as Project : null

    const content = isArticle ? article?.fullContent : (project?.readmeContent || project?.fullDescription)
    const itemId = `${type}-${item.id}`

    // Format content from markdown-like text to JSX
    const formatContent = (text: string) => {
      if (!text) return <p className="text-muted-foreground">Full content coming soon...</p>

      const lines = text.split('\n')
      const elements: React.ReactElement[] = []
      let currentKey = 0

      for (const line of lines) {
        const trimmedLine = line.trim()
        if (!trimmedLine) {
          elements.push(<br key={currentKey++} />)
        } else if (trimmedLine.startsWith('# ')) {
          elements.push(
            <h1 key={currentKey++} className="text-3xl font-bold font-heading mt-8 mb-4 text-primary">
              {trimmedLine.replace('# ', '')}
            </h1>
          )
        } else if (trimmedLine.startsWith('## ')) {
          elements.push(
            <h2 key={currentKey++} className="text-2xl font-semibold font-heading mt-6 mb-3 text-foreground">
              {trimmedLine.replace('## ', '')}
            </h2>
          )
        } else if (trimmedLine.startsWith('### ')) {
          elements.push(
            <h3 key={currentKey++} className="text-xl font-medium font-heading mt-5 mb-2 text-foreground">
              {trimmedLine.replace('### ', '')}
            </h3>
          )
        } else if (trimmedLine.startsWith('- ')) {
          elements.push(
            <li key={currentKey++} className="ml-6 mb-1 text-muted-foreground leading-relaxed">
              {trimmedLine.replace('- ', '')}
            </li>
          )
        } else {
          elements.push(
            <p key={currentKey++} className="mb-4 text-muted-foreground leading-relaxed">
              {trimmedLine}
            </p>
          )
        }
      }

      return <div className="prose prose-lg max-w-none">{elements}</div>
    }

    return (
      <Dialog open={isReadingViewOpen} onOpenChange={closeReadingView}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  {isArticle ? (
                    <>
                      <BookOpen size={20} className="text-primary" />
                      <Badge variant="secondary">{article?.category}</Badge>
                      <span className="text-sm text-muted-foreground">{article?.readTime}</span>
                    </>
                  ) : (
                    <>
                      <Code size={20} className="text-primary" />
                      <Badge variant="secondary">Project</Badge>
                      {project?.stars !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star size={14} />
                          <span>{project.stars}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <DialogTitle className="font-heading text-2xl leading-tight">
                  {item.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {isArticle ? article?.excerpt : project?.description}
                </DialogDescription>
              </div>
              <div className="flex gap-1 shrink-0">
                {/* Action buttons */}
                {project?.githubUrl && (
                  <Button size="sm" variant="ghost" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                      <GithubLogo size={16} />
                    </a>
                  </Button>
                )}
                {project?.demoUrl && (
                  <Button size="sm" variant="ghost" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" title="View Demo">
                      <ArrowUpRight size={16} />
                    </a>
                  </Button>
                )}
                {article?.pdfUrl && article.pdfUrl !== '#' && (
                  <Button size="sm" variant="ghost" asChild>
                    <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer" title="Download PDF">
                      <Download size={16} />
                    </a>
                  </Button>
                )}
                <SocialShareButtons type={type} item={item} />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openContactDialog(type, item.title)}
                  title="Request more information"
                >
                  <PaperPlane size={16} />
                </Button>
                <Dialog 
                  open={activeCommentsDialog === itemId}
                  onOpenChange={(open) => setActiveCommentsDialog(open ? itemId : null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="relative hover:bg-accent/50"
                      title={`${getCommentCount(itemId)} comments`}
                    >
                      <ChatCircle size={16} />
                      {getCommentCount(itemId) > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
                          {getCommentCount(itemId)}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <CommentsSection itemId={itemId} itemTitle={item.title} />
                </Dialog>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={closeReadingView}
                  title="Close"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {(isArticle ? article?.tags : project?.tags)?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Publication/Update info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              {isArticle && article?.publishDate && (
                <div className="flex items-center gap-1">
                  <CalendarBlank size={14} />
                  <span>Published {article.publishDate}</span>
                </div>
              )}
              {project?.updatedAt && (
                <div className="flex items-center gap-1">
                  <CalendarBlank size={14} />
                  <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <ChatCircle size={14} />
                <span>{getCommentCount(itemId)} comments</span>
              </div>
            </div>
          </DialogHeader>
          
          <Separator className="my-4" />
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {/* Abstract section for articles */}
              {isArticle && article?.abstract && (
                <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    Abstract
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{article.abstract}</p>
                </div>
              )}

              {/* README section for projects */}
              {!isArticle && project?.readmeContent && (
                <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    README.md
                  </h3>
                  <div className="text-sm">
                    {formatContent(project.readmeContent)}
                  </div>
                </div>
              )}

              {content ? (
                <div>
                  {!isArticle || !article?.abstract ? (
                    formatContent(content)
                  ) : (
                    <div>
                      <h3 className="font-semibold text-xl mb-4 mt-6">Full Content</h3>
                      {formatContent(content)}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="font-semibold text-lg mb-2">Full Content Coming Soon</h3>
                  <p className="text-muted-foreground">
                    The complete {type} content is being prepared and will be available soon.
                  </p>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {isArticle ? article?.excerpt : project?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

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

  // Fetch README content from GitHub
  const fetchReadmeContent = async (repoFullName: string): Promise<string | null> => {
    try {
      const response = await fetch(`https://api.github.com/repos/${repoFullName}/readme`, {
        headers: {
          'Accept': 'application/vnd.github.v3.raw'
        }
      })
      
      if (response.ok) {
        const content = await response.text()
        return content
      }
      return null
    } catch (error) {
      console.error('Error fetching README:', error)
      return null
    }
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

      // Fetch README content for each repository
      const reposWithReadme = await Promise.all(
        filteredRepos.map(async (repo) => {
          const repoFullName = repos.find(r => r.id.toString() === repo.id)?.full_name
          if (repoFullName) {
            const readmeContent = await fetchReadmeContent(repoFullName)
            return { ...repo, readmeContent: readmeContent || undefined }
          }
          return repo
        })
      )

      // Store all fetched repos for selection
      setAllFetchedRepos(reposWithReadme)
      
      // If no projects selected yet, display all fetched repos
      if ((projects || []).length === 0) {
        setProjects(reposWithReadme)
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
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => openReadingView('project', project)}
                                title="Read More"
                              >
                                <Eye size={16} />
                              </Button>
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
                              <SocialShareButtons type="project" item={project} />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openContactDialog('project', project.title)}
                                title="Request more information"
                              >
                                <PaperPlane size={16} />
                              </Button>
                              <Dialog 
                                open={activeCommentsDialog === `project-${project.id}`}
                                onOpenChange={(open) => setActiveCommentsDialog(open ? `project-${project.id}` : null)}
                              >
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="relative hover:bg-accent/50"
                                    title={`${getCommentCount(`project-${project.id}`)} comments`}
                                  >
                                    <ChatCircle size={16} />
                                    {getCommentCount(`project-${project.id}`) > 0 && (
                                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
                                        {getCommentCount(`project-${project.id}`)}
                                      </Badge>
                                    )}
                                  </Button>
                                </DialogTrigger>
                                <CommentsSection itemId={`project-${project.id}`} itemTitle={project.title} />
                              </Dialog>
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
                                <div className="flex items-center gap-1">
                                  <ChatCircle size={14} />
                                  <span>{getCommentCount(`project-${project.id}`)}</span>
                                </div>
                              </div>
                              {project.updatedAt && (
                                <span className="text-xs">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                              )}
                            </div>

                            {/* Read More Button */}
                            <Button 
                              onClick={() => openReadingView('project', project)}
                              className="w-full mt-4"
                              variant="outline"
                            >
                              <Eye size={16} className="mr-2" />
                              Read More About This Project
                            </Button>
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
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => openReadingView('article', article)}
                            title="Read Full Article"
                          >
                            <Eye size={16} />
                          </Button>
                          {article.pdfUrl && (
                            <Button size="sm" variant="ghost" asChild>
                              <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <Download size={16} />
                              </a>
                            </Button>
                          )}
                          <SocialShareButtons type="article" item={article} />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openContactDialog('article', article.title)}
                            title="Request more information"
                          >
                            <PaperPlane size={16} />
                          </Button>
                          <Dialog 
                            open={activeCommentsDialog === `article-${article.id}`}
                            onOpenChange={(open) => setActiveCommentsDialog(open ? `article-${article.id}` : null)}
                          >
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="relative hover:bg-accent/50"
                                title={`${getCommentCount(`article-${article.id}`)} comments`}
                              >
                                <ChatCircle size={16} />
                                {getCommentCount(`article-${article.id}`) > 0 && (
                                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
                                    {getCommentCount(`article-${article.id}`)}
                                  </Badge>
                                )}
                              </Button>
                            </DialogTrigger>
                            <CommentsSection itemId={`article-${article.id}`} itemTitle={article.title} />
                          </Dialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Abstract preview */}
                        {article.abstract && (
                          <div className="bg-muted/20 rounded-lg p-3 border-l-2 border-primary/30">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText size={14} className="text-primary" />
                              <span className="text-xs font-medium text-primary">Abstract Preview</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {article.abstract.substring(0, 300)}...
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ChatCircle size={14} />
                              <span>{getCommentCount(`article-${article.id}`)}</span>
                            </div>
                            <span>{article.publishDate}</span>
                          </div>
                        </div>

                        {/* Read Full Article Button */}
                        <Button 
                          onClick={() => openReadingView('article', article)}
                          className="w-full"
                          variant="outline"
                        >
                          <BookOpen size={16} className="mr-2" />
                          Read Full Article
                        </Button>
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
                <h3 className="font-heading text-xl font-semibold">Request More Information</h3>
                <p className="text-muted-foreground">
                  Interested in learning more about any of my projects or research? Send me a detailed request.
                </p>
                <Button 
                  onClick={() => openContactDialog()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <PaperPlane size={16} className="mr-2" />
                  Send Information Request
                </Button>
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

      {/* Reading View Modal */}
      <ReadingView />
      
      {/* Contact Dialog */}
      <ContactDialog />
    </div>
  )
}

export default App