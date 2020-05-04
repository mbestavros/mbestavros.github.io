module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.setDataDeepMerge(true);

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
    eleventyConfig.addCollection("blogPages", function(collection) {
        return createFilteredCollection(collection, paginationSize, blog_tag);
    });

    eleventyConfig.addCollection("tagPages", function(collection) {
        return createFilteredCollection(collection, paginationSize, blog_tag, true);
        
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
function createFilteredCollection(collection, paginationSize, filter_tags, inverse=false) {
    // We use lodashChunk, so require it.
    var lodashChunk = require('lodash.chunk');

    // Get unique list of tags
    let tagSet = new Set();
    collection.getAllSorted().map(function(item) {
        if( "tags" in item.data ) {
            let tags = item.data.tags;

            // Include or exclude tag pages based on what include is.
            for (let tag of tags) {
                if((!inverse && filter_tags.includes(tag)) || (inverse && !(filter_tags.includes(tag)))) {
                    tagSet.add(tag);
                }
            }
        }
    });

    // Get each item that matches the tag
    let tagMap = [];
    let tagArray = [...tagSet];
    for( let tagName of tagArray) {
        let tagItems = collection.getFilteredByTag(tagName);
        let pagedItems = lodashChunk(tagItems, paginationSize);
        for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
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
