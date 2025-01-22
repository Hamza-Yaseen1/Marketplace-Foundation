'use client';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic (e.g., send data to an API or email service)
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-xl space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center text-teal-600">Contact Us</h2>

      <div>
        <label htmlFor="name" className="block text-lg font-medium text-teal-700">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-medium text-teal-700">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-lg font-medium text-teal-700">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Type your message here..."
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-8 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default Contact;
