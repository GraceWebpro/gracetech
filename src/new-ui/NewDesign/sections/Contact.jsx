import React, { useState, useRef } from 'react'
import { Mail, MapPin, Linkedin, Twitter, Send, MessageSquare } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import { Github, TwitterX } from 'react-bootstrap-icons'
import { SiLinkedin } from 'react-icons/si'
import emailjs from '@emailjs/browser';


const Contact = () => {

    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        message: ''
    });


    const handleChange =(e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const formRef = useRef();
  const [status, setStatus] = useState('');

  const StatusPopup = ({ message, onClose, success }) => {
    if (!message) return null; // don't render if no message
  
    return (
      <div className="status-popup-overlay">
        <div className={`status-popup ${success ? 'success' : 'error'}`}>
          <p>{message}</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await emailjs.send(
        "service_nnrou8o",   // Replace with your EmailJS service ID
        "template_l2yg57v",  // Replace with your EmailJS template ID
        {
          first_name: formRef.current.firstName.value,
          last_name: formRef.current.lastName.value,
          email: formRef.current.email.value,
          phone: formRef.current.phone.value,
          message: formRef.current.message.value,
        },
        "V8YbTK6Cu4MlPG6Q0"    // Replace with your EmailJS public key
      );

      setStatus("Message sent successfully 🎉");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Please try again.");
    }
    setTimeout(() => {
      setStatus('');
    }, 5000); // disappears after 5 seconds
    
  };


      const socialIcons = {
        github: Github,
        linkedin: SiLinkedin,
        twitter: TwitterX,
      };
    
    
  return (
   <section id='contact' className='relative py-20 bg-black overflow-hidden'>
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 opacity-20 rounded-full blur-3xl" />
        </div>


       {/* Popup */}
       <StatusPopup
        message={status}
        success={status.includes("successfully")}
        onClose={() => setStatus('')}
      />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn delay={0}>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                        <MessageSquare className='w-4 h-4 text-primary' />
                        <span className="text-sm text-primary font-medium tracking-wider uppercase">Get In Touch</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Have a project in mind? Let's discuss how we can bring your ideas to life
                    </p>
                </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-12">
                <FadeIn delay={100}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">
                                    Name
                                </label>
                                <input type="text"
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300'
                                        placeholder='Your name' />
                            </div>

                            <div>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input type="email"
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300'
                                        placeholder='Your.email@gmail.com' />
                            </div>

                            <div>
                                <label htmlFor="message" className="">
                                    Message
                                </label>
                                <textarea 
                                        id='message'
                                        name='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300'
                                        placeholder='Tell me about your project...' />
                            </div>

                            <button type='submit' className='w-full px-6 py-3 bg-gradient-to-r from-primary/10 to-primary text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2'>
                                <span>Send Message</span>
                                <Send className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                            </button>

                           
                        </form>
                    </div>
                </FadeIn>

                {/* contact info */}
                <FadeIn delay={200}>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Let's Connect
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                I'm alwasy open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <Mail className='' />
                                    </div>
                                    <div className="">
                                        <p className="">Email</p>
                                        <a href='mailto:gogracetech@gmail.com'
                                        className=''
                                        >
                                            gogracetech@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div>
                                            <MessageSquare className='' />
                                        </div>

                                        <div className="">
                                            <p className="">Call/WhatsApp</p>
                                            <p className="">+234 704 342 1913</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="">Connect with me</p>
                            <div className="">
                                {Object.entries(SOCIAL_LINKS).slice(0, 3).map((platform, url) => {
                                    const Icon = socialIcons[platform];
                                    return Icon ? (
                                        <a key={platform}
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className=''>
                                            <Icon className="" />
                                        </a>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>

   </section>
  )
}

export default Contact
