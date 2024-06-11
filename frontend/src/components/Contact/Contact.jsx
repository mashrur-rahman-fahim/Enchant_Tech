
import React from 'react';
import './Contact.css';
export const Contact = () => {
  return (
    <div class="contact" id="contact">
        <div class="contact_left">
            <h1>CONTACT ME</h1>
            <p><i class="fa-solid fa-paper-plane"></i>mashrur950@gmail.com</p>
            <p><i class="fa-solid fa-phone"></i>+880-140-214-8869</p>
            <div class="social_icons">
                <a href="https://www.facebook.com/hypertextPhoenix"><i class="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com/hypertextphoenix/"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://github.com/mashrur-rahman-fahim"><i class="fa-brands fa-github"></i></a>

            </div>

        </div>
        <div class="contact-right">
            
                <form name="submit-to-google-sheet">
                <input type="text" name="Name" placeholder="Your Name" required></input>
                <input type="email" name="Email" placeholder="Your Email" required></input>
                <textarea name="message" rows="6" placeholder="Message"></textarea>
                <button type="submit">SUBMIT</button>
                </form>
                
            <span id="msg"></span>
        </div>
    </div>
  );
};
 // Exporting the Contact component
