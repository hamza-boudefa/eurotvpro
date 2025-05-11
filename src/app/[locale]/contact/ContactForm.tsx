"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
// import { Poppins } from "next/font/google";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/SectionTitle";

// const poppins = Poppins({ subsets: ['latin'], weight: '700' });

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    let newErrors: Partial<FormData> = {};
    if (!formData.firstName.trim()) newErrors.firstName = t('form.errors.firstName');
    if (!formData.lastName.trim()) newErrors.lastName = t('form.errors.lastName');
    if (!formData.email.trim()) newErrors.email = t('form.errors.email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('form.errors.invalidEmail');
    if (!formData.phone.trim()) newErrors.phone = t('form.errors.phone');
    if (!formData.message.trim()) newErrors.message = t('form.errors.message');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // console.log("Form Submitted", formData);
  
      try {
        // Send form data to the Express backend
        const response = await fetch('/api/contact/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send the form data in JSON format
        });
  
        // const result = await response.json();
        
        if (response.ok) {
          alert('Your message has been sent!');
          setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' }); // Clear the form
        } else {
          alert('success.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('success');
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-black p-6 md:p-12 flex flex-col items-center justify-center py-16 px-4 md:py-24">
      {/* <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-16">
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 ${poppins.className}`}>
          <span className="text-[43px] sm:text-7xl lg:text-8xl stroke-text mb-8 text-stroke-custom text-transparent font-black">
            {t('title')}
          </span>
        </div>
      </h2> */}
               <SectionTitle translation="ContactForm" />
      
      <div className="w-full max-w-5xl border border-red-600 rounded-lg p-6 md:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row gap-10">
          <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder={t('form.firstName')}
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-red-500"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder={t('form.lastName')}
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-red-500"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={t('form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-red-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('form.phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-red-500"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <textarea
                name="message"
                placeholder={t('form.message')}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent text-white border border-gray-600 rounded-lg p-3 h-32 focus:outline-none focus:border-red-500"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {t('form.sendMessage')}
            </button>
          </form>
          <div className="w-full md:w-1/3 text-white flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold mb-4">{t('contactInfo.title')}</h2>
            <p className="text-gray-400 mb-4 text-center md:text-left">
              {t('contactInfo.description')}
            </p>
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-6 w-6 text-red-500" />
              <span className="text-lg" dir="ltr">{t('contactInfo.phone')}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-red-500" />
              <span className="text-lg">{t('contactInfo.email')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}