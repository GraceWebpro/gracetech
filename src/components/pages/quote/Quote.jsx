import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import StatusPopup from '../../ui/StatusPopup';

const GetAQuote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const [status, setStatus] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    budget: '',
    timeline: '',
    description: '',
    file: null
  });

  const servicesList = [
    "Web Development",
    "UI/UX Design",
    "Branding",
    "Marketing Strategy",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const newServices = formData.services.includes(value)
        ? formData.services.filter(s => s !== value)
        : [...formData.services, value];
      setFormData({ ...formData, services: newServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setLoading(true);

    try {
      await emailjs.send(
        "service_nnrou8o",   // Replace with your EmailJS service ID
        "template_f90yfbq",  // Replace with your EmailJS template ID
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'N/A',
          company: formData.company || 'N/A',
          services: formData.services.join(', ') || 'N/A',
          budget: formData.budget || 'N/A',
          timeline: formData.timeline || 'N/A',
          description: formData.description
        },
        "V8YbTK6Cu4MlPG6Q0"    // Replace with your EmailJS public key
      );
      toast.success('Quote submitted successfully!', { autoClose: 2000 });

      setStatus("Your quote request has been sent successfully! 🎉");      
      formRef.current.reset();
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        services: [],
        budget: '',
        timeline: '',
        description: ''
      });
      navigate('/thank-you');

    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Please try again.");
    }
    setTimeout(() => {
      setStatus('');
    }, 5000); // disappears after 5 seconds
    
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const message = `*Quote Request from ${formData.fullName}*\n\n` +
  //     `📧 *Email:* ${formData.email}\n` +
  //     `📞 *Phone:* ${formData.phone || 'N/A'}\n` +
  //     `🏢 *Company:* ${formData.company || 'N/A'}\n\n` +
  //     `🛠 *Services Needed:* ${formData.services.join(', ')}\n` +
  //     `💰 *Budget:* ${formData.budget}\n` +
  //     `📆 *Timeline:* ${formData.timeline}\n\n` +
  //     `📝 *Description:*\n${formData.description}`;
    
  //   const whatsappNumber = '2347043421913';
  //   const encodedMsg = encodeURIComponent(message);
  //   const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
    
  //   const { file, ...dataWithoutFile } = formData;

  //   try {
  //     await addDoc(collection(db, 'quotes'), {
  //       ...dataWithoutFile,
  //       createdAt: serverTimestamp()
  //     });

  //     toast.success("Quote submitted successfully!", { position: "top-center", autoClose: 2000 });
  //     window.open(whatsappURL, '_blank');

  //     setFormData({
  //       fullName: '',
  //       email: '',
  //       phone: '',
  //       company: '',
  //       services: [],
  //       budget: '',
  //       timeline: '',
  //       description: '',
  //       file: null
  //     });

  //     setTimeout(() => navigate('/thank-you'), 2000);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong. Try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 mt-12">
       {/* Popup */}
       <StatusPopup
        message={status}
        success={status.includes("successfully")}
        onClose={() => setStatus('')}
      />
     <div className="text-center mb-12">
      <h1 className="text-4xl md:text-4xl font-semibold text-white mb-4">
        Start Your Project or Get a Quote
      </h1>
      <p className="text-white/60 text-lg max-w-xl mx-auto text-center">
        Share your ideas, project details, or service needs, and we’ll get back to you promptly via WhatsApp with next steps and a personalized quote.
      </p>
    </div>


      <form ref={formRef} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6 shadow-lg" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone Number (optional)"
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          placeholder="Company / Brand Name (optional)"
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />

        {/* Services */}
        <div className="space-y-2">
          <label className="text-white/70 font-medium">Services Needed:</label>
          <div className="flex flex-wrap gap-3">
            {servicesList.map(service => (
              <label
                key={service}
                className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl cursor-pointer hover:bg-primary/20 transition-all min-w-[150px]"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleChange}
                  className="accent-primary w-4 h-4 flex-shrink-0"
                  style={{ marginLeft: '10px', marginBottom: '8px'}}
                />
                <span style={{ marginRight: '10px'}} className="text-white text-sm flex-1 truncate">{service}</span>
              </label>
            ))}
          </div>
        </div>


        {/* Budget & Timeline */}
        <div className="flex flex-col md:flex-row gap-4">
          <select name="budget" required onChange={handleChange} className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all">
            <option value="">Select Budget</option>
            <option value="< $1,000">&lt; $1,000</option>
            <option value="$1,000–$5,000">$1,000–$5,000</option>
            <option value="$5,000–$10,000">$5,000–$10,000</option>
            <option value="$10,000+">$10,000+</option>
          </select>

          <select name="timeline" required onChange={handleChange} className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all">
            <option value="">Project Timeline</option>
            <option value="1–2 weeks">1–2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2–3 months">2–3 months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Tell us about your project..."
          rows="5"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />


        <button
          type="submit"
          disabled={loading}
          className="send-button"
          // className="w-full py-3 bg-gradient-to-r from-primary/50 to-primary/80 text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60"
        >
          {loading ? 'Sending...' : '📩 Request Quote'}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default GetAQuote;
