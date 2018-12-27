zeppelin-aggrid
===============

Data visualization for [Apache Zeppelin](http://zeppelin.apache.org) using [ag-Grid](https://www.ag-grid.com) (rich table widget).


## How to use
Zeppelin (since 0.8.0 version) got automatically all its Helium plugins published in NPM. So, just enable visualization plugin from the Helium page. You can go there from dropdown menu under your username at the top right corner in Zeppelin.

## Licence key
You have to set valid licence key manually by updating the `line 81` at `ZEPPELIN_HOME/local-repo/vis/node_modules/zeppelin-aggrid/aggrid-transformation.js` file in order to enable advanced ag-Grid options like Aggregation and Pivoting.

Please, be aware you may ask ag-Grid for trial licence key which is valid during 3 month.

## Loading data
You can load data in any way possible in Zeppelin. Please, look into Zeppelin standard tutorial notebooks for examples.

## Settings
You can use usual Zeppelin visualisations Settings panel to update ag-Grid `columnDefs` in the according UI field. Unlike usual ag-Grid settings the data placed there should be a valid JSON, i.e. strings must be framed with double quotes except of numeric, boolean or null values. Example is shown below.

```
{"columnDefs": [
    {"field": "gold", "aggFunc": "sum", "enableValue": true, "width": 100},
    {"field": "silver", "aggFunc": "min", "enableValue": true, "width": 100},
    {"field": "bronze", "aggFunc": "max", "enableValue": true, "width": 100},
    {"field": "country", "rowGroup": true, "enableRowGroup": true},
    {"field": "year", "pivot": true, "enablePivot": true},
    {"field": "date"},
    {"field": "sport", "pivot": false, "enablePivot": true} 
]}
```

## Pivoting
Please, read the [ag-Grid docs about pivoting](https://www.ag-grid.com/javascript-grid-pivoting/) for more details and examples, if it is needed.

Some points for setting data pivoting in this plugin can be done by the ag-Grid UI (e.g. Tool Panel), some things not.
To allow a column to be used as pivot column via the Tool Panel, set `"enablePivot": true` on the required columns definitions. Otherwise you won't be able to drag and drop the columns to the pivot drop zone from the Tool Panel.

Enable Pivot mode by switching eponymous checkbox on Tool Panel then.

Be aware that `date` column in the example above won't be shown, because nor aggregation, nor grouping, nor pivoting is enabled for it.

You can manage table column width by clicking the menu sign, which is appearing at the right of column name on mouse over.

You can choose aggregation function by clicking on field name in Values set on Tool Panel.

## Compatibility
Requires Zeppelin 0.7.2+ (but 0.8.0 is better)

## Changelog
* 0.2.3 `2018-12-27` Pivot mode disabled by default, that allows plugin to show data as simple table on start; critical error with empty columnDefs was fixed.
* 0.2.2 licence key definition and setting template moved to aggrid-tranformation.js.

## Maintenance
This plugin works fine, but I made it for my work project and I don't plan to support it after year 2018. Please fork the repo and ask me for NPM ownership in case it's insteresting for you.
