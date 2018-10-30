export const login = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email !== "test@example.com") {
        reject(new Error("No account with that email address!"));
      }

      if (password !== "password") {
        reject(new Error("Wrong password!"));
      }

      resolve("Success");
    }, 1000);
  });
