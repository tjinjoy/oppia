// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
  * @fileoverview Service to get data for viewing the subtopic page.
  */

oppia.constant(
  'SUBTOPIC_VIEWER_DATA_URL_TEMPLATE',
  '/subtopic_viewer_handler/data/<topic_id>/<subtopic_id>');

oppia.factory('SubtopicViewerBackendApiService', [
  '$http', '$q', 'SUBTOPIC_DATA_URL_TEMPLATE', 'UrlInterpolationService',
  function($http, $q, SUBTOPIC_DATA_URL_TEMPLATE, UrlInterpolationService) {
    var _fetchSubtopicData = function(
        topicId, subtopicId, successCallback, errorCallback) {
      var subtopicDataUrl = UrlInterpolationService.interpolateUrl(
        TOPIC_DATA_URL_TEMPLATE, {
          topic_id: topicId,
          subtopic_id: subtopicId
        });

      $http.get(subtopicDataUrl).then(function(response) {
        var subtopicDataDict = angular.copy(response.data);
        if (successCallback) {
          successCallback(subtopicDataDict);
        }
      }, function(errorResponse) {
        if (errorCallback) {
          errorCallback(errorResponse.data);
        }
      });
    };

    return {
      fetchSubtopicData: function(topicId, subtopicId) {
        return $q(function(resolve, reject) {
          _fetchSubtopicData(topicId, subtopicId, resolve, reject);
        });
      };
    }
  }
]);