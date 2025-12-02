import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

const education = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "University of Kerala",
    duration: "2020 – 2023",
    grade: "6.1 CGPA",
    percentage: 61,
  },
  {
    degree: "Higher Secondary (Computer Science)",
    institution: "St. John's HSS Mattom",
    duration: "2018 – 2020",
    grade: "77%",
    percentage: 77,
  },
  {
    degree: "SSLC",
    institution: "HSS Chettikulangara",
    duration: "2017 – 2018",
    grade: "90%",
    percentage: 90,
  },
];

const certifications = [
  {
    name: "NACTEC Certification in Flutter",
    provider: "NACTEC",
    description:
      "Recognized for excellence in cross-platform app development",
    verified: false,
  },
  {
    name: "Flutter & Dart - The Complete Guide [2024 Edition]",
    provider: "Udemy",
    description:
      "Covered advanced topics including state management (BLoC, Riverpod), animations, and performance optimization",
    date: "Jan 2024",
    verified: true,
  },
  {
    name: "Flutter for Beginners",
    provider: "Great Learning",
    description:
      "Comprehensive introduction covering Flutter and Dart fundamentals, widget architecture, and state management basics",
    verified: false,
  },
  {
    name: "Flutter Hands-on Training",
    provider: "Luminar Technolab",
    description:
      "Gained practical experience in full-stack app development, from UI design to backend integration",
    verified: false,
  },
  {
    name: "Certificate of Participation",
    provider: "Internship Studio",
    description:
      "Enhanced professional skills in teamwork, communication, and project management in a corporate environment",
    verified: false,
  },
  {
    name: "ChatGPT & AI Hacks with MS Office",
    provider: "Skill Nation",
    description:
      "Sharpened skills in integrating AI tools with MS Office for enhanced productivity and workflow automation",
    verified: false,
  },
];

export const Education = () => {
  return (
    <section id="education" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Education & Certifications
          </h2>
          <p className="text-muted-foreground text-lg">
            Academic background and professional certifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div className="space-y-6 relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                  <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
                    <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                    <p className="text-foreground mb-2">{edu.institution}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {edu.duration}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {edu.grade}
                      </span>
                    </div>
                    <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${edu.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold flex-1">{cert.name}</h4>
                    {cert.verified && (
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-primary mb-2">{cert.provider}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.description}
                  </p>
                  {cert.date && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {cert.date}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
