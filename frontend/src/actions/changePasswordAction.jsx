import { redirect } from "react-router-dom";
import { changePassword } from "../network/userApi";
import { toast } from "react-toastify";

export async function changePasswordAction({ request }) {
  const formData = await request.formData();

  const oldPassword = formData.get("oldPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  // Validate required fields
  if (!oldPassword || !newPassword || !confirmPassword) {
    toast.error("All fields are required.");
    return { error: "All fields are required." };
  }

  // Validate password strength
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    toast.error(
      "Password must be at least 8 characters with uppercase, lowercase, digit, and special character."
    );
    return { error: "Password does not meet requirements." };
  }

  // Validate passwords match
  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match.");
    return { error: "Passwords do not match." };
  }

  try {
    await changePassword({ oldPassword, newPassword });
    toast.success("Password changed successfully!");
    return redirect("/settings");
  } catch (err) {
    // Error toast is already handled by apiClient interceptor
    return { error: err.message || "Failed to change password." };
  }
}
