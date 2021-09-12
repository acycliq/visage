# pciSeq viewer
An interactive web-based viewer to visualise 2D spatial transcriptomics data. A demo using 
CA1 data from [Qian, X., et al. Nature Methods (2020)](https://www.nature.com/articles/s41592-019-0631-4) runs
 [here](https://acycliq.github.io/ca1/)

<img src="viewer/assets/screenshot.jpg" alt="Your image title"/>

## Instructions
You can feed your own data, cell typed or not; Please read below for more details

#### 1. Introduction
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
 
#### 2. Background image
As a backgound, in most cases we will be a showing a dapi stain. We should have the original image in a tif, jpg, png etc format which will 
be processed to produce a nested directory tree of thousands of small 256px-by-256px jpg files called `map tiles`. At any given zoom level 
the viewer (or to be precise, [leaflet.js](www.leaflet.js)) fetches the necessary tiles and aligns them on the screen making a mosaic that looks 
to the user as a big single image when in reality it is a collation of small ones. 
Read [here](https://en.wikipedia.org/wiki/Tiled_web_map), [here](https://docs.microsoft.com/en-us/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp) and
[here](https://www.e-education.psu.edu/geog585/node/706) for more details on tiled maps

Get the `tile_maker` function from the [stage_image](https://github.com/acycliq/pciSeq/blob/master/pciSeq/src/viewer/stage_image.py) module in the 
[pciSeq](https://github.com/acycliq/pciSeq) repo. Set the `z-depth` parameter to `10` despite the fact that in several cases this will be an overkill. Ten zoom levels will be needed for very big images, like 
full coronal slices, otherwise eight levels, or even six, will be fine. However setting `z-depth = 10` will simplify the process of adopting the code and use it with your 
own data especially if you do this for the first time. 
The rest of the arguments are self-explanatory. A typical example will look like:

```python
import pyvips

tile_maker(z_value, path\to\target\dir, path\to\dapi_image.tif)
```

For `z_value = 10` as recommended, this operation on my Intel i7 Windows 10 PC takes about 1h:15mins to complete
Note that you have to install [pyvips](https://anaconda.org/conda-forge/pyvips). If you are a windows user you will also need 
to install the [libvips binary](https://libvips.github.io/libvips/install.html) and put in in your `PATH`

#### 3. Viewer flat files
The viewer can work with cell typed data but also with impartial ones. Impartial data means you might have only the (x,y) of 
your spots and nothing else or the the spots and the cell boundaries but you are missing the spot-to-cell and cell-to-cell type assignments.

##### 3.1. Cell-typed flat files
The following three tsv files are needed:
* cellData.tsv
* geneData.tsv
* cellBoundaries.tsv

The scheme (ie columns) for `cellData.tsv` and `geneData.tsv` is the same as their counterpart dataframes explained in section 3 of this 
[notebook](https://colab.research.google.com/github/acycliq/pciSeq/blob/master/notebooks/pciSeq.ipynb) from the pciSeq repo. 
The `cellBoundaries.tsv` should have two columns: `cell_id` and	`coords`. The `cell_id` is the same as the `Cell_Num` column from `cellData.tsv` 
and `coords` describes the boundaries and is a list of lists. Each sublist has the x, y coords of the points defining the polygon of the outer ring.
The polygon should be a closed one, ie the first and the last pair of coordinates should be the same.

##### 3.2. Cell-type info unavailable
Suppose now that your data havent been processed by a cell calling algorithm hence the spot-to-cell and cell-to-cell type probabilities are missing. 
Everything else however like cell centroids, cell boundaries, spot coordinates etc are known. In this case, the `cellBoundaries.tsv` file is exactly the same 
as previously. The schema for both `geneData.tsv` and `cellData.tsv` will not change, some of the columns however will be filled in a manner that reflects the 
missing info and allows the data to flow unobstructed through the javascript code. 

For `cellData.tsv`
* `Cell_Num`: The id of the cell (It matches the cell_id from the cellBoundaries.tsv)
* `X`: This will be the x-coord of the cell centroid. 
* `Y`: This will be the y-coord of the cell centroid.

* `Genenames`: ```diff This will be a list of the genes assigned to the cell. Leave that as an empty list```
* `CellGeneCount`: The total number of spots (dots) assigned to the cell. Leave that as an empty list
* `ClassName`: The will be a list of the most probable cell types (aka class name) of the cell. Leave that as a single element list [‘Generic’]
* `Prob`: The probabilities of each cell type. Leave that as a single element list [1.0]

 
For `geneData.tsv`
* `Gene`. The gene name, the label of the the spot
* `x`. the x-coord of the spot
* `y`: the y-coord of the spot
* `Gene_id`: Self explanatory
* `neighbour`: The cell_id of the cell that the spot will be assigned to with the highest prob. It is currently set to the dummy value of 0
* `neighbour_array`: A list of the cell_ids of the 4 closest to the spot cells. It is currently set to the dummy list [0]
* `neighbour_prob`: A list of the corresponding probabilities It expresses the prob that the cell will be “given” the particular spot. Set this to the list [1.0]


#### 4. Color schemes
 

