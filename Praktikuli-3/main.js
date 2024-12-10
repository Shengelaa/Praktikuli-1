import fs from "fs/promises";

async function readProductFile() {
  try {
    const data = await fs.readFile("products.json", "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
}

async function createProduct(name, description, price, color) {
  const products = await readProductFile();

  const newProduct = { name, description, price, color };

  if (Array.isArray(products)) {
    products.push(newProduct);

    await fs.writeFile("products.json", JSON.stringify(products, null, 2));
    console.log("produqti daemata");
  } else {
    console.log("produkti ar aris array");
  }
}

async function sortProducts(order) {
  const products = await readProductFile();

  if (Array.isArray(products)) {
    products.sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else if (order === "desc") {
        return b.price - a.price;
      }
      return 0;
    });
    await fs.writeFile("products.json", JSON.stringify(products, null, 2));
  } else {
    console.log("produkti ar aris array");
  }
}

async function run() {
  await createProduct("Laptop", "Applis", 1500, "Shavi");
  await createProduct("vashli", "witeliferis", 100, "Witeli");
  await createProduct("mwvanili", "mwvane", 10, "Mwvane");

  await sortProducts("desc");
}

run();
