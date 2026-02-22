import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { Client } from "@notionhq/client";

config({ path: "./.env.example" });

const notion = new Client({ auth: process.env.NOTION_KEY });

//  to get only the top level childrens of a block
async function getBlockChildren(block_id) {
    try {
        const response = await notion.blocks.children.list({
            block_id: block_id,
        });

        return response;
    } catch (err) {
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
        [type]: typeContent, // Dynamically include type-specific content
    };
}

async function getBlockChildrenRecursive(block_id) {
    try {
        const response = await notion.blocks.children.list({
            block_id: block_id,
        });

        for (const element of response.results) {
            if (element.has_children) {
                // Recursively fetch children
                element.children = await getBlockChildrenRecursive(element.id);
            }
        }

        return response;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getBlockChildrenRecursiveWithFilter(block_id) {
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
                filteredElement.children =
                    await getBlockChildrenRecursiveWithFilter(element.id);
            }

            // replace the original element in the array with the filteredElement
            response.results[response.results.indexOf(element)] =
                filteredElement;
        }

        return response;
    } catch (err) {
        console.error(err);
        return null;
    }
}

/* A helper function to write the API data to a file */
async function writeResponseToFile(functionName, data) {
    try {
        const folderPath = path.join(process.cwd(), "api-responses");
        console.log(folderPath);

        // Ensure folder exists
        await fs.mkdir(folderPath, { recursive: true });

        const fileName = `${functionName}Response.json`;
        const filePath = path.join(folderPath, fileName);

        // Write formatted JSON
        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");

        console.log(`Response written to ${filePath}`);
    } catch (err) {
        console.error("Error writing file:", err);
    }
}

await (async () => {
    let res = await getBlockChildren(process.env.NOTION_PAGE_ID);
    writeResponseToFile(getBlockChildren.name, res);

    // let res = await getBlockChildrenRecursiveWithFilter(process.env.NOTION_PAGE_ID);
    // writeResponseToFile(getBlockChildrenRecursiveWithFilter.name, res);
})();
