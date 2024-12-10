import fs from "fs/promises";
import fetch from "node-fetch";

async function Base() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();

    const jsondata = JSON.stringify(data, null, 2);

    await fs.writeFile("posts.json", jsondata);
    console.log("Monacemebi chawerilia post.jsonshi");
  } catch (error) {
    console.log(error, "error");
  }
}

async function removeLongTitles() {
  try {
    const data = await fs.readFile("posts.json", "utf-8");
    const posts = JSON.parse(data);

    const filteredPosts = posts.filter((post) => post.title.length <= 30);

    const jsondata = JSON.stringify(filteredPosts, null, 2);
    await fs.writeFile("updatedPosts.json", jsondata);
    console.log("moxerxda");
  } catch (error) {
    console.error(error, "error");
  }
}
Base();
removeLongTitles();
