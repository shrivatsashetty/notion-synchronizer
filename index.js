import { config } from "dotenv";
import { Client, collectPaginatedAPI } from "@notionhq/client";

config({ path: "./.env.example" });

console.log(process.env.NOTION_DATABASE_ID);
console.log(process.env.NOTION_KEY);
console.log(process.env.NOTION_PAGE_ID);

const notion = new Client({ auth: process.env.NOTION_KEY });


async function getBlockChildren(block_id) {
    try {
        const response = await notion.blocks.children.list({
            block_id: block_id
        });

        return response;
    } 
    catch (err) {
        console.error(err);
        return null;
    }
}

async function getBlockChildrenRecursive(block_id) {
    try {
        const response = await notion.blocks.children.list({
            block_id: block_id
        });

        for (const element of response.results) {
            if (element.has_children) {
                // Recursively fetch children
                element.children = await getBlockChildrenRecursive(element.id);
            }
        }
           
        return response;
    } 
    catch (err) {
        console.error(err);
        return null;
    }
}



await (async () => {
    // let res = await getBlockChildren(process.env.NOTION_PAGE_ID);
    let res = await getBlockChildrenRecursive(process.env.NOTION_PAGE_ID);
    console.log(JSON.stringify(res));
})();



