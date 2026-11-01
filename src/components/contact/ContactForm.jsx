"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import AuthField, { inputClass } from "@/components/auth/AuthField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};

    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "That email does not look right.";
    if (message.trim().length < 10) next.message = "Write at least 10 characters.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSending(true);
    // UI only: the message is not sent anywhere.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSending(false);

    toast.success(`Thanks ${name.trim()}! We got your message.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <AuthField id="contact-name" label="Your name" error={errors.name}>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className={inputClass}
        />
      </AuthField>

      <AuthField id="contact-email" label="Your email" error={errors.email}>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </AuthField>

      <AuthField id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          className={cn(inputClass, "h-auto resize-none rounded-2xl py-3")}
        />
      </AuthField>

      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="btn-gloss h-12 w-full rounded-full text-base disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}