# pciSeq viewer
An interactive web-based viewer to visualise 2D spatial transcriptomics data. A demo using 
CA1 data from in [[Qian, X., et al. Nature Methods (2020)]](https://www.nature.com/articles/s41592-019-0631-4) runs
 [here][(https://acycliq.github.io/ca1/)]

You can use your own data (cell typed or not) with the viewer; Please read below for more details
<img src="viewer/assets/screenshot.jpg" alt="Your image title"/>

## Instructions
Download/clone the master branch from this repo. All the necessary code will be under the `\viewer\js\` directory. No extra installations are needed. (apart from maybe Python solely for the purpose of running a webserver). 
As a sanity check your local copy of the code should run fine if you open `index.html` that you will 
find under the root folder. Note that will need to serve the root directory (hence the need for Python) 
but most modern IDEs will do that automatically behind the scenes    

Then there are two main steps:
 Prepare the background image
 Save you data in the correct form so they can be digested by the viewer


