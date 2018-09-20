import Visualization from 'zeppelin-vis';
import AggridTransformation from './aggrid-transformation';
import 'ag-grid-enterprise/dist/ag-grid-enterprise';
import {Grid, LicenseManager} from 'ag-grid-enterprise/dist/ag-grid-enterprise';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import _ from 'lodash';

export default class AgGridTable extends Visualization {
  constructor(targetEl, config) {
    super(targetEl, config);

    this.passthrough = new AggridTransformation(config);
    LicenseManager.setLicenseKey(config.licenceKey);

    this.targetEl = targetEl[0];
    this.targetEl.classList.add('ag-theme-balham');

    this.gridOptions = {
      enableSorting: true,
      //enableFilter: true,
      //components: {
      //  'negativesFormatter': NegativesFormatter
      //},
      onGridReady: function(params) {
        //params.api.sizeColumnsToFit();
      },
      onRowDataChanged: function(params) {
        //params.api.sizeColumnsToFit();
      },

      pivotMode: true,
      rowData: null,
      groupIncludeFooter: true,
      showToolPanel: true,
      autoGroupColumnDef: {
        cellRendererParams: {
          footerValueGetter: '"Total (" + x + ")"'
        }
      }
    };

    let grid = new Grid(this.targetEl, this.gridOptions);
  };

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  render(data) {
    console.log('render data', data);
    console.log('render this.config', this.config);

    let columnDefs = data.columns.map(col => {
      return {'headerName': col.name, 'field': col.name.toLowerCase()}
    });

    let rowData = data.rows.map(row => {
      let obj = {};
      columnDefs.forEach((col, idx) => {
        obj[col.field] = this.isNumeric(row[idx]) ? parseFloat(row[idx]) : row[idx];
      });
      return obj;
    });

    const customSettings = JSON.parse(this.config.customSettings);
    console.log('index customSettings', customSettings);

    this.mergeByProperty(columnDefs, customSettings.columnDefs, 'field');

    //Object.assign(columnDefs, customSettings.columnDefs);
    console.log('UPDATED gridOptions', this.gridOptions);
    console.log('UPDATED config', columnDefs);// this.gridOptions);
    console.log('UPDATED rowData', rowData);

    this.gridOptions.api.setColumnDefs(columnDefs);
    this.gridOptions.api.setRowData(rowData);

    if (customSettings.api) {
      customSettings.api.forEach(apiSett => {
        console.log('index apiSett', apiSett);
        Object.keys(apiSett).forEach( key => this.gridOptions.api[key](apiSett[key]) )
      })
    }

  };

  mergeByProperty(arr1, arr2, prop) {
    _.each(arr2, function(arr2obj) {
      var arr1obj = _.find(arr1, function(arr1obj) {
        return arr1obj[prop] === arr2obj[prop];
      });

      arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
    });
  };

  type() {
    return 'agGrid';
  };

  getTransformation() {
    return this.passthrough;
  };

}

//formats numbers with comma delimeter after every 3 digits
function formatNumericCells(val) {
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  function numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return isNumeric(val) ? numberWithCommas(Math.round(val)) : val
}

//Cell Renderer component shows negatives with Excel-like style
function NegativesFormatter() {}

NegativesFormatter.prototype.init = function(params) {
  this.eGui = document.createElement('span');
  let val = params.value;
  if (val < 0) this.eGui.style.color = '#c00';

  this.eGui.innerHTML = formatNumericCells(val * 1000) + '';
};

NegativesFormatter.prototype.getGui = function() {
  return this.eGui;
};
