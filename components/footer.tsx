import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20 border-t border-border/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Tog'ay Murod Korpusi</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Uzbek literaturasining eng yaxshi asarlaridan biri. Til va milliy merosni tuhfai.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Havolalar</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Biografiya
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Asarlari
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Korpus
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Bog'lanish</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:info@togaymurod.uz" className="hover:text-primary-foreground transition-colors">
                  info@togaymurod.uz
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a href="tel:+998712345678" className="hover:text-primary-foreground transition-colors">
                  +998 (71) 234-56-78
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-primary-foreground/70">
            © 2025 Tog'ay Murod Korpusi. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
