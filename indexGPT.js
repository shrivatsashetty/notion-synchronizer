import { config } from "dotenv";
import { Client } from "@notionhq/client";

config({ path: "./.env.example" });

const notion = new Client({ auth: process.env.NOTION_KEY });

async function getBlockTree(blockId) {
    const blocks = [];
    let cursor = undefined;

    do {
        const response = await notion.blocks.children.list({
            block_id: blockId,
            start_cursor: cursor,
            page_size: 100,
        });

        for (const block of response.results) {
            if (block.has_children) {
                block.children = await getBlockTree(block.id);
            }
            blocks.push(block);
        }

        cursor = response.next_cursor;
    } 
    while (cursor);

    return blocks;
}


// Execution
await (async () => {
    console.log("Fetching Notion Page Tree...");
    
    // Pass the Page ID (which acts as the root block ID)
    const result = await getBlockTree(process.env.NOTION_PAGE_ID);
    
    // Pretty print the result
    console.log(JSON.stringify(result, null, 4));
})();
