$.ajax({
  type: "POST",
  url: "http://172.26.54.142:8090/iserver/services/data-BdpfLayer/rest/data/featureResults.rjson?returnContent=true",
  contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  data:  {
    getFeatureMode: "SQL",
    datasetNames: ["supermapdb:服务机构点位"],
    maxFeatures: 10,
    queryParameter: {}
  },
  dataType: "json",
  success: function(res){
    alert( "Data: " + res );
  }
});