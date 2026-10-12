/* 
Create a list of blacklisted products by comparing previous days
*/
const yesterday_json: { [x: string]: any; }[] = JSON.parse("[" + (await Bun.file('taw_products_26072026013155.jsonl').text()).split("\n").join(",") + "]");
const today_json: { [x: string]: any; }[] = JSON.parse("[" + (await Bun.file('taw_products_27072026013211.jsonl').text()).split("\n").join(",") + "]");

const yesterdays_ids = yesterday_json.map((r: { [x: string]: any; })=>r["resource-id"]);
const y_ids_map = new Map(yesterday_json.map((r: { [x: string]: any; })=>[r["resource-id"], {search_categories: r.search_categories, rid: r["resource-id"]}]))
const todays_ids = new Map(today_json.map((r: { [x: string]: any; })=>[r["resource-id"], r]))
console.log(todays_ids.has("T99"));

const todays_blacklist = yesterdays_ids.map(x=>{
    if (!todays_ids.has(x)) return JSON.stringify(y_ids_map.get(x));
    return;

});


Bun.write('todays_blacklist.csv',todays_blacklist.join("\n").replaceAll("\n\n","").replaceAll("\n\n",""))