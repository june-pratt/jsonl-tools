const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json = jsonl.split("\n");

let csv = "title,resource_id,url,children\n";
for (const line of json) {
    if (!line) continue;
    const product = JSON.parse(line);
    if (product["resource-type"] != "category") continue;
    csv += `"${product.title}","${product["resource-id"]}","${product.url}","${product.product_ids.join(',')}"\n`
}

Bun.write("./results/site_categories.txt",csv);