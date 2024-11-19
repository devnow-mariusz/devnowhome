import {
  ICallOrderFormData,
  IContactFormData,
  IPriceEstimationFormData,
} from "../shared/interfaces";

export async function sendEmail(data: IContactFormData) {
  const apiEndpoint = "/api/email";

  const recaptchaResponse = await fetch("/api/recaptcha", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ captchaToken: data.recaptchaValue }),
  });

  const recaptchaResult = await recaptchaResponse.json();

  if (recaptchaResult.success) {
    const emailResponse = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await emailResponse.json();
  } else {
    return {
      success: false,
      message: recaptchaResult.message,
    };
  }
}

export async function sendPriceEstimationForm(data: IPriceEstimationFormData) {
  const apiEndpoint = "/api/price-estimation";

  const recaptchaResponse = await fetch("/api/recaptcha", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ captchaToken: data.captchaToken }),
  });

  const recaptchaResult = await recaptchaResponse.json();

  if (recaptchaResult.success) {
    const emailResponse = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await emailResponse.json();
  } else {
    return {
      success: false,
      message: recaptchaResult.message,
    };
  }
}

export async function sendCallOrderForm(data: ICallOrderFormData) {
  const apiEndpoint = "/api/call-order";

  const recaptchaResponse = await fetch("/api/recaptcha", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ captchaToken: data.captchaToken }),
  });

  const recaptchaResult = await recaptchaResponse.json();

  if (recaptchaResult.success) {
    const emailResponse = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await emailResponse.json();
  } else {
    return {
      success: false,
      message: recaptchaResult.message,
    };
  }
}
