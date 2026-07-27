import { redirect } from "react-router-dom";
import { contactService } from "../services/contactService";

export function adminContactLoader({ request }) {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) return redirect("/login");
  if (user.role !== "admin") return redirect("/profile");

  const url = new URL(request.url);
  const isResponded = url.searchParams.get("isResponded") ?? "false";

  const contactDataPromise = contactService
    .getContactData(isResponded)
    .then((r) => r.data ?? r)
    .catch((err) => {
      console.error("adminContactLoader error:", err);
      throw err;
    });

  return { contactData: contactDataPromise };
}
