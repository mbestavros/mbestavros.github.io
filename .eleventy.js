const Image = require("@11ty/eleventy-img");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("content");
    eleventyConfig.addPassthroughCopy("CNAME")
    eleventyConfig.setDataDeepMerge(true);

    // Shortcode for responsive images with eleventy-img
    eleventyConfig.addShortcode("responsiveImage", async function (src, alt) {
        return await responsiveImages(src, alt);
    });

    // Shortcode for adding title and description dynamically via JS
    eleventyConfig.addShortcode("pageMetadata", async function (title, description) {
        return `<script>
            document.title = "${title}";
            var meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "${description}";
            document.getElementsByTagName('head')[0].appendChild(meta);
        </script>`;
    });

    // Shortcode for retroactively inserting article info
    eleventyConfig.addShortcode("articleSetHeaders", async function (title, subtitle, header) {
        return `<script>
            document.getElementById("article-title").textContent="${title}";
            document.getElementById("article-subtitle").textContent="${subtitle}";
            document.getElementById("article-titles").insertAdjacentHTML('afterend', \`<div class="mdc-card__media card-local-media--16-9">
                ${await responsiveImages(header, "")}
            </div>\`);
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
    var paginationSize = 3;
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


// Function to generate and markup responsive images.
async function responsiveImages(src, alt) {
    if (!src) {
        return "";
    }

    options = {
        // Array of widths
        // Optional: use falsy value to fall back to native image size
        widths: [150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1650, 1800, 1950],

        // Pass any format supported by sharp
        formats: ["webp", "jpeg"], //"png"

        // the directory in the image URLs <img src="/img/MY_IMAGE.png">
        urlPath: "/content/responsive/",

        // the path to the directory on the file system to write the image files to disk
        outputDir: "_site/content/responsive/",

        // eleventy-cache-assets
        // If a remote image URL, this is the amount of time before it downloads a new fresh copy from the remote server
        cacheDuration: "1d"
    };
    let stats = await Image(src, options);
    let lowestSrc = stats.jpeg[0];
    let sizes = "70vw"; // Make sure you customize this!

    if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveImage from: ${src}`);
    }

    // Iterate over formats and widths
    return `<picture>
  ${Object.values(stats).map(imageFormat => {
        return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
        <img
        alt="${alt}"
        src="${lowestSrc.url}"
        width="${lowestSrc.width}"
        height="${lowestSrc.height}">
        </picture>`;
}


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
    // We use lodashChunk, so require it.
    var lodashChunk = require('lodash.chunk');

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
