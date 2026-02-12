const response = {
    "object": "list",
    "results": [
        {
            "object": "block",
            "id": "2fa4b8b0-8aa8-807a-952f-d5ce82df2f09",
            "parent": {
                "type": "page_id",
                "page_id": "2fa4b8b0-8aa8-8095-a5a6-d05328b85bfc"
            },
            "created_time": "2026-02-01T15:47:00.000Z",
            "last_edited_time": "2026-02-01T17:05:00.000Z",
            "created_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "last_edited_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "has_children": true,
            "archived": false,
            "in_trash": false,
            "type": "heading_1",
            "heading_1": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": { "content": "Topic 1", "link": null },
                        "annotations": {
                            "bold": false,
                            "italic": false,
                            "strikethrough": false,
                            "underline": false,
                            "code": false,
                            "color": "default"
                        },
                        "plain_text": "Topic 1",
                        "href": null
                    }
                ],
                "is_toggleable": true,
                "color": "default"
            }
        },
        {
            "object": "block",
            "id": "2fa4b8b0-8aa8-8083-b0a9-c0f24f70ca73",
            "parent": {
                "type": "page_id",
                "page_id": "2fa4b8b0-8aa8-8095-a5a6-d05328b85bfc"
            },
            "created_time": "2026-02-01T15:47:00.000Z",
            "last_edited_time": "2026-02-01T17:06:00.000Z",
            "created_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "last_edited_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "has_children": true,
            "archived": false,
            "in_trash": false,
            "type": "heading_1",
            "heading_1": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": { "content": "Topic 2", "link": null },
                        "annotations": {
                            "bold": false,
                            "italic": false,
                            "strikethrough": false,
                            "underline": false,
                            "code": false,
                            "color": "default"
                        },
                        "plain_text": "Topic 2",
                        "href": null
                    }
                ],
                "is_toggleable": true,
                "color": "default"
            }
        },
        {
            "object": "block",
            "id": "2fa4b8b0-8aa8-8078-8c9b-f937b83d1353",
            "parent": {
                "type": "page_id",
                "page_id": "2fa4b8b0-8aa8-8095-a5a6-d05328b85bfc"
            },
            "created_time": "2026-02-01T15:47:00.000Z",
            "last_edited_time": "2026-02-01T17:07:00.000Z",
            "created_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "last_edited_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "has_children": true,
            "archived": false,
            "in_trash": false,
            "type": "heading_1",
            "heading_1": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": { "content": "Topic 3", "link": null },
                        "annotations": {
                            "bold": false,
                            "italic": false,
                            "strikethrough": false,
                            "underline": false,
                            "code": false,
                            "color": "default"
                        },
                        "plain_text": "Topic 3",
                        "href": null
                    }
                ],
                "is_toggleable": true,
                "color": "default"
            }
        },
        {
            "object": "block",
            "id": "2fa4b8b0-8aa8-8078-aaa3-fec55f5278b1",
            "parent": {
                "type": "page_id",
                "page_id": "2fa4b8b0-8aa8-8095-a5a6-d05328b85bfc"
            },
            "created_time": "2026-02-01T17:05:00.000Z",
            "last_edited_time": "2026-02-01T17:05:00.000Z",
            "created_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "last_edited_by": {
                "object": "user",
                "id": "e89c9ccb-381a-4aa7-a0e7-a31f84a1320b"
            },
            "has_children": false,
            "archived": false,
            "in_trash": false,
            "type": "paragraph",
            "paragraph": { "rich_text": [], "color": "default" }
        }
    ],
    "next_cursor": null,
    "has_more": false,
    "type": "block",
    "block": {},
    "request_id": "e791f77f-7247-4ad4-bb93-41a5544b91ac"
}


let filteredList = []


for (let element of response.results) {


    const { id, type, object, has_children, [type]: typeContent } = element;

    // Create the new "Clean" object
    const filteredElement = {
    object,
    id,
    type,
    has_children,
    // DYNAMIC KEY: This is crucial. 
    // If type is 'paragraph', this adds: { paragraph: { ... } }
    // If type is 'image', this adds: { image: { ... } }
    [type]: typeContent,
    };

    filteredList.push(filteredElement);

}

console.log(JSON.stringify(filteredList, null, 4));
