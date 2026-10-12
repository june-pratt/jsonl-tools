
const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json = jsonl.split("\n");

let search_categories = new Map<string, Map<string, number>>();
for (const product of json) {

  if (!product) continue;
  const product_json = JSON.parse(product);
  const product_type: string = product_json["resource-type"];
  if (product_type == "preferred_access") continue;
  if (product_json.search_categories) {
    const product_search_categories = Array.from<string>(new Set(product_json.search_categories));
    product_search_categories.forEach((cat: string)=>{
      if (!search_categories.get(cat)) search_categories.set(cat, new Map<string, number>());
      const num_of_cats = search_categories.get(cat)?.get("count") || 0
      search_categories.get(cat)?.set("count", num_of_cats + 1)
      product_search_categories.forEach((c2:string)=>{
        if (c2 && c2 !== cat) {
          const amount = search_categories.get(cat)?.get(c2) || 0
          search_categories.get(cat)?.set(c2, amount + 1 )
        }
      })
    });
  }
}

const sorted_search_categories = new Map([...search_categories.entries()].sort((a,b)=>search_categories.get(a[0])?.get("count") - search_categories.get(b[0])?.get("count")));
const stringable: any = {}
for (const [key, map] of sorted_search_categories) {
  for (const [prop, amount] of map) {
    if (amount >= map.get("count") * 0.95 && prop != "count" && search_categories.get(prop)?.get("count") > map.get("count")) {
      stringable[prop] = stringable[prop] ? [...stringable[prop], key] : [search_categories.get(prop)?.get("count"), key]
    }
  }
}

for (const category in stringable) {
  const to_remove = [];
  for (const [i, sec_tier] of Object.entries(stringable[category])) {
    if (stringable[sec_tier]) {
      stringable[category][i] = [sec_tier, stringable[sec_tier]];
      to_remove.push(...stringable[sec_tier])
      delete stringable[sec_tier];
    }
  }
  for (const removal of to_remove) {
    const j = stringable[category].indexOf(removal);
    if (j > 0) stringable[category].splice(j,1);
  }
}

const result = Object.entries(stringable).sort((a, b) => b[1][0] - a[1][0])

await Bun.write("./results/search_cats.json", JSON.stringify(stringable))





let csv = "";
function build_csv(obj: any, number_of_commas: number) {
  for (const arr of obj) {
    if (Number.isInteger(arr) || Number.isInteger(arr[0])) continue;
    for (let i = 0; i < number_of_commas; i++){
      csv += ","
    }
    csv += Array.isArray(arr) ? `"${arr[0]}"` : `"${arr}"`;
    if (Array.isArray(arr[1])) {
      csv += "\n"
      build_csv(arr[1], number_of_commas+1);
      continue;
    }
    csv += "\n"
}
}
build_csv(result, 0);

await Bun.write("./results/search_categories.csv", csv)