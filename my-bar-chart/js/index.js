"use strict";

var width = 1000;
var height = 500;
var padding = 60;
var paddingRight = 30;
var paddingBottom = 30;
var dataset = undefined;

var svg = d3.select("body").append("svg").attr("width", width + padding + paddingRight).attr("height", height + paddingBottom);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (err, json) {

  dataset = json.data;
  var barWidth = width / dataset.length;

  var minDate = new Date(dataset[0][0]);
  var maxDate = new Date(dataset[dataset.length - 1][0]);

  // Define Scales

  var xScale = d3.scaleTime().domain([minDate, maxDate]).range([padding, width + padding]);
  var yScale = d3.scaleLinear().domain([d3.min(dataset, function (d) {
    return d[1];
  }), d3.max(dataset, function (d) {
    return d[1];
  })]).range([height - paddingBottom, paddingBottom]);

  // Draw Data

  d3.select('svg').selectAll('rect').data(dataset).enter().append('rect').attr('x', function (d, i) {
    return padding + i * barWidth;
  }).attr('y', function (d) {
    return yScale(d[1]);
  }).attr('width', barWidth).attr('height', function (d) {
    return yScale(0) - yScale(d[1]);
  }).attr('data-date', function (d, i) {
    return data.data[i][0];
  }).attr('data-gdp', function (d, i) {
    return data.data[i][1];
  });

  var yAxis = d3.axisLeft(yScale);
  svg.append("g").attr("transform", "translate(" + padding + "," + 5 + ")").call(yAxis).attr('id', 'y-axis');

  var xAxis = d3.axisBottom(xScale);
  svg.append("g").attr("transform", "translate(0" + "," + (height - paddingBottom + 5) + ")").call(xAxis).attr('id', 'x-axis');
});