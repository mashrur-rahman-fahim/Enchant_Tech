
import React from 'react';
import './Contact.css';
export const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <br></br>
      <p>If you have any questions, feedback, or inquiries, please feel free to get in touch with us.</p>
      <br></br>
      <h2>Contact Information</h2>
      <br></br>
      <p>Email: contact@enchanttech.com</p>
      <p>Phone: +01923742212</p>
      <p>Address: 12D,Banani,Dhaka</p>
      <br></br>
      <h2>Send us a Message</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
 // Exporting the Contact component
