const pluginLocalRespimg = require('eleventy-plugin-local-respimg');

module.exports = function (eleventyConfig) {
    
    // Miscellaneous quick Eleventy config options
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("CNAME")
    eleventyConfig.setDataDeepMerge(true);

    // Responsive images with https://github.com/chromeos/static-site-scaffold-modules/tree/master/modules/eleventy-plugin-local-respimg
    eleventyConfig.addPlugin(pluginLocalRespimg, {
        folders: {
          source: '_site', // Folder images are stored in
          output: '_site', // Folder images should be output to
        },
        images: {
          resize: {
            min: 250, // Minimum width to resize an image to
            max: 1500, // Maximum width to resize an image to
            step: 150, // Width difference between each resized image
          },
          gifToVideo: false, // Convert GIFs to MP4 videos
          sizes: '100vw', // Default image `sizes` attribute
          lazy: true, // Include `loading="lazy"` attribute for images
          additional: [
            // Globs of additional images to optimize (won't be resied)
            'assets/img',
          ],
          watch: {
            src: 'assets/img', // Glob of images that Eleventy should watch for changes to
          },
          pngquant: {
            /* ... */
          }, // imagemin-pngquant options
          mozjpeg: {
            /* ... */
          }, // imagemin-mozjpeg options
          svgo: {
            /* ... */
          }, // imagemin-svgo options
          gifresize: {
            /* ... */
          }, // @gumlet/gif-resize options
          webp: {
            /* ... */
          }, // imagemin-webp options
          gifwebp: {
            /* ... */
          }, // imagemin-gif2webp options
        },
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
    eleventyConfig.addCollection("blogPages", function(collection) {
        return createFilteredCollection(collection, paginationSize, blog_tag);
    });

    eleventyConfig.addCollection("tagPages", function(collection) {
        return createFilteredCollection(collection, paginationSize, blog_tag, true);
    });

    // Create a collection with all unique tags.
    eleventyConfig.addCollection("uniqueTags", function(collection) {
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
function createFilteredCollection(collection, paginationSize, filter_tags, inverse=false) {
    // We use lodashChunk, so require it.
    var lodashChunk = require('lodash.chunk');

    // Get unique list of tags
    let tagSet = getUniqueTags(collection, filter_tags, inverse);

    // Get each item that matches the tag
    let tagMap = [];
    let tagArray = [...tagSet];
    for( let tagName of tagArray) {
        let tagItems = collection.getFilteredByTag(tagName).reverse();
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

// Part of the function from https://github.com/11ty/eleventy/issues/332, split out to make it usable on its own.
function getUniqueTags(collection, filter_tags, inverse=false) {
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
    return tagSet;
}
