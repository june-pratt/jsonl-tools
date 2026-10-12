
const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json = jsonl.split("\n");


const categories = []
for (const product_raw of json) {
    if (!product_raw) continue;
    const product = JSON.parse(product_raw);
    if (product["resource-type"] !== "category") continue;
    if (product.product_ids.length < 2) continue;
    categories.push(product.title);
}

Bun.write("./results/resource_groups.json", JSON.stringify(categories));