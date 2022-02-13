'use strict';
$(document).ready(function () {
 // $("tbody").empty();
});






function LoadReport() {
 

    $(document).ready(function () {

      
      // Initialises Tableau Data Extension
      tableau.extensions.initializeAsync().then(function () {
        // Once we initialize we call teh drawChartJS function.
        drawChartJS();
        ClearReport()
      }, function () {
        console.log('Error while Initializing: ' + err.toString());
      });
    });

    function ClearReport() {
     $("tbody").empty();
    }


    // This javascript function gets data from our worksheet and draws the Doughnut.
    function drawChartJS() {
      // Gets all the worksheets in a Tableau Dashboard
      const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
      let table = $(".tbody");
      //$( "tbody" ).empty();
      // Finds a worksheet called worksheetData
      var worksheet = worksheets.find(function (sheet) {
        return sheet.name === "Sheet 1";
      });

      // Call a function on the worksheet Object to get the Summary Data.
      worksheet.getSummaryDataAsync().then(function (sumdata) {
        // Create an empty arrays for our labels and data set.

        var PlayerId = [];
        var CasinoId = [];


        // We get our summary data:
        var worksheetData = sumdata.data;


        for (var i = 0; i < worksheetData.length; i++) {


          PlayerId.push(worksheetData[i][4].value)
          CasinoId.push(worksheetData[i][5].value)

        }

        let table = $(".mytable")

        for (i = 0; i < PlayerId.length; i++) {

        //  console.log("sss")
          const CasinoLetter = ["X", "Y", "W", "Q", "T", "E","G","H","A" ,"B"]



          //var PlayerId = [1, 2, 3, 4, 5, 1, 1, 1, 2, 3, 4];
          var uniqueCasinoId = Array.from(new Set(CasinoId));
          var uniquePlayerId = Array.from(new Set(PlayerId));
          //var uniqueCasinoId = Array.from(new Set(CasinoId));



          //console.log(uniquePlayer);
          //console.log(uniqueCasinoId);
          let playerList = $(".player-list")

          $(".player-list").html(" ");
          for (i = 0; i < uniqueCasinoId.length; i++) {
              console.log("ssss")
           // playerList.append('<p>' + uniqueCasinoId[i] + '</p>')
            playerList.append('<button data-toggle="button" aria-pressed="false" autocomplete="off" class="btn btn-primary casino-btn" type="button" value="' + uniqueCasinoId[i] + '"letter="' + CasinoLetter[i] + '" casino="' + uniqueCasinoId[i] + '">' + uniqueCasinoId[i] + '</button>')


          }
          $("tbody").html(" ");
          for (i = 0; i < worksheetData.length; i++) {

           // console.log("start");
            table.append('<tr player="' + PlayerId[i] + '" casino="' + CasinoId[i] + '" ><td>' + worksheetData[i][0].formattedValue + '</td  ><td>' + worksheetData[i][1].value + '</td ><td>' + worksheetData[i][2].value + '</td><td>' + worksheetData[i][3].value + '</td><td player="' + PlayerId[i] + '">' + PlayerId[i] + '</td  ><td casino="' + CasinoId[i] + '">' + CasinoId[i] + '</td><td>' + worksheetData[i][6].value + '</td><td>' + worksheetData[i][7].value + '</td><td>' + worksheetData[i][8].value + '</td><td>' + worksheetData[i][9].value + '</td><td>' + worksheetData[i][10].value + '</td></tr>');

          }

          let CasinoBtn = $("button");
          let total = $("tr");


          for (i = 0; i < total.length + 1; i++) {


            for (var x = 0; x < CasinoBtn.length + 1; x++) {

              if ($("tr").eq(i).attr("casino") == $("button").eq(x).attr("casino")) {

                $("tr").eq(i).attr("letter", $("button").eq(x).attr("letter"))

              }

            }

          }



          let allTRCount = $("tr").length;

          CasinoBtn.click(function () {

            var button = $(this).val();

            let CasinoIden = $('tr[casino=' + button + ']');


            let allTRCount = $("td").length;

            for (var x = 0; x < uniqueCasinoId.length; x++) {

              if (button != uniqueCasinoId[x]) {

                //console.log("works")
                //  console.log(uniqueCasinoId[x])

                let letterHolder = $('tr[casino=' + uniqueCasinoId[x] + ']').attr('letter');

                // $( 'tr[casino='+ uniqueCasinoId[x] + ']' ).children(1).html("Casino " + letterHolder);
                $('tr[casino=' + uniqueCasinoId[x] + '] :nth-child(5)').text("Player  " + letterHolder);
                $('tr[casino=' + uniqueCasinoId[x] + '] :nth-child(6)').text("Casino  " + letterHolder);

              } else if (button == uniqueCasinoId[x]) {

                let PlayID = $('tr[casino=' + uniqueCasinoId[x] + '] :nth-child(5)');
                let CasID = $('tr[casino=' + uniqueCasinoId[x] + '] :nth-child(6)');

                PlayID.text(PlayID.attr("player"));
                CasID.text(CasID.attr("casino"));


              }


            }



          });





        }



      });
    }


}

$(document).ready(function () {
  $("#btnExport").click(function () {
    let table = document.getElementsByTagName("table");
    TableToExcel.convert(table[0], { // html code may contain multiple tables so here we are refering to 1st table tag
      name: `export.xlsx`, // fileName you could use any name
      sheet: {
        name: 'Sheet 1' // sheetName
      }
    });
  });
});

$(document).ready(function () {
  $("#loadBtn").click(function () {

   // ClearReport();
   
    LoadReport();
 
  });
});

$(document).ready(function () {
  $("#loadBtn1").click(function () {


    console.log("hellow")
    $("tbody").empty();
    //ClearReport();
   tableau.extensions.initializeAsync().then(() => { 
    console.log('I have been initialized!!') 
  }); 
  
  function refreshAllDataSources() {  
              const dashboard = tableau.extensions.dashboardContent.dashboard; 
              let dataSourceFetchPromises = []; 
              let dashboardDataSources = {};
              dashboard.worksheets.forEach(function (worksheet) { 
                  dataSourceFetchPromises.push(worksheet.getDataSourcesAsync()); 
              }); 
              Promise.all(dataSourceFetchPromises).then(function (fetchResults) { 
                  fetchResults.forEach(function (dataSourcesForWorksheet) { 
                      dataSourcesForWorksheet.forEach(function (dataSource) { 
                          if (!dashboardDataSources[dataSource.id]) { 
                              dashboardDataSources[dataSource.id] = dataSource; 
                              dataSource.refreshAsync(); 
                          } 
                      }); 
                  }); 
              }); 
  } 

 
  });



});



