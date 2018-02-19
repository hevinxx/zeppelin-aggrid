import Visualization from 'zeppelin-vis';
import PassthroughTransformation from 'zeppelin-tabledata/passthrough';
import agGrid from 'ag-grid/dist/ag-grid';

export default class AgGridTable extends Visualization {
  constructor(targetEl, config) {
    super(targetEl, config);

    this.passthrough = new PassthroughTransformation(config);
    this.targetEl = targetEl[0];
    this.targetEl.classList.add('ag-fresh');

    this.gridOptions = {
      enableSorting: true,
      enableFilter: true
    };
  };

  type() {
    return 'agGrid';
  };

  getTransformation() {
    return this.passthrough;
  };

  render(data) {
    let columnDefs = data.columns.map(col => {
      return {'headerName': col.name, 'field': col.name.toLowerCase()}
    });
    let rowData = data.rows.map(row => {
      let obj = {};
      columnDefs.forEach((col, idx) => {
        obj[col.field] = row[idx];
      });
      return obj;
    });
    
    this.gridOptions.columnDefs = columnDefs;
    this.gridOptions.rowData = rowData;

    new agGrid.Grid(this.targetEl, this.gridOptions);
  };

  setConfig(config) {
    super.setConfig(config);
    this.pivot.setConfig(config);
  };

}
