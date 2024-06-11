import React, { useEffect, useState } from 'react';
import './Contact.css';

export const Contact = () => {
  const scriptURL =
    'https://script.google.com/macros/s/AKfycbzirplFiz5vYDhsCPclLxIdR6oREX2CRjnTMoLYoF0fRQLie03yxuZ3SVrBb6ZQjj8puw/exec';
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    const submitButton = form.querySelector('button[type="submit"]');

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSending(true); // Set isSending to true

      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then((response) => {
          msg.innerHTML = 'Message sent successfully';
          setTimeout(() => {
            msg.innerHTML = '';
          }, 5000);
          form.reset();
          setIsSending(false); // Set isSending to false
        })
        .catch((error) => {
          msg.innerHTML = 'Try again! Message not sent';
          setIsSending(false); // Set isSending to false
        });
    };

    form.addEventListener('submit', handleSubmit);

    // Cleanup the event listener on component unmount
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, [scriptURL]);

  return (
    <div className="contact" id="contact">
      <div className="contact_left">
        <h1>CONTACT US</h1>
        <p>
          <i className="fa-solid fa-paper-plane"></i>example@gmail.com
        </p>
        <p>
          <i className="fa-solid fa-phone"></i>+880-999-9999-999
        </p>
        <div className="social_icons">
          <a href="https://www.facebook.com/hypertextPhoenix">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/hypertextphoenix/">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://github.com/mashrur-rahman-fahim">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      <div className="contact-right">
        <form name="submit-to-google-sheet">
          <input type="text" name="Name" placeholder="Your Name" required />
          <input type="email" name="Email" placeholder="Your Email" required />
          <textarea name="message" rows="6" placeholder="Message"></textarea>
          <button type="submit" className={isSending ? 'sending' : ''}>
            {isSending ? (
              <div className="circle-indicator"></div>
            ) : (
              'SUBMIT'
            )}
          </button>
        </form>
        <span id="msg"></span>
      </div>
    </div>
  );
};

// Exporting the Contact component
