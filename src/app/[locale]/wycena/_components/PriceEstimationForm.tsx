import { FormEvent, useEffect, useRef, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { sendPriceEstimationForm } from "../../../_utils/sendViaSmtp";
import Alert from "../../../_components/Alert";
import {
  IPriceEstimationFormData,
  IFormikProps,
} from "../../../shared/interfaces";
import { steps } from "../../../_static-data/constants";
import { RegEx } from "../../../shared/regex";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../../shared/filesProperties";

interface PriceEstimationFormProps {
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
}

const PriceEstimationForm: React.FC<PriceEstimationFormProps> = ({
  currentStepIndex,
  goToNextStep,
  goToPreviousStep,
  goToStep,
}) => {
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

  const formik = useFormik<IPriceEstimationFormData>({
    initialValues: {
      imie: "",
      nazwisko: "",
      email: "",
      numerTelefonu: "",
      firma: false,
      nazwaFirmy: "",
      miasto: "",
      kodPocztowy: "",
      ulica: "",
      nip: "",
      technologie: [],
      technologia: "",
      brakTechnologii: false,
      opisProjektu: "",
      pliki: [] as File[],
      politykaPrywatnosci: false,
      captchaToken: "",
      projektDeadline: new Date(),
    },
    onSubmit: async (
      data: IPriceEstimationFormData,
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

      const response = await sendPriceEstimationForm({
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
        goToStep(0);
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
      nazwisko: Yup.string()
        .min(2, t("MINIMUM"))
        .max(50, t("MAXIMUM"))
        .required(t("REQUIRED")),
      email: Yup.string().email(t("EMAIL")).required(t("REQUIRED")),
      numerTelefonu: Yup.string()
        .required(t("REQUIRED"))
        .matches(new RegExp(RegEx.PHONE), t("PHONE_WRONG")),
      firma: Yup.boolean(),
      nazwaFirmy: Yup.string()
        .min(1, t("MINIMUM"))
        .max(80, t("MAXIMUM"))
        .when("firma", ([firma], schema) => {
          return firma ? schema.required(t("REQUIRED")) : schema;
        }),
      miasto: Yup.string()
        .min(2, t("MINIMUM"))
        .max(40, t("MAXIMUM"))
        .when("firma", ([firma], schema) => {
          return firma ? schema.required(t("REQUIRED")) : schema;
        }),
      kodPocztowy: Yup.string()
        .matches(new RegExp(RegEx.POSTAL_CODE), t("POSTAL_CODE_INVALID"))
        .when("firma", ([firma], schema) => {
          return firma ? schema.required(t("REQUIRED")) : schema;
        }),
      ulica: Yup.string()
        .min(2, t("MINIMUM"))
        .max(50, t("MAXIMUM"))
        .when("firma", ([firma], schema) => {
          return firma ? schema.required(t("REQUIRED")) : schema;
        }),
      nip: Yup.string()
        .matches(new RegExp(RegEx.NIP), t("NIP_INVALID"))
        .when("firma", ([firma], schema) => {
          return firma ? schema.required(t("REQUIRED")) : schema;
        }),
      technologie: Yup.array()
        .of(
          Yup.object({
            nazwa: Yup.string().required(t("REQUIRED")),
          })
        )
        .when(["brakTechnologii"], ([brakTechnologii], schema) => {
          return brakTechnologii
            ? schema
            : Yup.array().min(1, t("MINIMUM_ELEMENTS_LENGTH"));
        }),
      technologia: Yup.string().when(
        ["technologie", "brakTechnologii"],
        ([technologie, brakTechnologii], schema) => {
          return technologie.length === 0 && !brakTechnologii
            ? Yup.string().required(t("MINIMUM_ELEMENTS_LENGTH"))
            : brakTechnologii
            ? schema
            : schema;
        }
      ),
      brakTechnologii: Yup.boolean(),
      opisProjektu: Yup.string(),
      pliki: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required(),
          type: Yup.string()
            .test("is-valid-type", t("FILE_BROKEN"), (value) =>
              Boolean(value && value.trim() !== "")
            )
            .oneOf(SUPPORTED_FORMATS, t("FILE_TYPE")),
          data: Yup.string().required(),
          size: Yup.number().max(FILE_SIZE, t("FILE_SIZE")),
        })
      ),
      politykaPrywatnosci: Yup.boolean().oneOf(
        [true],
        t("POLICY_CHECK_REQUIRED")
      ),
      captchaToken: Yup.string().required(t("RECAPTCHA_REQUIRED")),
      projektDeadline: Yup.date().required(t("REQUIRED")),
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

  const StepComponent: React.FC<IFormikProps> =
    steps[currentStepIndex].component;

  const formProps: IFormikProps = {
    errors: formik.errors,
    touched: formik.touched,
    values: formik.values,
    validateForm: formik.validateForm,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    setFieldValue: formik.setFieldValue,
    setFieldTouched: formik.setFieldTouched,
  };

  return (
    <FormikProvider value={formik}>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex w-full items-center flex-col mt-10">
          <StepComponent {...formProps} />
        </div>
        {submitResponse.submitTriggered &&
          (currentStepIndex === 4 || submitResponse.success) && (
            <div className="2xl:w-1/4 mt-10">
              <Alert
                success={submitResponse.success}
                error={submitResponse.error}
                warning={submitResponse.warning}
                submitTriggered={submitResponse.submitTriggered}
              />
            </div>
          )}
        <div className="flex justify-between w-full mt-10">
          <div>
            <button
              className="btn btn-primary mr-2"
              onClick={goToPreviousStep}
              disabled={currentStepIndex === 0}
              type="button"
            >
              {t("button_back")}
            </button>
            <button
              className="btn btn-primary"
              onClick={goToNextStep}
              disabled={currentStepIndex === steps.length - 1}
              type="button"
            >
              {t("button_next")}
            </button>
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              {formik.isSubmitting ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                t("button_send")
              )}
            </button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default PriceEstimationForm;
