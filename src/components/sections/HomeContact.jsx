import React from 'react'
import FadeIn from '../animations/FadeIn'
import { MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomeContact = () => {
  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn delay={0}>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase">
                Get in Touch
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              Have a project or question?
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto text-center">
              Click the button below to send a message, and we will get back to you as soon as possible.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/40 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            Send a Message
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

export default HomeContact
