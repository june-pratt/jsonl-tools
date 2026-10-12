
const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json = jsonl.split("\n");

const search_categories = {
  "all": new Set(),
  "ticket": new Set(),
  "event": new Set(),
  "preferred_access_show": new Set(),
  "preferred_access": new Set(),
  "local_deal": new Set(),
}

for (const product of json) {

  if (!product) continue;
  const product_json = JSON.parse(product);
  const product_type: keyof typeof search_categories = product_json["resource-type"];
  if (product_json.search_categories) {
    product_json.search_categories.forEach((cat: string)=>{
      search_categories["all"].add(cat);
      if (search_categories[product_type]) search_categories[product_type].add(cat);
    });
  }
}
console.log(search_categories);
const stringable: {[x: string]: any[]} = {}
for (const [key, set] of Object.entries(search_categories)) {
  stringable[key] = Array.from(set);
}
await Bun.write("./results/search_cats_by_type.json", JSON.stringify(stringable))