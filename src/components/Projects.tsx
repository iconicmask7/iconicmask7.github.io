import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    name: "SLBS LMS",
    subtitle: "Learning Management System",
    featured: true,
    description:
      "Engineered a fully featured LMS application tailored for students and academic institutions. Developed automated attendance tracking, online examinations, and secure certification. Integrated live and recorded online video session capabilities.",
    techStack: ["Flutter", "Live Video", "Attendance Tracking"],
    category: "Education",
    gradient: "from-blue-600 to-indigo-600",
    playStore: "https://play.google.com/store/apps/details?id=com.slbs.app&pcampaignid=web_share",
  },
  {
    id: 2,
    name: "Home Hope",
    subtitle: "Healthcare Ecosystem",
    featured: true,
    description:
      "Architecting a feature-rich healthcare ecosystem to unify medical fields under a single platform with 10+ user roles. Implementing real-time GPS location fetching and integrating hybrid consultation features supporting online telehealth with secure payment.",
    techStack: ["Flutter", "Geolocation", "Telehealth", "Payment Gateway"],
    category: "Healthcare",
    gradient: "from-emerald-500 to-teal-500",
    github: "https://github.com/iconicmask7/",
  },
  {
    id: 3,
    name: "Shrimp App",
    subtitle: "E-commerce Platform",
    featured: false,
    description:
      "Architected a multi-role (Seller, Buyer, Admin) e-commerce app using Django REST API and Riverpod. Introduced Firebase Push Notifications and employed Flutter Flavors for efficient build management.",
    techStack: [
      "Django REST API",
      "Riverpod",
      "Firebase",
      "Flutter Flavors",
      "Push Notifications",
    ],
    category: "E-commerce",
    gradient: "from-blue-500 to-cyan-500",
    github: "https://github.com/iconicmask7/",
  },
  {
    id: 4,
    name: "Ecommerce App",
    subtitle: "Full-Featured",
    description:
      "Developed a full-featured e-commerce app with Django REST API, Riverpod, product catalogs, cart management, and smooth animations. Merged multiple third-party plugins for geolocation and mapping.",
    techStack: ["Django REST", "Riverpod", "Google Maps", "Animations"],
    category: "E-commerce",
    gradient: "from-purple-500 to-pink-500",
    github: "https://github.com/iconicmask7/",
  },
  {
    id: 5,
    name: "Tourism App",
    subtitle: "Firebase Backend",
    description:
      "Built a location-aware tourism guide with Firebase backend for real-time updates on destinations and events. Implemented offline caching using Hive for seamless access.",
    techStack: ["Firebase", "Hive", "Google Maps", "Location Services"],
    category: "Travel",
    gradient: "from-green-500 to-teal-500",
    github: "https://github.com/iconicmask7/",
  },
  {
    id: 6,
    name: "Expense Tracker",
    subtitle: "SQLite Database",
    description:
      "Created a comprehensive budgeting application using SQLite for robust, local-first financial data management. Combined graphical summaries with charts to analyze spending patterns.",
    techStack: ["SQLite", "Charts", "Data Visualization"],
    category: "Finance",
    gradient: "from-orange-500 to-red-500",
    github: "https://github.com/iconicmask7/",
  },
  {
    id: 7,
    name: "Meals App",
    subtitle: "Riverpod State Management",
    description:
      "Configured a recipe planner with Riverpod for reactive UI updates and a filtering system for dietary preferences.",
    techStack: ["Riverpod", "Hive", "Animations", "UI/UX"],
    category: "Food",
    gradient: "from-yellow-500 to-orange-500",
    github: "https://github.com/iconicmask7/",
  },
  {
    id: 8,
    name: "Farmers Fresh Zone",
    subtitle: "Marketplace Platform",
    description:
      "Created a farmer-consumer marketplace with real-time order tracking, inventory management, and secure payment integration. Constructed a comprehensive admin panel.",
    techStack: ["Payment Gateway", "Real-time Tracking", "Admin Panel"],
    category: "Marketplace",
    gradient: "from-lime-500 to-green-500",
    github: "https://github.com/iconicmask7/",
  },
  {
    id: 9,
    name: "Music Player",
    subtitle: "Local State Management",
    description:
      "Developed a full-featured audio player with playlist management, persistent state using Shared Preferences, and background playback. Crafted custom audio controls.",
    techStack: ["Shared Preferences", "Audio Player", "Background Services"],
    category: "Media",
    gradient: "from-indigo-500 to-purple-500",
    github: "https://github.com/iconicmask7/",
  },
];

const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground text-lg">
            Showcasing my mobile app development work
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-secondary"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group ${
                project.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className="h-full p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
                {/* Header with Gradient */}
                <div
                  className={`p-6 rounded-lg bg-gradient-to-br ${project.gradient} mb-4`}
                >
                  <div className="flex items-center justify-between">
                    <Code2 className="h-12 w-12 text-white" />
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on GitHub`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:scale-110 transition-transform"
                        >
                          <Code2 className="h-6 w-6 text-white/80 hover:text-white transition-colors" />
                        </a>
                      )}
                      {project.playStore && (
                        <a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on Play Store`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:scale-110 transition-transform"
                        >
                          <ExternalLink className="h-6 w-6 text-white/80 hover:text-white transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-4">
                    {project.name}
                  </h3>
                  <p className="text-white/80 text-sm">{project.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};