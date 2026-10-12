const jsonl = await Bun.file("JSONL_File.jsonl").text();
const json = jsonl.split("\n");
const special_char_set = new Set();
for (let line of json) {
    if (!line) continue;
    const product = JSON.parse(line);
    const title: string = product.title;
    const matches = title.matchAll(/[^a-zA-Z\d\s:]/g);
    [...matches].forEach(match => {
        special_char_set.add(match[0]);
    });
}

console.log(Array.from(special_char_set).join("', '-' | replace: '"));