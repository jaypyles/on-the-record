import { Contact } from "@/components/display/contact";
import { useState } from "react";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <section className="w-full py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Contact.Header />
        </div>
      </section>

      <section className="w-full py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-8">
              <Contact.ContactInformation />
              <Contact.Why />
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <Contact.Form
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
