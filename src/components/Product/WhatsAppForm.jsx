import React, { useState } from 'react';

const WhatsAppForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the message
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    
    // WhatsApp URL with pre-filled message
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Share on WhatsApp</button>
    </form>
  );
};

export default WhatsAppForm;
