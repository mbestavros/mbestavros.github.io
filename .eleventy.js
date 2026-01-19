import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import lodashChunk from "lodash.chunk";
import pluginImages from "./eleventy.config.images.js";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("content");


    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addPlugin(pluginImages);

    eleventyConfig.addPlugin(EleventyVitePlugin, {
        viteOptions: {
            plugins: [
                viteStaticCopy({
                    targets: [
                        {
                            src: 'content/personal/*.pdf',
                            dest: 'content/personal'
                        },
                        {
                            src: 'CNAME',
                            dest: 'CNAME'
                        }
                    ]
                })
            ]
        }
    });

    eleventyConfig.setDataDeepMerge(true);

    // Shortcode for editing title and description dynamically via JS
    eleventyConfig.addShortcode("pageMetadata", async function (title, description) {
        return `<script>
            document.title = "${title}";
            var meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "${description}";
            document.getElementsByTagName('head')[0].appendChild(meta);
        </script>`;
    });

    /*
    --- WORKAROUND FOR DOUBLE PAGINATION: see https://github.com/11ty/eleventy/issues/332 ---
    This allows individual tag categories (a result of pagination themselves) to be paginated.

    We'll create two collections using this function (included below as createFilteredCollection):
     - one that contains all pages for tag "blog" (for the main blog view)
     - one that contains all pages that aren't for tag "blog" (for tag pages)
     */

    // Variables for input. Set number of posts per page here.
    var paginationSize = 6;
    var blog_tag = ['blog'];

    // Create both collections.
    eleventyConfig.addCollection("blogPages", function (collection) {
        return createFilteredCollection(collection, paginationSize, blog_tag);
    });

    eleventyConfig.addCollection("tagPages", function (collection) {
        return createFilteredCollection(collection, paginationSize, blog_tag, true);
    });

    // Create a collection with all unique tags.
    eleventyConfig.addCollection("uniqueTags", function (collection) {
        let temp = getUniqueTags(collection, blog_tag, true);
        return Array.from(temp);
    });

    return {
        dir: {
            input: "./",      // Equivalent to Jekyll's source property
            output: "./_site" // Equivalent to Jekyll's destination property
        },
    };
};


/*
The below function is a slightly amended version of the code listed here: https://github.com/11ty/eleventy/issues/332
It will format collections data to allow nested pagination.

Parameters:
collection: required
paginationSize: controls how many posts per page to include.
filter_tags: the tags to return pages for.
inverse: if set to true, page selection is inverted -- in other words, return all pages that do NOT match the tags in
filter_tags. Default is false.
*/
function createFilteredCollection(collection, paginationSize, filter_tags, inverse = false) {
    // We use lodashChunk (imported at top).

    // Get unique list of tags
    let tagSet = getUniqueTags(collection, filter_tags, inverse);

    // Get each item that matches the tag
    let tagMap = [];
    let tagArray = [...tagSet];
    for (let tagName of tagArray) {
        let tagItems = collection.getFilteredByTag(tagName).reverse();
        let pagedItems = lodashChunk(tagItems, paginationSize);
        for (let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
            tagMap.push({
                tagName: tagName,
                pageNumber: pageNumber,
                pageData: pagedItems[pageNumber]
            });
        }
    }

    /* return data looks like:
        [{
            tagName: "tag1",
            pageNumber: 0
            pageData: [] // array of items
        },{
            tagName: "tag1",
            pageNumber: 1
            pageData: [] // array of items
        },{
            tagName: "tag1",
            pageNumber: 2
            pageData: [] // array of items
        },{
            tagName: "tag2",
            pageNumber: 0
            pageData: [] // array of items
        }]
    */
    // console.log( tagMap );
    return tagMap;
}

// Part of the function from https://github.com/11ty/eleventy/issues/332, split out to make it usable on its own.
function getUniqueTags(collection, filter_tags, inverse = false) {
    let tagSet = new Set();
    collection.getAllSorted().map(function (item) {
        if ("tags" in item.data) {
            let tags = item.data.tags;

            // Include or exclude tag pages based on what include is.
            for (let tag of tags) {
                if ((!inverse && filter_tags.includes(tag)) || (inverse && !(filter_tags.includes(tag)))) {
                    tagSet.add(tag);
                }
            }
        }
    });
    return tagSet;
}
