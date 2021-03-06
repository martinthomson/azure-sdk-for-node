﻿/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// Module dependencies.
var js2xml = require('../util/js2xml');
var Constants = require('../util/constants');
var ServiceRuntimeConstants = Constants.ServiceRuntimeConstants;

// Expose 'XmlCurrentStateSerializer'.
exports = module.exports = XmlCurrentStateSerializer;

function XmlCurrentStateSerializer() { }

XmlCurrentStateSerializer.prototype.serialize = function (currentState) {
  var currentStateXml = {};
  currentStateXml[ServiceRuntimeConstants.CURRENT_STATE] = {};
  currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE] = {};
  currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][Constants.XML_METADATA_MARKER] = {};
  currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][Constants.XML_METADATA_MARKER][ServiceRuntimeConstants.CLIENT_ID] = currentState.clientId;

  // If it is a request for a change of status
  if (currentState.status) {
    currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][ServiceRuntimeConstants.ACQUIRE] = {};

    var expirationDate = currentState.expiration.toISOString();
    currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][ServiceRuntimeConstants.ACQUIRE][ServiceRuntimeConstants.INCARNATION] = currentState.incarnation;
    currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][ServiceRuntimeConstants.ACQUIRE][ServiceRuntimeConstants.STATUS] = currentState.status;
    currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][ServiceRuntimeConstants.ACQUIRE][ServiceRuntimeConstants.STATUS_DETAIL] = currentState.status;
    currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][ServiceRuntimeConstants.ACQUIRE][ServiceRuntimeConstants.EXPIRATION] = expirationDate;
  } else {
    currentStateXml[ServiceRuntimeConstants.CURRENT_STATE][ServiceRuntimeConstants.STATUS_LEASE][ServiceRuntimeConstants.RELEASE] = {};
  }

  // Serialize JSON object to XML
  var xml = js2xml.serialize(currentStateXml);

  return xml;
};
