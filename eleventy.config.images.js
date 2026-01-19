import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
    // Shortcode for responsive images with eleventy-img
    eleventyConfig.addShortcode("responsiveImage", async function (src, alt, sizes = "100vw") {
        if (!src || process.env.SKIP_IMAGES) {
            return "";
        }

        console.log("Converting " + src);

        let metadata = await Image(src, {
            widths: [300, 600, 900, 1200, 1500, 1800, 2100],
            formats: ["avif", "webp", "jpeg"],
            urlPath: "/assets/images/",
            outputDir: "./_site/assets/images/",
            cacheDuration: "1d"
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        };

        return Image.generateHTML(metadata, imageAttributes);
    });
};
