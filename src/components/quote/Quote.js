import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../server/firebase'; // adjust the path if needed
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Quote.css';


const GetAQuote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else if (type === 'checkbox') {
      const newServices = formData.services.includes(value)
        ? formData.services.filter((s) => s !== value)
        : [...formData.services, value];
      setFormData({ ...formData, services: newServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const message = `*Quote Request from ${formData.fullName}*\n\n` +
  `📧 *Email:* ${formData.email}\n` +
  `📞 *Phone:* ${formData.phone || 'N/A'}\n` +
  `🏢 *Company:* ${formData.company || 'N/A'}\n\n` +
  `🛠 *Services Needed:* ${formData.services.join(', ')}\n` +
  `💰 *Budget:* ${formData.budget}\n` +
  `📆 *Timeline:* ${formData.timeline}\n\n` +
  `📝 *Description:*\n${formData.description}`;


    const whatsappNumber = '2347043421913';
    const encodedMsg = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
  
    const { file, ...dataWithoutFile } = formData;

    try {
      await addDoc(collection(db, 'quotes'), {
        ...dataWithoutFile,
        createdAt: serverTimestamp()
      });
      
  
      toast.success("Quote submitted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
  
      window.open(whatsappURL, '_blank');
  
      // Reset form
      setFormData({
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
  
      // Redirect after slight delay to show toast
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
  
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="quote-container modern">
      <h1>🚀 Get a Free Quote</h1>
      <p>Tell us what you need, and we'll get back to you on WhatsApp!</p>
      <form className="quote-form" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number (optional)" onChange={handleChange} />
        <input type="text" name="company" placeholder="Company / Brand Name (optional)" onChange={handleChange} />

        <div className="services-display">
          <label>Services Needed:</label>
          <div className="checkbox-display">
            {servicesList.map((service) => (
              <label key={service} className="checkbox-item">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleChange}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        <select name="budget" onChange={handleChange} required>
          <option value="">Select Budget</option>
          <option value="< $1,000">&lt; $1,000</option>
          <option value="$1,000–$5,000">$1,000–$5,000</option>
          <option value="$5,000–$10,000">$5,000–$10,000</option>
          <option value="$10,000+">$10,000+</option>
        </select>

        <select name="timeline" onChange={handleChange} required>
          <option value="">Project Timeline</option>
          <option value="1–2 weeks">1–2 weeks</option>
          <option value="1 month">1 month</option>
          <option value="2–3 months">2–3 months</option>
          <option value="Flexible">Flexible</option>
        </select>

        <textarea
          name="description"
          placeholder="Tell us about your project..."
          rows="5"
          required
          onChange={handleChange}
        ></textarea>

        <input type="file" name="file" onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : '📩 Request Quote'}
        </button>
      </form>
      <ToastContainer />

    </div>
  );
};

export default GetAQuote;
