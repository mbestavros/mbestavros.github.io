module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.setDataDeepMerge(true);

    // --- WORKAROUND FOR DOUBLE PAGINATION: see https://github.com/11ty/eleventy/issues/332 ---
    // This allows individual tag categories (a result of pagination themselves) to be paginated.
    var lodashChunk = require('lodash.chunk');
    eleventyConfig.addCollection("doublePagination", function(collection) {
        // Get unique list of tags
        let tagSet = new Set();
        collection.getAllSorted().map(function(item) {
            if( "tags" in item.data ) {
                let tags = item.data.tags;

                // optionally filter things out before you iterate over?
                for (let tag of tags) {
                    tagSet.add(tag);
                }

            }
        });

        // Get each item that matches the tag
        // Also where you set the page size.
        let paginationSize = 3;
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
        //console.log( tagMap );
        return tagMap;
    });

    return {
        dir: {
            input: "./",      // Equivalent to Jekyll's source property
            output: "./_site" // Equivalent to Jekyll's destination property
        },
    };
};
