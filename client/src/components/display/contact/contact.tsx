import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Header = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl text-black mb-4 font-display">
        Get in Touch
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Have questions about our music marketplace? Want to collaborate with us?
        We'd love to hear from you. Send us a message and we'll respond as soon
        as possible.
      </p>
    </div>
  );
};

export const Why = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-display font-normal">
          Why Contact Us?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-3">•</span>
            Questions about our artist profit-sharing model
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">•</span>
            Partnership opportunities
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">•</span>
            Technical support for your account
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">•</span>
            Feedback on our platform
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">•</span>
            Media inquiries
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export type FormProps = {
  handleInputChange: (e: any) => void;
  handleSubmit: (e: any) => Promise<void>;
  formData: any;
};

export const Form = ({
  handleSubmit,
  formData,
  handleInputChange,
}: FormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-display font-normal">
          Send us a Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-2">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="subject" className="mb-2">
              Subject *
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What's this about?"
              required
            />
          </div>

          <div>
            <Label htmlFor="message" className="mb-2">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more about your inquiry..."
              rows={6}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export const ContactInformation = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display font-normal">
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 ">Email</h3>
            <p className="text-muted-foreground">
              customerservice@readontherecord.com
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">+1 (855) 595-7774</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-muted-foreground">
              123 Music Street
              <br />
              Los Angeles, CA 90210
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 6:00 PM PST
              <br />
              Saturday: 10:00 AM - 4:00 PM PST
              <br />
              Sunday: Closed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
