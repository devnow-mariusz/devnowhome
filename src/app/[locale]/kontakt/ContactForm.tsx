"use client";
import { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import classNames from "classnames";
import Link from "next/link";
import { useTranslation, Trans } from "react-i18next";
import { sendEmail } from "../../_utils/sendViaSmtp";
import Alert from "../../_components/Alert";
import { IContactFormData } from "../../shared/interfaces";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [submitResponse, setSubmitResponse] = useState<{
    success: boolean;
    error: boolean;
    submitTriggered: boolean;
  }>({
    success: false,
    error: false,
    submitTriggered: false,
  });

  const [policyChecked, setPolicyChecked] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const kontaktSchema = Yup.object().shape({
    imie: Yup.string()
      .min(2, t("MINIMUM"))
      .max(50, t("MAXIMUM"))
      .required(t("REQUIRED")),
    nazwisko: Yup.string()
      .min(2, t("MINIMUM"))
      .max(50, t("MAXIMUM"))
      .required(t("REQUIRED")),
    email: Yup.string().email(t("EMAIL")).required(t("REQUIRED")),
    wiadomosc: Yup.string()
      .min(5, t("MINIMUM"))
      .max(500, t("MAXIMUM"))
      .required(t("REQUIRED")),
  });

  const submit = async (
    data: IContactFormData,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!captchaValue) {
      setSubmitResponse({ success: false, error: true, submitTriggered: true });
      return;
    }

    const response = await sendEmail({
      ...data,
      recaptchaValue: captchaValue,
    });

    if (response.success) {
      setSubmitResponse({ success: true, error: false, submitTriggered: true });
      resetForm();
      setPolicyChecked(false);
      recaptchaRef.current?.reset();
      setCaptchaValue(null);
      setTimeout(() => {
        setSubmitResponse({
          success: false,
          error: false,
          submitTriggered: false,
        });
      }, 5000);
    } else {
      setSubmitResponse({ success: false, error: true, submitTriggered: true });
    }
  };

  return (
    <Formik
      initialValues={{
        imie: "",
        nazwisko: "",
        email: "",
        wiadomosc: "",
      }}
      validationSchema={kontaktSchema}
      onSubmit={submit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label className="form-control w-full">
            <input
              placeholder={t("form.name")}
              className={classNames("input input-bordered w-full", {
                "input-error": errors.imie && touched.imie,
              })}
              type="text"
              name="imie"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.imie}
            />
            {errors.imie && touched.imie && (
              <div className="label">
                <span className="text-error label-text-alt">{errors.imie}</span>
              </div>
            )}
          </label>
          <label className="form-control w-full">
            <input
              placeholder={t("form.last_name")}
              className={classNames("input input-bordered w-full", {
                "input-error": errors.nazwisko && touched.nazwisko,
              })}
              type="text"
              name="nazwisko"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nazwisko}
            />
            {errors.nazwisko && touched.nazwisko && (
              <div className="label">
                <span className="text-error label-text-alt">
                  {errors.nazwisko}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-full">
            <input
              placeholder={t("form.email_address")}
              className={classNames("input input-bordered w-full", {
                "input-error": errors.email && touched.email,
              })}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <div className="label">
                <span className="text-error label-text-alt">
                  {errors.email}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-full">
            <textarea
              placeholder={t("form.message")}
              className={classNames("textarea textarea-bordered w-full", {
                "textarea-error": errors.wiadomosc && touched.wiadomosc,
              })}
              name="wiadomosc"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.wiadomosc}
            />
            {errors.wiadomosc && touched.wiadomosc && (
              <div className="label">
                <span className="text-error label-text-alt">
                  {errors.wiadomosc}
                </span>
              </div>
            )}
          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4">
                <Trans
                  i18nKey="consent_text"
                  components={{
                    1: (
                      <Link
                        className="link link-accent"
                        href="/polityka-prywatnosci"
                      />
                    ),
                  }}
                />
              </span>
              <input
                checked={policyChecked}
                onChange={() => setPolicyChecked(!policyChecked)}
                type="checkbox"
                className="checkbox"
              />
            </label>
          </div>
          <div className="flex justify-center md:justify-end scale-90 md:scale-100">
            <ReCAPTCHA
              className="flex justify-end"
              ref={recaptchaRef}
              sitekey="6LcTiHMqAAAAAEksqNxi-nMgR0hMlMqlhOee9a3d"
              onChange={setCaptchaValue}
              onExpired={() => setCaptchaValue(null)}
            />
          </div>
          {submitResponse.submitTriggered && (
            <Alert
              success={submitResponse.success}
              error={submitResponse.error}
              submitTriggered={submitResponse.submitTriggered}
            />
          )}
          <div className="card-actions justify-end">
            <button
              type="submit"
              disabled={!policyChecked || !captchaValue || isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                t("button_send")
              )}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;
