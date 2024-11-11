import React from "react";
import MainLayouts from "@/components/layout/MainLayouts";
const ContactPage: React.FC = () => {
  return (
    <MainLayouts>
      <div
        className="bg-[#F5F5F7] py-12 px-6"
        style={{ maxWidth: "100vw", maxHeight: "79vh", margin: "0 auto" }}
      >
        <h1 className="text-3xl font-bold mb-6 font-georgia">Contact Us</h1>
        <p className="text-lg mb-4 font-georgia">
        We’re excited to connect with you! At <strong>Ming's Cake</strong>,we value your input and strive 
        to make every experience delightful. Whether you have inquiries about our delectable cake
         selections, need help with an order, or simply want to share your thoughts, we’re here 
         to ensure your special moments are unforgettable!
        </p>
        <h2 className="text-3xl font-semibold mt-6 mb-2 font-georgia">
          How to Reach Us
        </h2>
        <ul className="list-disc ml-6 mb-4 font-georgia">
          <li>
            Email:{" "}
            <a
              href="mailto:support@meowcake.com"
              className="text-blue-600"
            >
              support@meowcakes.com
            </a>
          </li>
          <li>
            Phone: <strong>(987) 654-3210</strong> (Mon-Fri, 9 AM - 5 PM EST)
          </li>
          <li>
            Social Media:
            <ul className="list-inside list-disc ml-4">
              <li>
                <a
                  href="https://instagram.com/meowcake"
                  className="text-blue-600"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/meowcake"
                  className="text-blue-600"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/meowcake"
                  className="text-blue-600"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-lg mb-4 font-georgia">
          Thank you for choosing <strong>Ming's Cake</strong>! We look
          forward to connecting with you!
        </p>
      </div>
    </MainLayouts>
  );
};

export default ContactPage;