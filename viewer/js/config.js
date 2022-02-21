function config() {
    return {
            roi: {"x0": 0, "x1": 7602, "y0": 0, "y1": 5471 },
            zoomLevels: 10, // maximum zoom levels. Leave that at 10.
            tiles: 'https://storage.googleapis.com/ca1-data/img/262144px/{z}/{y}/{x}.jpg',
            cellData: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellData%2FcellData.tsv',
            geneData: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/geneData%2FgeneData.tsv',
            cellBoundaries: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellBoundaries%2FcellBoundaries.tsv',
            class_name_separator: '.' // Classes/subclasees etc are delimited by a dot
        }
}

// In google cloud storage, the urls must be encoded. That means in the links above pointing to googleapis.com, all / after /o/ have been replaced by %2F
// Hence the encoded form of 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellData/cellData.tsv' is 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellData%2FcellData.tsv',
