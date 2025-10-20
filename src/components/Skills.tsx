import { motion } from "framer-motion";
import { Code2, Smartphone, Database, Wrench, Users } from "lucide-react";

const skills = {
  "Programming Languages": {
    icon: Code2,
    items: [
      { name: "Dart", level: 95 },
      { name: "Python", level: 65 },
      { name: "Kotlin", level: 30 },
      { name: "Java", level: 30 },
      { name: "Swift", level: 25 },
    ],
  },
  "Core Flutter & Mobile": {
    icon: Smartphone,
    items: [
      "Flutter Framework",
      "Widget Lifecycle",
      "Responsive UI",
      "Animations",
      "Custom Painters",
      "Platform Channels",
      "Material Design",
      "Cupertino",
    ],
  },
  "State Management": {
    icon: Database,
    items: [
      { name: "Riverpod", level: 95 },
      { name: "BLoC/Cubit", level: 85 },
      { name: "GetX", level: 80 },
      { name: "Provider", level: 75 },
    ],
  },
  "Backend & Database": {
    icon: Database,
    items: [
      "Firebase",
      "REST APIs",
      "Django REST",
      "SQLite",
      "Hive",
      "Firestore",
      "Shared Preferences",
    ],
  },
  "DevOps & Tools": {
    icon: Wrench,
    items: [
      "Git",
      "Version Control",
      "GitHub Actions",
      "CI/CD",
      "Codemagic",
      "Fastlane",
      "Postman",
      "Figma",
      "Android Studio",
      "VS Code",
    ],
  },
  "Soft Skills": {
    icon: Users,
    items: [
      "Agile/Scrum",
      "Critical Thinking",
      "Team Collaboration",
      "Code Review",
      "Technical Documentation",
    ],
  },
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, data], index) => {
            const Icon = data.icon;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{category}</h3>
                </div>

                <div className="space-y-3">
                  {data.items.map((item, i) => {
                    if (typeof item === "string") {
                      return (
                        <div
                          key={i}
                          className="px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
                        >
                          {item}
                        </div>
                      );
                    } else {
                      return (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-muted-foreground">
                              {item.level}%
                            </span>
                          </div>
                          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
