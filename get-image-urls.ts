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


let csv = 'resource_id,title,image_url,url,resource_type\n';
for (const product of json) {
    if (!product) continue;
    const product_json = JSON.parse(product);
    const product_type: keyof typeof search_categories = product_json["resource-type"];
    if (product_type !== "ticket" && product_type !== "event") continue;
    csv += `"${product_json["resource-id"]}","${product_json["title"]}","${product_json["image_r_3x2"]}","${product_json["url"]}","${product_json["resource-type"]}"\n`

}

Bun.write("./results/resources_with_images.csv",csv);