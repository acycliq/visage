# Visage
An interactive web-based viewer to visualise 2D spatial transcriptomics data. A demo using 
CA1 data from [Qian, X., et al. Nature Methods (2020)](https://www.nature.com/articles/s41592-019-0631-4) runs
 [here](https://acycliq.github.io/visage/)
<p align="center">
    <img src="https://github.com/acycliq/visage/blob/main/viewer/assets/screencast_resized.gif?raw=true" alt="Your image title"/>
</p>

## Settings
The viewer is controlled by the following files:

* [config.js](viewer/js/config.js)
* [glyphConfig.js](viewer/js/glyphConfig.js)
* [classConfig.js](viewer/js/classConfig.js)

If you want to use your own data, read the comments therein to understand how to edit them to fit your needs.


## The background image
To add a background image you need to make a pyramid of tiles. One way to do this is to use `tile_maker()`:
    
    import pciSeq

    pciSeq.tile_maker('path\to\background_image.tif', z_depth=8)

This will create a tree-like structure of nested directories under a folder named `tiles` in your current directory. It will look like:

     tiles 
          |--0
             |--0.jpg     <-- Your image scaled down as a 256px-256px jpg
          |--1
             |--0
                |--0.jpg  <-- The top left quarter of your image as a 256px-256px jpg
                |--1.jpg  <-- The top right quarter of your image as a 256px-256px jpg
             |--1
                |--0.jpg  <-- The bottom left quarter of your image as a 256px-256px jpg
                |--1.jpg  <-- The bottom right quarter of your image as a 256px-256px jpg
          .
          .
          .
          .
         |--8
             |--0
                .
                .
             |--1
             .
             .
             .

`tile_maker()` is a wrapper around `dzsave` of pyvips which depends on lipvips. You can install libvips from 
[here](https://www.libvips.org/install.html). Because of licensing issues however, dzsave has been removed 
in the precompiled windows binaries for version 8.14.2 of libvips. It might come back in the future, it looks better though,
if you are on Windows, to download an older version, [v8.13.2](https://github.com/libvips/build-win64-mxe/releases/tag/v8.13.2) 
for example should work. Thanks to [Alex Becalick](https://github.com/AlexBecalick) for bringing this to my attention. 
Do not forget also to add libvips to your PATH. 

Once you got your tiles you should move them somewhere where the viewer can pick them up, that means in a location which is served, 
anywhere under your project root for example. You could move the `tiles` folder next to your tsv flat files for example and then update 
the setting for `layers` in your your `config.js` to point to this new location. The path should be relative to your `index.html`, do not use absolute paths. In this case for example, your config.js will look like:


        "cellData": { "mediaLink": "../../data/cellData.tsv", "size": "2180603"},
        "geneData": { "mediaLink": "../../data/geneData.tsv", "size": "9630820"},
        "cellBoundaries": {"mediaLink": "../../data/cellBoundaries.tsv", "size": "1306209"},
        "roi": {"x0": 0, "x1": 7602, "y0": 0, "y1": 5471},
        "maxZoom": 8,
        "layers": {
            "dapi": "/data/tiles/{z}/{y}/{x}.jpg"
        },
        "spotSize": 1/16

In most cases, 8 zoom levels will be enough. If you have a large image, like full coronal slice for example, then 10 levels
might be better. Note that the resulting `tiles` folder, in terms of disk space will be quite big since the number of files grows 
exponentially. If you really need 10 zoom levels, maybe generating the tiles directly in your final destination would make sense 
in order avoid unnecessary IO operations. The total folder size could be above 4GB containing more than 900,000 small jpgs. Depending
on your machine, creating a pyramid of tiles with 10 zoom levels will need more than an hour to finish. \
In case you have access to some cloud storage facility (aws, gcs...) I think it is way better to store the tiles there, especially if that
folder is really big.

If you want to use two images as background and switch between them you have to tile the second image and update `layers` 
in your `config.js` with the new entry:

        "layers": {
            "dapi": "/data/tiles/{z}/{y}/{x}.jpg",
            "some_stain": "/data/stain_tiles/{z}/{y}/{x}.jpg"
        },

You will find then a control at the top right of the viewer with radio buttons to select your background. 
