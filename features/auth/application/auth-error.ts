export type AuthErrorInfo = {
  title: string;
  message: string;
};

const authErrors: Record<string, AuthErrorInfo> = {
  invalid_callback_request: {
    title: "Invalid Request",
    message: "Invalid authentication request. Please try again.",
  },
  invalid_code: {
    title: "Authentication Failed",
    message: "Authentication failed. Please try again.",
  },
  state_mismatch: {
    title: "Security Check Failed",
    message: "Security check failed. Please try again.",
  },
  state_not_found: {
    title: "Session Expired",
    message: "Session expired. Please try again.",
  },
  state_invalid: {
    title: "Invalid Session",
    message: "Invalid session. Please try again.",
  },
  email_not_found: {
    title: "Email Not Found",
    message: "No email address found in your account.",
  },
  email_does_not_match: {
    title: "Email Doesn't Match",
    message: "Email doesn't match your account.",
  },
  oauth_provider_not_found: {
    title: "Authentication Provider Not Found",
    message: "Authentication provider not found.",
  },
  unable_to_get_user_info: {
    title: "Failed To Retrieve Account Information",
    message: "Failed to retrieve account information.",
  },
  unable_to_link_account: {
    title: "Linking Failed",
    message: "We couldn't link this account to your profile. Please try again.",
  },
  unable_to_create_user: {
    title: "Failed To Create Account",
    message: "Failed to create account.",
  },
  unable_to_create_session: {
    title: "Failed To Create Session",
    message: "Failed to create session.",
  },
  account_not_linked: {
    title: "Account Not Linked To Your User",
    message: "Account not linked to your user.",
  },
  account_already_linked_to_different_user: {
    title: "Account Already Linked To Different User",
    message: "This account is already linked to another user.",
  },
  signup_disabled: {
    title: "Sign Up Disabled",
    message: "Sign up is currently disabled.",
  },
  internal_server_error: {
    title: "Server Error",
    message: "Server error. Please try again later.",
  },
};

const defaultAuthError: AuthErrorInfo = {
  title: "Unexpected Error",
  message: "Something went wrong.",
};

export function getAuthErrorInfo(code?: string): AuthErrorInfo {
  if (!code) {
    return defaultAuthError;
  }

  return authErrors[code] ?? defaultAuthError;
}

export function isKnownAuthError(code?: string): boolean {
  if (!code) {
    return false;
  }

  if (authErrors[code]) {
    return true;
  }

  return false;
}
