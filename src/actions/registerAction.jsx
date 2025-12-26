import { redirect } from "react-router-dom";

const url = "http://localhost:3000/users";

export async function registerAction({ request }) {
  const formData = await request.formData();

  //fetch and check does mobile already exists
  let response = await fetch(url);
  response = await response.json();

  const mobile = formData.get("mobile");

  const isMobileExists = response.some((user) => user.mobile === mobile);

  if (isMobileExists) {
    return { error: "Mobile number already exists" };
  }

  //sending new user detail to server
  const newUser = {
    id: (response.length + 1).toString(),
    name: formData.get("name"),
    mobile,
    password: formData.get("password"),
    isLoggedIn: false,
  };

  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  //redirecting user to login
  return redirect("/login?registered=success");
}
