"use client";
import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/Spinner";

// most of this code is taken directly from the emailjs website, added styling, and a success and error message
// sends an email to contact@meadtools.com
const ContactUs = () => {
  const { t } = useTranslation();
  const form = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);

    if (form.current)
      emailjs
        .sendForm(
          "service_3kmg80f",
          "template_5pwnpf5",
          form.current,
          "2G-OLW9VI5seyvCUK"
        )
        .then(
          (res) => {
            if (res.text !== "OK") throw new Error(res.text);
            const target = e.target as HTMLFormElement;
            target.reset();
            toast({ description: t("success") });
          },
          (error) => {
            console.error(error.text);
            toast({ description: t("error"), variant: "destructive" });
          }
        )
        .finally(() => setDisabled(false));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <h1 className="text-3xl">{t("contactHeading")}</h1>
      <form ref={form} onSubmit={sendEmail} className="grid w-full gap-4 p-8">
        <span className="flex items-center justify-between">
          <label>{t("name")}</label>
          <Input className="w-9/12" type="text" name="user_name" required />
        </span>
        <span className="flex items-center justify-between">
          <label>{t("email")}</label>
          <Input className="w-9/12" type="email" name="user_email" required />
        </span>
        <span className="flex items-center justify-between">
          <label>{t("message")}</label>
          <Textarea className="w-9/12" required name="message" />
        </span>
        <span className="flex items-center justify-center">
          <Button disabled={disabled} className="px-10">
            {disabled ? <Spinner variant="small" /> : t("send")}
          </Button>
        </span>
      </form>
    </div>
  );
};

export default ContactUs;
