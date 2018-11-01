zeppelin-aggrid
===============

Data visualization for [Apache Zeppelin](http://zeppelin.apache.org) using [ag-Grid](https://www.ag-grid.com) (rich table widget).


## How to use

Place [zeppelin-aggrid.json](https://github.com/menix/zeppelin-aggrid/blob/master/zeppelin-aggrid.json) in your local registry (default location is `ZEPPELIN_HOME/helium`).

And enable visualization from the Helium page. You can go there from dropdown menu under your username at the top right corner in Zeppelin.

## Licence key
You have to set your licence key manually by updating the `line 81` at `ZEPPELIN_HOME/local-repo/vis/node_modules/zeppelin-aggrid/aggrid-transformation.js` file in order to enable advanced ag-Grid options like Aggregation and Pivoting.

## Loading data
You can load data in any way possible in Zeppelin. Loading from CSV file with comma delimeter is shown below.

```
val someData = spark.read.format("csv")
  .option("sep", ",")
  .option("inferSchema", "true")
  .option("header", "true")
  .load("/some/path/to/data.csv")
z.show(someData)
```

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

Some points for setting data pivoting in this plugin can be done by the ag-Grid UI (e.g. Tool Panel), some things not.
To allow a column to be used as pivot column via the Tool Panel, set `"enablePivot": true` on the required columns. Otherwise you won't be able to drag and drop the columns to the pivot drop zone from the Tool Panel.

Be aware that `date` column in the example above won't be shown, because nor aggregation, nor grouping, nor pivoting is enabled for it.

You can manage table column width by clicking the menu sign, which is appearing at the right of column name on mouse over.

You can choose aggregation function by clicking on field name in Values set on Tool Panel.

Please, read the [documentation about pivoting](https://www.ag-grid.com/javascript-grid-pivoting/) with ag-Grid for more details, if it is needed.

## Compatibility

Requires Zeppelin 0.7.2+
