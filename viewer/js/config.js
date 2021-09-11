function config() {
    return {
            roi: {"x0": 0, "x1": 7602, "y0": 0, "y1": 5471 },
            imageSize: [262144, 188660],
            tiles: 'https://storage.googleapis.com/ca1-data/img/262144px/{z}/{y}/{x}.jpg',
            cellData: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellData/cellData.tsv',
            geneData: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/geneData/geneData.tsv',
            cellBoundaries: 'https://www.googleapis.com/storage/v1/b/ca1-data/o/cellBoundaries/cellBoundaries.tsv',
            class_name_separator: '.' //The delimiter in the class name string, eg if name is Astro.1, then use the dot as a separator, if Astro1 then use an empty string. It is used in a menu/control to show the class names nested under its broader name
        }
}

