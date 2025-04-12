import React, { useState } from 'react';
import './Quote.css';


const GetAQuote = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can replace this with API submission logic
    alert("Quote request submitted!");
  };

  return (
    <div className="quote-container">
      <h1>Get a Quote</h1>
      <p>Tell us what you're looking for and we'll be in touch shortly.</p>
      <form className="quote-form" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number (optional)" onChange={handleChange} />
        <input type="text" name="company" placeholder="Company / Brand Name (optional)" onChange={handleChange} />

        <div className="services">
          <label>Services Needed:</label>
          {servicesList.map((service) => (
            <label key={service}>
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

        <button type="submit">Request My Quote</button>
      </form>
    </div>
  );
};

export default GetAQuote;
