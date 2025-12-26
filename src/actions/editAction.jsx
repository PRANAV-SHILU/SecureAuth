import { redirect } from "react-router-dom";

const url = "http://localhost:3000/users";

export async function editAction({ request }) {
  const currentUserID = localStorage.getItem("currentUserID");

  if (!currentUserID) return redirect("/login");

  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");
  const mobile = formData.get("mobile");

  const res = await fetch(url);
  const users = await res.json();

  const mobileExists = users.some(
    (u) => u.mobile === mobile && u.id !== currentUserID
  );

  if (mobileExists) {
    return { error: "Mobile number already exists" };
  }

  await fetch(`${url}/${currentUserID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, mobile, password }),
  });

  return redirect("/dashboard?edited=success");
}
