const url = "http://localhost:3000/users";

export async function checkCurrentUser() {
  const currentUserID = localStorage.getItem("currentUserID");

  const res = currentUserID ? await fetch(`${url}/${currentUserID}`) : null;
  const user = res?.ok ? await res.json() : null;

  if (!currentUserID || !user || !user.isLoggedIn) {
    localStorage.removeItem("currentUserID");
    return { isLoggedIn: false, name: null };
  }

  return { isLoggedIn: true, name: user.name };
}
