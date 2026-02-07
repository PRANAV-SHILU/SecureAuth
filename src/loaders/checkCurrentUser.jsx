const url = "https://secureauth-api.onrender.com/users";
// const url = "http://localhost:3000/users";

export async function checkCurrentUser() {
  const currentUserID = localStorage.getItem("currentUserID");

  if (!currentUserID) {
    return { isLoggedIn: false, user: null };
  }

  const res = await fetch(`${url}/${currentUserID}`);

  if (!res.ok) {
    throw res;
  }

  const user = await res.json();

  if (!user.isLoggedIn) {
    localStorage.removeItem("currentUserId");
    return { isLoggedIn: false, user: null };
  }

  return { isLoggedIn: true, name: user.name };
}
