import { config } from "dotenv";
import { Client, collectPaginatedAPI } from "@notionhq/client";

config({ path: "./.env.example" });

console.log(process.env.NOTION_DATABASE_ID);
console.log(process.env.NOTION_KEY);
console.log(process.env.NOTION_PAGE_ID);

const notion = new Client({ auth: process.env.NOTION_KEY });

async function getBlockContentRecursive(block_id) {
    try {
        const response = await notion.blocks.children.list({
            block_id: block_id
        });
        
        // Use for...of instead of forEach to properly await
        for (const element of response.results) {
            if (element.has_children) {
                // Recursively fetch children
                element.children = await getBlockContentRecursive(element.id);
            }
        }
        
        return response;
    } 
    catch (err) {
        console.error("Error fetching block:", block_id, err.message);
        return null;
    }
}



await (async () => {
    let res = await getBlockContentRecursive(process.env.NOTION_PAGE_ID);
    // let res = await getBlockContent("2fa4b8b0-8aa8-807a-952f-d5ce82df2f09");
    console.log(JSON.stringify(res));
})();



