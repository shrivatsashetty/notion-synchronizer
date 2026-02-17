import { config } from "dotenv";
import { Client } from "@notionhq/client";

config({ path: "./.env.example" });

console.log(process.env.NOTION_DATABASE_ID);
console.log(process.env.NOTION_KEY);
console.log(process.env.NOTION_PAGE_ID);

const notion = new Client({ auth: process.env.NOTION_KEY });

//  to get only the top level childrens of a block 
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

// a function to filter block object properties
function filterBlockProperties(block) {
    const { object, id, type, has_children, [type]: typeContent } = block;
    
    return {
        object,
        id,
        type,
        has_children,
        [type]: typeContent  // Dynamically include type-specific content
    };
}

async function getBlockChildrenRecursive(block_id) {

    try {
        const response = await notion.blocks.children.list({
            block_id: block_id,
            page_size: 1,
        });

        for (const element of response.results) {
            
            // Create the new "Clean" object by filtering the object properties
            const filteredElement = filterBlockProperties(element);

            if (element.has_children) {
                // Recursively fetch children
                filteredElement.children = await getBlockChildrenRecursive(element.id);
            }

            // replace the original element in the array with the filteredElement
            response.results[response.results.indexOf(element)] = filteredElement;
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



