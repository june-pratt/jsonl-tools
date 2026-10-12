const today_json: { [x: string]: any; }[] = JSON.parse("[" + (await Bun.file('taw_products_11062026013323.jsonl').text()).split("\n").join(",") + "]");

const theme_parks = today_json.filter(x=>x?.search_categories?.includes("Theme Parks")).map((x)=> { return {id: x["resource-id"],score: Math.random(), reason: null}})
const concerts = today_json.filter(x=>x?.search_categories?.includes("Concerts")).map((x)=> { return {id: x["resource-id"],score: Math.random(), reason: null}})
const shows = today_json.filter(x=>x?.search_categories?.includes("Shows")).map((x)=> { return {id: x["resource-id"],score: Math.random(), reason: null}})
const sports = today_json.filter(x=>x?.search_categories?.includes("Sports")).map((x)=> { return {id: x["resource-id"],score: Math.random(), reason: null}})


const new_jsonl = [];
for (let i = 0; i < 100; i++){
    const json = `{"uid": "jpratt.test+${i}@gmail.com","recommendations_nested":{"theme_parks": ${shuffleArray(theme_parks)},"concerts": ${shuffleArray(concerts)},"shows": ${shuffleArray(shows)},"sports": ${shuffleArray(sports)}}}`
    new_jsonl.push(json);
}
const final_jsonl = new_jsonl.join("\n");

await Bun.write("./results/profile_recommendations.jsonl", final_jsonl);

function shuffleArray(array: any[]) {
    const temp_array = array;
    for (var i = temp_array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = temp_array[i];
        temp_array[i] = temp_array[j];
        temp_array[j] = temp;
    }
    return JSON.stringify(temp_array.slice(0,49))
}