# pciSeq viewer
An interactive web-based viewer to visualise 2D spatial transcriptomics data. A demo using 
CA1 data from [Qian, X., et al. Nature Methods (2020)](https://www.nature.com/articles/s41592-019-0631-4) runs
 [here](https://acycliq.github.io/ca1/)

<img src="viewer/assets/screenshot.jpg" alt="Your image title"/>

## Instructions
You can use your own data, cell typed or not; Please read below for more details

#### Intro
Download/clone the master branch from this repo. All the necessary code will be under the `\viewer\js\` directory. 
No extra installations are needed to run the viewer (apart from maybe Python solely for the purpose of running a webserver. 
However, you will need Python if you want to pass your own data). You can also use `github-pages` to host the website and demo your findings
available to a wider audience.

As a sanity check your local copy of the code should run fine if you open `index.html` that you will 
find under the root folder. Note that we need to serve the root directory (hence the need for Python) 
but most modern IDEs will do that automatically behind the scenes    

Then there are three main steps:
 * Prepare the background image
 * Save you data in the correct form so they can be digested by the viewer
 * Set the color scheme of your choice for the genes and cells
 
#### Background image
As a backgound, in most cases we will be a showing a dapi stain. We should have the original image in a tif, jpg, png etc format which will 
be processed to produce a nested directory tree of thousands of small 256px-by-256px jpg files called `map tiles`. At any given zoom level 
the viewer (or to be precise, [leaflet.js](www.leaflet.js)) fetches the necessary tiles and aligns them on the screen making a mosaic that looks 
to the user as a big single image when in reality it is a collation of small ones. 
Read [here](https://en.wikipedia.org/wiki/Tiled_web_map), [here](https://docs.microsoft.com/en-us/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp) and
[here](https://www.e-education.psu.edu/geog585/node/706) for more details on tiled maps

Get the `tile_maker` function from the [stage_image](https://github.com/acycliq/pciSeq/blob/master/pciSeq/src/viewer/stage_image.py) module in the 
[pciSeq repo](https://github.com/acycliq/pciSeq). Set the `z-depth` parameter to `10` despite the fact that in several cases this will be an overkill. Ten zoom levels will be needed for very big images, like 
full coronal slices, otherwise eight levels will be fine. However setting `z-depth = 10` will simplify the process of adopting the code and use it with your 
own data especially if you do this for the first time. 
The rest of the arguments are self-explanatory. A typical example will look like:

```python
import pyvips

tile_maker(z_value, path\to\target\dir, path\to\dapi_image.tif)
```

If you have set `z_value = 10` as recommended, this operation on my Intel i7 Windows 10 PC takes about 1h:15mins to complete
Note that you will have to install [pyvips](https://anaconda.org/conda-forge/pyvips). If you are a windows user you will also need 
to install the [libvips binary](https://libvips.github.io/libvips/install.html) and put in in your `PATH`

#### Viewer data
  
#### Color schemes
 

