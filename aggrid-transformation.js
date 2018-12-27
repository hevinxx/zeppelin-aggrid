/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Transformation from 'zeppelin-tabledata/transformation';

/**
 * passthough the data
 */
export default class AggridTransformation extends Transformation {
  constructor(config) {
    super(config);
  };

  getSetting() {
    var self = this;

    var configObj = self.config;
    console.log('getSetting', configObj);
    return {
      template: `
      <style>
        .row.agsett + .row.agsett {padding-bottom:15px;}
        .agsett textarea {display:block;width:100%;resize:none;}
        .agsett .btn-savesett {position:relative;top:-9px;left:20px;}
      </style>
      All fields:
      <div class="allFields row agsett">
        <ul class="noDot">
          <li class="liVertical" ng-repeat="col in tableDataColumns">
            <div class="btn btn-default btn-xs"
                 data-drag="false"
                 data-jqyoui-options="{revert: 'invalid', helper: 'clone'}"
                 ng-model="tableDataColumns"
                 jqyoui-draggable="{index: {{$index}}, placeholder: 'keep'}">
               {{col.name | limitTo: 30}}{{col.name.length > 30 ? '...' : ''}}
            </div>
          </li>
        </ul>
        <button class="btn btn-primary btn-sm btn-savesett" ng-click="save()">Save Settings</button>
      </div>
      
      <div class="row agsett">
        <div class="col-md-8">
          <span class="columns lightBold">
            Custom Ag-Grid Settings (should be valid JSON)
            <textarea name="customSettings" id="customSettings" cols="30" rows="10" ng-model="config.customSettings"></textarea>
          </span>
        </div>
      </div>
      `,
      scope: {
        config: configObj,
        tableDataColumns: self.tableDataColumns,
        save: function() {
          self.emitConfig(configObj);
        }
      }
    };
  };

  /**
   * Method will be invoked when tableData or config changes
   */
  transform(tableData) {
    this.tableDataColumns = tableData.columns;
    var config = this.config;

    config.customSettings = config.customSettings || '{"columnDefs":[], "api":[]}';
    // Please put your licence key between the single quotes below
    config.licenceKey = '';

    return tableData;
  };
}
