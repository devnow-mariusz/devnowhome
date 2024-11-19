import { FormEvent, useEffect, useRef, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { Trans, useTranslation } from "react-i18next";
import classNames from "classnames";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { RegEx } from "../shared/regex";
import { sendCallOrderForm } from "../_utils/sendViaSmtp";
import { ICallOrderFormData } from "../shared/interfaces";
import Alert from "../_components/Alert";

const CallOrderForm: React.FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const { t } = useTranslation();

  const initialSubmitResponse = {
    success: false,
    error: false,
    warning: false,
    submitTriggered: false,
  };

  const [submitResponse, setSubmitResponse] = useState<{
    success: boolean;
    error: boolean;
    warning: boolean;
    submitTriggered: boolean;
  }>(initialSubmitResponse);

  const formik = useFormik<ICallOrderFormData>({
    initialValues: {
      imie: "",
      numerTelefonu: "",
      politykaPrywatnosci: false,
      captchaToken: "",
    },
    onSubmit: async (
      data: ICallOrderFormData,
      { resetForm }: { resetForm: () => void }
    ) => {
      if (!formik.values.captchaToken) {
        setSubmitResponse({
          success: false,
          error: true,
          warning: false,
          submitTriggered: true,
        });
        return;
      }

      const response = await sendCallOrderForm({
        ...data,
        captchaToken: formik.values.captchaToken,
      });

      if (response.success) {
        setSubmitResponse({
          success: true,
          error: false,
          warning: false,
          submitTriggered: true,
        });
        recaptchaRef.current?.reset();
        resetForm();
        setTimeout(() => {
          setSubmitResponse(initialSubmitResponse);
        }, 5000);
      } else {
        setSubmitResponse({
          success: false,
          error: true,
          warning: false,
          submitTriggered: true,
        });
      }
    },
    validationSchema: Yup.object().shape({
      imie: Yup.string()
        .min(2, t("MINIMUM"))
        .max(50, t("MAXIMUM"))
        .required(t("REQUIRED")),
      numerTelefonu: Yup.string()
        .required(t("REQUIRED"))
        .matches(new RegExp(RegEx.PHONE), t("PHONE_WRONG")),
      captchaToken: Yup.string().required(t("RECAPTCHA_REQUIRED")),
      politykaPrywatnosci: Yup.boolean().oneOf(
        [true],
        t("POLICY_CHECK_REQUIRED")
      ),
    }),
  });

  const isFormValid = formik.isValid;

  useEffect(() => {
    setSubmitResponse(initialSubmitResponse);
  }, [!isFormValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.submitForm();
      } else {
        formik.submitForm();
        setSubmitResponse({
          success: false,
          error: false,
          warning: true,
          submitTriggered: true,
        });
      }
    });
  };

  return (
    <FormikProvider value={formik}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="form-control w-full text-neutral-950">
          <input
            placeholder={t("call_order_modal.name")}
            className={classNames("input input-bordered w-full", {
              "input-error": formik.errors.imie && formik.touched.imie,
            })}
            type="text"
            name="imie"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imie}
          />
          {formik.errors.imie && formik.touched.imie && (
            <div className="label">
              <span className="text-error label-text-alt">
                {formik.errors.imie}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full text-neutral-950">
          <input
            placeholder={t("call_order_modal.phone_number")}
            className={classNames("input input-bordered w-full", {
              "input-error":
                formik.errors?.numerTelefonu && formik.touched?.numerTelefonu,
            })}
            type="tel"
            name="numerTelefonu"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.numerTelefonu}
          />
          {formik.touched?.numerTelefonu && formik.errors?.numerTelefonu ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {formik.errors.numerTelefonu}
              </span>
            </div>
          ) : null}
        </label>
        <label className="label cursor-pointer justify-end ">
          <span className="label-text text-base-100">
            <Trans
              i18nKey="call_order_modal.privacy_policy_consent"
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
            type="checkbox"
            className="checkbox ml-2"
            name="politykaPrywatnosci"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.politykaPrywatnosci}
          />
        </label>
        <div className="flex justify-center md:justify-end scale-90 md:scale-100">
          <ReCAPTCHA
            className="flex justify-end z-50"
            ref={recaptchaRef}
            sitekey="6LcTiHMqAAAAAEksqNxi-nMgR0hMlMqlhOee9a3d"
            onChange={(value) => {
              formik.setFieldValue("captchaToken", value);
            }}
            onExpired={() => formik.setFieldValue("captchaToken", "")}
          />{" "}
        </div>
        {submitResponse.submitTriggered && submitResponse.success && (
          <div className="2xl:w-1/4 mt-10">
            <Alert
              success={submitResponse.success}
              error={submitResponse.error}
              warning={submitResponse.warning}
              submitTriggered={submitResponse.submitTriggered}
            />
          </div>
        )}
        <div className="card-actions justify-end">
          <button
            type="submit"
            disabled={
              !formik.values.captchaToken ||
              !formik.values.politykaPrywatnosci ||
              formik.isSubmitting
            }
            className="btn btn-primary"
          >
            {formik.isSubmitting ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              t("call_order_modal.button_send")
            )}
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CallOrderForm;
