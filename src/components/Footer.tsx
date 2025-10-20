import { ArrowUp, Heart } from "lucide-react";
import { Button } from "./ui/button";

const footerLinks = {
  "Quick Links": ["Home", "Projects", "Skills", "Contact"],
  Connect: ["LinkedIn", "GitHub", "Email", "Phone"],
  Resources: ["Resume", "Portfolio"],
};

export const Footer = () => {
  const scrollToSection = (section: string) => {
    const element = document.querySelector(`#${section.toLowerCase()}`);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (link: string) => {
    const linkMap: Record<string, string> = {
      Home: "hero",
      Projects: "projects",
      Skills: "skills",
      Contact: "contact",
      LinkedIn: "https://linkedin.com/in/suraj-s-pillai-vk187",
      GitHub: "https://github.com/iconicmask7",
      Email: "mailto:surajspillai57@gmail.com",
      Phone: "tel:+919567846357",
      Resume: "/SURAJ_S_PILLAI_Resume.pdf",
      Portfolio: "hero",
    };

    const target = linkMap[link];
    if (target.startsWith("http") || target.startsWith("mailto") || target.startsWith("tel")) {
      window.open(target, "_blank");
    } else if (target.endsWith(".pdf")) {
      const a = document.createElement("a");
      a.href = target;
      a.download = "Suraj_S_Pillai_Flutter_Developer_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      scrollToSection(target);
    }
  };

  return (
    <footer className="relative bg-muted/30 border-t border-border/50">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Top Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-2">SURAJ S PILLAI</h3>
          <p className="text-muted-foreground">
            Flutter Developer • Mobile App Engineer
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Building exceptional mobile experiences, one app at a time.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={scrollToTop}
            variant="outline"
            className="rounded-full"
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            Back to Top
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Suraj S Pillai. Built with React &
            <Heart className="h-4 w-4 text-red-500 fill-current" />
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Designed to inspire. Developed to perform.
          </p>
        </div>
      </div>
    </footer>
  );
};
