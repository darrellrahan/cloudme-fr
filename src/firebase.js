import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOLl9uSTIwl_oGXz7XyVmIx84Byk1JqRw",
  authDomain: "cloudme-great.firebaseapp.com",
  projectId: "cloudme-great",
  storageBucket: "cloudme-great.appspot.com",
  messagingSenderId: "303230980218",
  appId: "1:303230980218:web:f39c9c1bad9bd5698d2bc3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

async function addFolder(name, uid, currentFolder, path) {
  if (currentFolder === null) return;

  try {
    await addDoc(collection(db, "folders"), {
      name: name,
      uid: uid,
      parentId: currentFolder.id,
      path: path,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    alert("Error adding document: ", e);
  }
}
function signInWithGoogle() {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
async function logInWithEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
}
function registerWithEmailAndPassword(name, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, { displayName: name });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (error) {
    console.error(error.message);
  }
}
function logout() {
  signOut(auth);
}

const errors = [
  {
    code: "auth/admin-restricted-operation",
    message: "This operation is restricted to administrators.",
  },
  { code: "auth/argument-error", message: "Invalid arguments provided." },
  {
    code: "auth/app-not-authorized",
    message: "This app is not authorized to use Firebase.",
  },
  {
    code: "auth/app-not-installed",
    message: "This app is not installed on your device.",
  },
  {
    code: "auth/captcha-check-failed",
    message: "Google reCAPTCHA check failed.",
  },
  { code: "auth/code-expired", message: "The provided code has expired." },
  { code: "auth/cordova-not-ready", message: "Cordova is not ready." },
  {
    code: "auth/cors-unsupported",
    message: "CORS is not supported by your browser.",
  },
  {
    code: "auth/credential-already-in-use",
    message: "This credential is already associated with another account.",
  },
  {
    code: "auth/custom-token-mismatch",
    message: "The custom token and API key do not match.",
  },
  {
    code: "auth/requires-recent-login",
    message: "Please login again, as your last login was too long ago.",
  },
  {
    code: "auth/dependent-sdk-initialized-before-auth",
    message:
      "Please initialize the Firebase Auth SDK before other dependent SDKs.",
  },
  {
    code: "auth/dynamic-link-not-activated",
    message: "Dynamic links are not activated.",
  },
  {
    code: "auth/email-change-needs-verification",
    message: "Please verify your new email address.",
  },
  {
    code: "auth/email-already-in-use",
    message: "The email address is already in use.",
  },
  {
    code: "auth/emulator-config-failed",
    message: "Emulator configuration failed.",
  },
  { code: "auth/expired-action-code", message: "The action code has expired." },
  {
    code: "auth/cancelled-popup-request",
    message: "The popup request has been cancelled.",
  },
  { code: "auth/internal-error", message: "An internal error has occurred." },
  { code: "auth/invalid-api-key", message: "The provided API key is invalid." },
  {
    code: "auth/invalid-app-credential",
    message: "The app credential is invalid.",
  },
  { code: "auth/invalid-app-id", message: "The app ID is invalid." },
  { code: "auth/invalid-user-token", message: "Invalid user token." },
  { code: "auth/invalid-auth-event", message: "Invalid authentication event." },
  { code: "auth/invalid-cert-hash", message: "Invalid certificate hash." },
  {
    code: "auth/invalid-verification-code",
    message: "The provided verification code is invalid.",
  },
  {
    code: "auth/invalid-continue-uri",
    message: "The continue URL is invalid.",
  },
  {
    code: "auth/invalid-cordova-configuration",
    message: "Invalid Cordova configuration.",
  },
  {
    code: "auth/invalid-custom-token",
    message: "The custom token is invalid.",
  },
  {
    code: "auth/invalid-dynamic-link-domain",
    message: "The dynamic link domain is invalid.",
  },
  { code: "auth/invalid-email", message: "Invalid email address." },
  { code: "auth/invalid-emulator-scheme", message: "Invalid emulator scheme." },
  {
    code: "auth/invalid-credential",
    message: "Invalid Identity Provider response.",
  },
  { code: "auth/invalid-message-payload", message: "Invalid message payload." },
  {
    code: "auth/invalid-multi-factor-session",
    message: "Invalid multi-factor authentication session.",
  },
  { code: "auth/invalid-oauth-client-id", message: "Invalid OAuth client ID." },
  { code: "auth/invalid-oauth-provider", message: "Invalid OAuth provider." },
  {
    code: "auth/invalid-action-code",
    message: "The reset password action code is invalid.",
  },
  { code: "auth/unauthorized-domain", message: "Unauthorized domain." },
  { code: "auth/wrong-password", message: "Incorrect password." },
  {
    code: "auth/invalid-persistence-type",
    message: "Invalid persistence type.",
  },
  { code: "auth/invalid-phone-number", message: "Invalid phone number." },
  { code: "auth/invalid-provider-id", message: "Invalid provider ID." },
  { code: "auth/invalid-recipient-email", message: "Invalid recipient email." },
  { code: "auth/invalid-sender", message: "Invalid sender." },
  { code: "auth/invalid-verification-id", message: "Invalid verification ID." },
  { code: "auth/invalid-tenant-id", message: "Invalid tenant ID." },
  {
    code: "auth/multi-factor-info-not-found",
    message: "Multi-factor authentication information not found.",
  },
  {
    code: "auth/multi-factor-auth-required",
    message: "Multi-factor authentication is required.",
  },
  {
    code: "auth/missing-android-pkg-name",
    message: "Missing Android package name.",
  },
  { code: "auth/missing-app-credential", message: "Missing app credential." },
  {
    code: "auth/auth-domain-config-required",
    message: "Missing authentication domain configuration.",
  },
  {
    code: "auth/missing-verification-code",
    message: "Missing verification code.",
  },
  { code: "auth/missing-continue-uri", message: "Missing continue URL." },
  { code: "auth/missing-iframe-start", message: "Missing iframe start." },
  { code: "auth/missing-ios-bundle-id", message: "Missing iOS bundle ID." },
  {
    code: "auth/missing-or-invalid-nonce",
    message: "Missing or invalid nonce.",
  },
  {
    code: "auth/missing-multi-factor-info",
    message: "Missing multi-factor authentication information.",
  },
  {
    code: "auth/missing-multi-factor-session",
    message: "Missing multi-factor authentication session.",
  },
  { code: "auth/missing-phone-number", message: "Missing phone number." },
  { code: "auth/missing-verification-id", message: "Missing verification ID." },
  {
    code: "auth/app-deleted",
    message: "The authentication module has been deleted.",
  },
  {
    code: "auth/account-exists-with-different-credential",
    message:
      "An account with this email already exists with a different credential.",
  },
  {
    code: "auth/network-request-failed",
    message: "A network request has failed.",
  },
  { code: "auth/null-user", message: "No user is currently signed in." },
  { code: "auth/no-auth-event", message: "No authentication event." },
  { code: "auth/no-such-provider", message: "No such Identity Provider." },
  {
    code: "auth/operation-not-allowed",
    message: "This operation is not allowed.",
  },
  {
    code: "auth/operation-not-supported-in-this-environment",
    message: "This operation is not supported in your current environment.",
  },
  { code: "auth/popup-blocked", message: "Popup blocked by the browser." },
  { code: "auth/popup-closed-by-user", message: "Popup closed by user." },
  {
    code: "auth/provider-already-linked",
    message: "This provider is already linked to your account.",
  },
  { code: "auth/quota-exceeded", message: "Quota exceeded." },
  {
    code: "auth/redirect-cancelled-by-user",
    message: "Redirect cancelled by user.",
  },
  {
    code: "auth/redirect-operation-pending",
    message: "Redirect operation is pending.",
  },
  { code: "auth/rejected-credential", message: "Rejected credential." },
  {
    code: "auth/second-factor-already-in-use",
    message: "Second factor authentication method already in use.",
  },
  {
    code: "auth/maximum-second-factor-count-exceeded",
    message: "Maximum number of second factor methods exceeded.",
  },
  { code: "auth/tenant-id-mismatch", message: "Tenant ID mismatch." },
  { code: "auth/timeout", message: "A timeout has occurred." },
  { code: "auth/user-token-expired", message: "User token has expired." },
  {
    code: "auth/too-many-requests",
    message: "Too many attempts. Please try again later.",
  },
  {
    code: "auth/unauthorized-continue-uri",
    message: "Unauthorized continue URL.",
  },
  {
    code: "auth/unsupported-first-factor",
    message: "Unsupported first factor authentication method.",
  },
  {
    code: "auth/unsupported-persistence-type",
    message: "Unsupported persistence type.",
  },
  {
    code: "auth/unsupported-tenant-operation",
    message: "Unsupported tenant operation.",
  },
  { code: "auth/unverified-email", message: "Unverified email address." },
  { code: "auth/user-cancelled", message: "User cancelled authentication." },
  { code: "auth/user-not-found", message: "User not found." },
  { code: "auth/user-disabled", message: "User account is disabled." },
  { code: "auth/user-mismatch", message: "User mismatch." },
  { code: "auth/user-signed-out", message: "User has signed out." },
  { code: "auth/weak-password", message: "The password is weak." },
  {
    code: "auth/web-storage-unsupported",
    message: "Web storage is unsupported by your browser.",
  },
  {
    code: "auth/already-initialized",
    message: "Firebase Auth has already been initialized.",
  },
  {
    code: "auth/recaptcha-not-enabled",
    message: "Google reCAPTCHA is not enabled.",
  },
  {
    code: "auth/missing-recaptcha-token",
    message: "Missing Google reCAPTCHA token.",
  },
  {
    code: "auth/invalid-recaptcha-token",
    message: "Invalid Google reCAPTCHA token.",
  },
  {
    code: "auth/invalid-recaptcha-action",
    message: "Invalid Google reCAPTCHA action.",
  },
  { code: "auth/missing-client-type", message: "Missing client type." },
  {
    code: "auth/missing-recaptcha-version",
    message: "Missing Google reCAPTCHA version.",
  },
  {
    code: "auth/invalid-recaptcha-version",
    message: "Invalid Google reCAPTCHA version.",
  },
  { code: "auth/invalid-req-type", message: "Invalid request type." },
];

function getError(errorCode) {
  return errors.find((data) => data.code === errorCode)?.message;
}

export {
  auth,
  addFolder,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  errors,
  getError,
};
