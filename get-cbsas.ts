import type { Product_Resource } from "./types";

const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json = jsonl.split("\n");


const cbsas = new Set();
for (const product_raw of json) {
    if (!product_raw) continue;
    const product: Product_Resource = JSON.parse(product_raw);
    const cbsa_array = product.cbsa_code;
    if (!cbsa_array) continue;
    if (cbsa_array.length < 0) continue;
    cbsa_array.forEach((cbsa: string)=>cbsas.add(cbsa))
}

Bun.write("./results/cbsas.json", JSON.stringify(Array.from(cbsas)));