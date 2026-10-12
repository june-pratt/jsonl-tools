// add blacklisted_ids from compare_daily results
import blacklisted_ids from "./resource_ids_to_check";
// build JSON

const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json_split = jsonl.split("\n");
const json = [];

const found_ids = [];
let found_ids_txt = ""
const true_blacklisted = [];
let true_blacklisted_txt = ""

for (const product of json_split) {
    if (!product) continue;
    const product_json = JSON.parse(product);
    json.push(product_json);
}
console.log(json.length);
for (const resource_id of blacklisted_ids) {
    const found = json.find(product=> product["resource-id"] == resource_id);
    if (found) {
        const found_data = resource_id + " |-| " + found.title + " |-| " + found.url + "&frombulletin=1&clthash=d570c2475273f78da03e59416e430990deeed427&cmpid=121375&uid=23213084&conv_source=zeta&bt_ee=7H/rwhLZ9N/1KQVsPC0qGb4yp3kkyhhk9uqqkexpUW7t39rwcl+Y9z3N5Zxz6GWQ&bt_ts=1768931660364"
        found_ids_txt += found_data + "\n"
        found_ids.push(found_data);
        console.log(found_ids.length);

        continue;

    }
    // true_blacklisted.push(resource_id);
    // true_blacklisted_txt += resource_id + "\n"
}
console.log(found_ids.length);
// await Bun.write(Bun.file("./WA_true_blacklisted 01_30_26.txt"),true_blacklisted_txt)
// console.log('true_blacklisted: ', true_blacklisted);
await Bun.write(Bun.file("./WA_found_ids 01_30_26.txt"),found_ids_txt)
console.log('errors: ', found_ids);

