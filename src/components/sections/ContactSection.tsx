import { Mail, Phone, Github, Linkedin } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "nayanpatel682003@gmail.com",
    href: "mailto:nayanpatel682003@gmail.com",
    color: "text-peach",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 74168 76880",
    href: "tel:+917416876880",
    color: "text-teal",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "syrax-dev",
    href: "https://github.com/syrax-dev",
    color: "text-lavender",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "nayanpatel68",
    href: "https://www.linkedin.com/in/nayanpatel68/",
    color: "text-primary",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4">
              Feel free to reach out for collaborations or just a friendly chat
            </p>
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactLinks.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass rounded-xl p-6 hover-lift group flex items-center gap-4"
                >
                  <div className={`p-3 rounded-xl bg-muted ${contact.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{contact.label}</p>
                    <p className="font-medium">{contact.value}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
