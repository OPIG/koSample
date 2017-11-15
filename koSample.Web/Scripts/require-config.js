/// <reference path="require.js" />
require.config({
    waitSeconds: 0,
    urlArgs: "v=" + (this.cosmosDbDataExplorerVersion || new Date().getTime()),
    baseUrl: baseUrl,
    paths: {
        "ko": "knockout-3.4.2",
        "jquery": "jquery-3.2.1.min",
        "bootstrap": "bootstrap.min"
    }
});