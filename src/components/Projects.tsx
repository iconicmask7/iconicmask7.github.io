import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    name: "Home Hope",
    subtitle: "Healthcare Super App",
    featured: true,
    description:
      "Engineered a feature-rich healthcare Super App unifying 10+ distinct medical roles under a single cross-platform system. Implemented real-time GPS-based geolocation service and architected hybrid consultation flows with Razorpay integration.",
    techStack: ["Flutter", "Geolocation", "Telehealth", "Razorpay"],
    category: "Healthcare",
    gradient: "from-emerald-500 to-teal-500",
    playStore: "https://play.google.com/store/apps/details?id=com.homehope.homeapp",
  },
  {
    id: 2,
    name: "SLBS LMS",
    subtitle: "Learning Management System",
    featured: true,
    description:
      "Engineered a fully featured LMS tailored for students across academic institutions. Developed comprehensive modules including automated attendance tracking, online examinations, and secure certification generation.",
    techStack: ["Flutter", "Live Video", "Attendance Tracking", "Exams"],
    category: "Education",
    gradient: "from-blue-600 to-indigo-600",
    playStore: "https://play.google.com/store/apps/details?id=com.slbs.app&pcampaignid=web_share",
  },
  {
    id: 3,
    name: "SLBS Connect Parent",
    subtitle: "Parent Portal App",
    featured: false,
    description:
      "Architected a Flutter-based Parent Portal using BLoC and Dependency Injection. Engineered core academic modules with dynamic data visualization dashboards (fl_chart) for real-time attendance and exam performance insights.",
    techStack: ["Flutter", "BLoC", "fl_chart", "Socket.IO", "Firebase"],
    category: "Education",
    gradient: "from-purple-500 to-pink-500",
    playStore: "https://play.google.com/store/apps/details?id=com.smartlms.app",
  },
  {
    id: 4,
    name: "SLBS CRM",
    subtitle: "Internal Production",
    featured: false,
    description:
      "Developed a role-based internal CRM using GetX, automating manual tracking workflows for Business Development Executives. Integrated native telephony APIs for seamless in-app calling and lead status updates.",
    techStack: ["Flutter", "GetX", "Telephony APIs", "Firebase Background Services"],
    category: "Business",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Shrimp App",
    subtitle: "E-commerce Platform",
    featured: false,
    description:
      "Architected a multi-role (Seller, Buyer, Admin) e-commerce platform using Django REST API and Riverpod for predictable, scalable state management. Integrated Firebase Push Notifications and employed Flutter Flavors.",
    techStack: [
      "Django REST",
      "Riverpod",
      "Firebase",
      "Flutter Flavors",
    ],
    category: "E-commerce",
    gradient: "from-blue-500 to-cyan-500",
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