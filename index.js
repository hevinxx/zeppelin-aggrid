import Visualization from '../../visualization';
import PassthroughTransformation from '../../../tabledata/passthrough';

import agGrid from '../../../../../bower_components/ag-grid/dist/ag-grid';
//import '../../../../../bower_components/ag-grid/dist/styles/ag-grid.css';
//import '../../../../../bower_components/ag-grid/dist/styles/theme-fresh.css';

/**
 * Visualize data in bar char
 */
export default class AgGridTable extends Visualization {
  constructor(targetEl, config) {
    super(targetEl, config);

    this.passthrough = new PassthroughTransformation(config);
    this.targetEl = targetEl[0];
    this.targetEl.classList.add('ag-fresh');
    // specify the columns
    this.columnDefs = [
      {headerName: "Make", field: "make"},
      {headerName: "Model", field: "model"},
      {headerName: "Price", field: "price"}
    ];

    // specify the data
    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
    ];

    // let the grid know which columns and what data to use
    this.gridOptions = {
      columnDefs: null,
      rowData: null,
      enableSorting: true,
      enableFilter: true,
      //onGridReady: () => console.log('gridOptions!!!', this)
    };
  };

  type() {
    return 'agGrid';
  };

  getTransformation() {
    return this.passthrough;
  };

  render(data) {
    console.log("agggggrid", data, this, JSON.stringify(this.gridOptions));

    let columnDefs = data.columns.map(col => {
      return {'headerName': col.name, 'field': col.name.toLowerCase()}
    });
    let rowData = data.rows.map(row => {
        return {
          [columnDefs[0].field]: row[0], 
          [columnDefs[1].field]: row[1], 
          [columnDefs[2].field]: row[2]
        }
      });
    this.gridOptions.columnDefs = columnDefs;
    this.gridOptions.rowData = rowData;

    console.log('columnDefs', columnDefs);
    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(this.targetEl, this.gridOptions);
  };

  /**
   * Set new config
   */
  setConfig(config) {
    super.setConfig(config);
    this.pivot.setConfig(config);
  };

}
