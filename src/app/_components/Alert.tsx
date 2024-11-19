import { useEffect } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface AlertProps {
  success?: boolean;
  error?: boolean;
  warning?: boolean;
  customMessage?: string;
  submitTriggered: boolean;
}

const Alert: React.FC<AlertProps> = ({
  success,
  error,
  warning,
  customMessage,
  submitTriggered,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const alert: HTMLElement | null =
      document.getElementById("alert-component");
    if (success) {
      setTimeout(() => {
        alert?.classList.add("fade-out");
      }, 3000);
      setTimeout(() => {
        alert?.parentNode?.removeChild(alert);
      }, 5000);
    }
  }, [success]);

  return (
    submitTriggered && (
      <div
        id="alert-component"
        role="alert"
        className={classNames("alert", {
          "alert-success": success,
          "alert-error": error,
          "alert-warning": warning,
          "alert-info": !success && !error && !warning,
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          {success && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
          {error && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
          {warning && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          )}
        </svg>
        <span>
          {success && t("SEND_SUCCESS")}
          {error && t("SEND_ERROR")}
          {warning && t("FORM_INVALID")}
          {customMessage && customMessage}
        </span>
      </div>
    )
  );
};

export default Alert;
