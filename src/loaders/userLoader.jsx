import { redirect } from "react-router-dom";

const url = "http://localhost:3000/users";

export async function userLoader() {
  const currentUserID = localStorage.getItem("currentUserID");

  if (!currentUserID) {
    return redirect("/login");
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw res;
  }

  const users = await res.json();
  const user = users.find((u) => u.id === currentUserID);

  if (!user || !user.isLoggedIn) {
    return redirect("/login");
  }

  return user;
}
