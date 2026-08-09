import { redirect } from "react-router-dom";
import { contactService } from "../services/contactService";

export function myInquiriesLoader({ request }) {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) return redirect("/login");

  const url = new URL(request.url);
  const isResponded = url.searchParams.get("isResponded") ?? "false";

  const contactDataPromise = contactService
    .getMyContacts(isResponded)
    .then((r) => r.data ?? r)
    .catch((err) => {
      console.error("myInquiriesLoader error:", err);
      throw err;
    });

  return { contactData: contactDataPromise, isAdmin: false };
}
