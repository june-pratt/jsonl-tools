import blacklisted_ids from "./resource_ids_to_check";

const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json_split = jsonl.split("\n");
const jsonl_resource_ids = [];

const found_ids = [];
let found_ids_txt = ""
const true_blacklisted = [];
let true_blacklisted_txt = ""

for (const product of json_split) {
    if (!product) continue;
    const product_json = JSON.parse(product);
    jsonl_resource_ids.push(product_json["resource-id"]);
}
console.log(jsonl_resource_ids.length);
const intersection = jsonl_resource_ids.filter(element => blacklisted_ids.includes(element));
console.log(intersection.length);

await Bun.write(Bun.file("./WA_found_ids 01_30_26 v2.txt"),intersection.join("\n"))

