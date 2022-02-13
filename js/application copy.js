'use strict';
  
(function () {
   $(document).ready(function () {
      // Initialises Tableau Data Extension
      tableau.extensions.initializeAsync().then(function () {
      // Once we initialize we call teh drawChartJS function.
      drawChartJS();
   }, function () { console.log('Error while Initializing: ' + err.toString()); });
   });
 
   // This javascript function gets data from our worksheet and draws the Doughnut.
   function drawChartJS() {
      // Gets all the worksheets in a Tableau Dashboard
      const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
      let table = $(".table");
      // Finds a worksheet called worksheetData
      var worksheet = worksheets.find(function (sheet) {
         return sheet.name === "Sheet 1";
      });
 
      // Call a function on the worksheet Object to get the Summary Data.
      worksheet.getSummaryDataAsync().then(function (sumdata) {
         // Create an empty arrays for our labels and data set.
         var labels = [];
         var data = [];
          
         // We get our summary data:
         var worksheetData = sumdata.data;
         // We loop through our summary data and hardcode which columns goes into Label
         // and which column goes into the array.
         console.log(worksheetData[0][0].value)
         for (var i = 0; i < worksheetData.length; i++) {
            labels.push(worksheetData[i][0].formattedValue);
            data.push(worksheetData[i][1].value);
         }
 
         // Draw the chart as before.
         let Segments = $(".Segments")
         let OrderDate = $(".OrderDate")
         const Datalenght = labels.length;

         let table = $(".mytable")

         for(i = 0; i < data.length; i++){

         // console.log(data[i]);
          table.append('<tr><td>' + data[i] + '</td><td>' + labels[i] + '</td></tr>');
      }



      });
   }
})();


let button = document.querySelector("#button-excel");

button.addEventListener("click", e => {
  let table = document.querySelector("#simpleTable1");
  TableToExcel.convert(table);
});