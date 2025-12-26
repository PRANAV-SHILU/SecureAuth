import { redirect } from "react-router-dom";
const url = "http://localhost:3000/users";
export async function logoutAction() {
  const currentUserID = localStorage.getItem("currenyUserID");

  if (currentUserID) {
    await fetch(`${url}/${currentUserID}`, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLoggedIn: false }),
    });

    localStorage.removeItem("currentUserID");
  }

  return redirect("/login?logout=success");
}
