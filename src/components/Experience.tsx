import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Cybios Technologies Pvt Ltd",
    role: "Mobile App Developer",
    location: "Ernakulam, India",
    duration: "Feb 2024 – Present",
    type: "Current",
    achievements: [
      {
        text: "Led the design, development, and shipping of Android and iOS applications on Google Play Store and Apple App Store, adhering to the full Software Development Lifecycle (SDLC)",
        metrics: ["SDLC", "Android", "iOS"],
      },
      {
        text: "Improved overall app responsiveness by 15% through advanced performance profiling, widget rebuild optimization, and memory leak detection",
        metrics: ["15% improvement"],
      },
      {
        text: "Architected and applied a scalable, modular architecture using Flutter Riverpod, reducing code boilerplate by 40% and minimizing state management regressions",
        metrics: ["40% reduction", "Riverpod"],
      },
      {
        text: "Built a robust data layer by incorporating Django REST APIs with advanced caching strategies (Dio), local persistence (Hive), and graceful error handling, ensuring 99.9% uptime",
        metrics: ["99.9% uptime", "Django", "Hive"],
      },
      {
        text: "Actively participated in an Agile/Scrum environment, contributing to daily stand-ups, sprint planning, and retrospectives to deliver high-quality releases bi-weekly",
        metrics: ["Agile/Scrum"],
      },
      {
        text: "Designed a custom responsive configuration system for Flutter, providing centralized control over screen adaptation logic",
        metrics: ["Responsive UI"],
      },
      {
        text: "Conducted authorized web-application penetration tests (WAPT) and red-team exercises, identifying and documenting critical vulnerabilities",
        metrics: ["Security Testing"],
      },
    ],
    techStack: [
      "Riverpod",
      "Django",
      "Flutter",
      "Dart",
      "Agile",
      "Performance",
      "Security",
      "SDLC",
    ],
  },
  {
    id: 2,
    company: "Luminar Technolab",
    role: "Flutter Developer Intern",
    location: "Ernakulam, India",
    duration: "Jun 2023 – Dec 2023",
    type: "Internship",
    achievements: [
      {
        text: "Built and launched production-ready mobile applications, resulting in a 30% improvement in user engagement metrics post-launch",
        metrics: ["30% improvement"],
      },
      {
        text: "Connected Firebase services, including Authentication, Firestore, and Realtime Database, for secure user management and real-time data synchronization",
        metrics: ["Firebase", "Authentication"],
      },
      {
        text: "Leveraged GetX for state management, dependency injection, and route management, reducing code complexity by 25%",
        metrics: ["25% reduction", "GetX"],
      },
      {
        text: "Collaborated closely with UI/UX designers to translate Figma mockups into pixel-perfect, responsive, and animated layouts using Flutter widgets",
        metrics: ["Figma", "UI/UX"],
      },
      {
        text: "Employed essential third-party Flutter plugins, including google_maps_flutter and location, to enhance app functionality with geolocation and interactive maps",
        metrics: ["Google Maps"],
      },
    ],
    techStack: [
      "GetX",
      "Firebase",
      "Figma",
      "Google Maps",
      "UI/UX",
      "Animations",
      "Flutter",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            Building high-performance mobile applications
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute top-8 w-4 h-4 rounded-full bg-primary border-4 border-background left-1/2 transform -translate-x-1/2" />

                {/* Card */}
                <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xl text-foreground mb-2">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        exp.type === "Current"
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {exp.type}
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-3 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/20 hover:border-primary/50 transition-colors"
                      >
                        {achievement.text}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, i) => (
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
      </div>
    </section>
  );
};
