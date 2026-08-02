import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black/40 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 mb-8">
              Have a project in mind? I'm always interested in hearing about new ideas and opportunities.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:panarirasul@gmail.com" className="text-white font-medium hover:text-primary transition-colors">
                    panarirasul@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href="tel:+917204986825" className="text-white font-medium hover:text-primary transition-colors">
                    +91 72049 86825
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-white font-medium">Bengaluru, India</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4 bg-card/50 p-8 rounded-2xl border border-white/5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                placeholder="Tell me about your project..."
              />
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Rasul Panari. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}