import fs from "fs/promises";

async function readUsersFile() {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function createUser(email, name, age) {
  const users = await readUsersFile();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    console.log("Email is already registered");
    return;
  }

  const newUser = { email, name, age };

  users.push(newUser);

  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
  console.log("Added new User");
}

async function deleteUser(email) {
  const users = await readUsersFile();

  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    console.log("Mail doesnt exist");
    return;
  }

  users.splice(userIndex, 1);

  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
  console.log("User deleted Successfully");
}

async function run() {
  const [, , command, email, name, age] = process.argv;
  if (command === "CREATE") {
    if (!email || !name || !age) {
      console.log("Yvelaferi unda sheavso");
      return;
    }
    await createUser(email, name, age);
  } else if (command === "DELETE") {
    if (!email) {
      console.log("chawere emaili rom washalo");
      return;
    }

    await deleteUser(email);
  } else {
    console.log("arasworia gamoiyenet CREATE an DELETE");
  }
}

run();
