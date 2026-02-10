import { config } from "dotenv";
import { Client, collectPaginatedAPI } from "@notionhq/client";

config({ path: "./.env.example" });

const notion = new Client({ auth: process.env.NOTION_KEY });

async function getBlockTree(block_id) {
    try {
        // 1. Use collectPaginatedAPI to get ALL blocks (not just the first 100)
        // This returns an Array of blocks directly, handling the 'has_more' logic for you.
        const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
            block_id: block_id
        });

        // 2. Use Promise.all combined with .map()
        // This creates an array of Promises and waits for ALL of them to resolve.
        await Promise.all(blocks.map(async (block) => {
            if (block.has_children) {
                // Recursively fetch children
                // We assign the RESULT of the recursion to the children property
                block.children = await getBlockTree(block.id);
            }
            return block;
        }));

        return blocks;
    } 
    catch (err) {
        console.error("Error fetching block:", block_id, err);
        return [];
    }
}

// Execution
await (async () => {
    console.log("Fetching Notion Page Tree...");
    
    // Pass the Page ID (which acts as the root block ID)
    const result = await getBlockTree(process.env.NOTION_PAGE_ID);
    
    // Pretty print the result
    console.log(JSON.stringify(result, null, 4));
})();