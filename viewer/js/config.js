function config() {
    return {
            roi: {"x0": 0, "x1": 7602, "y0": 0, "y1": 5471 },
            zoomLevels: 10, // maximum zoom levels. Leave that at 10.
            tiles: 'https://storage.googleapis.com/ca1-data/img/262144px/{z}/{y}/{x}.jpg',
            cellData: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellData%2FcellData.tsv',
            geneData: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/geneData%2FgeneData.tsv',
            cellBoundaries: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellBoundaries%2FcellBoundaries.tsv',
            class_name_separator: '.' //The delimiter in the class name string, eg if name is Astro.1, then use the dot as a separator, if Astro1 then use an empty string. It is used in a menu/control to show the class names nested under its broader name
        }
}

// In google cloud storage, the objects must be encoded. That means in the links above pointing to googleapis.com, all / after /o/ have been replaced by %2F
// There is a helper function by the encode(url) function inside index.js that can be used to do the encoding