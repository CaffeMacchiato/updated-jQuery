$(document).ready(function() {
    $('#boundsForm').validate({
      rules: {
        clbound: {
          required: true,
          number: true,
          min: 1,
          max: 50
        },
        cubound: {
          required: true,
          number: true,
          min: 1,
          max: 50
        },
        rlbound: {
          required: true,
          number: true,
          min: 1,
          max: 50
        },
        rubound: {
          required: true,
          number: true,
          min: 1,
          max: 50
        }
      },
      messages: {
        clbound: {
          required: "Column Lower Bound is required.",
          number: "Column Lower Bound should be a number.",
          min: "Column Lower Bound should be at least 1.",
          max: "Column Lower Bound should be at most 50."
        },
        cubound: {
          required: "Column Upper Bound is required.",
          number: "Column Upper Bound should be a number.",
          min: "Column Upper Bound should be at least 1.",
          max: "Column Upper Bound should be at most 50."
        },
        rlbound: {
          required: "Row Lower Bound is required.",
          number: "Row Lower Bound should be a number.",
          min: "Row Lower Bound should be at least 1.",
          max: "Row Lower Bound should be at most 50."
        },
        rubound: {
          required: "Row Upper Bound is required.",
          number: "Row Upper Bound should be a number.",
          min: "Row Upper Bound should be at least 1.",
          max: "Row Upper Bound should be at most 50."
        }
      },

      errorClass: 'custom-error-message', // Add a custom CSS class for error messages

      submitHandler: function(form) {
        var clbound = parseInt($('#clbound').val());
        var cubound = parseInt($('#cubound').val());
        var rlbound = parseInt($('#rlbound').val());
        var rubound = parseInt($('#rubound').val());
  
        var rangeValidationResult = rangeValidation(clbound, cubound, rlbound, rubound);
        if (rangeValidationResult !== true) {
          $('#lowerBoundError').html('<p>Error: ' + rangeValidationResult + '</p>');
          $('#multiTable').empty(); // Remove the table
          return false;
        }
  
        var lowerBoundLargerResult = lowerBoundLarger(clbound, cubound, rlbound, rubound);
        if (lowerBoundLargerResult !== true) {
          $('#lowerBoundError').html('<p>Error: ' + lowerBoundLargerResult + '</p>');
          $('#multiTable').empty(); // Remove the table
          return false;
        }
  
        var numRows = rubound - rlbound + 2;
        var numCols = cubound - clbound + 2;
  
        multiplicationTable(clbound, rlbound, numRows, numCols);
        $('#lowerBoundError').empty(); // Remove the error message
  
        return false;
      }
    });
  });

  function multiplicationTable(clbound, rlbound, numRows, numCols) {
    var multiTable = document.getElementById("multiTable");
    multiTable.innerHTML = "";
  
    var table = document.createElement("table");
  
    var i, j, row, multiCell, currentRowVal, currentColVal;
  
    for (i = 0; i < numRows; i++) {
      row = document.createElement("tr");
  
      for (j = 0; j < numCols; j++) {
        multiCell = document.createElement("td");
  
        if (i === 0 && j === 0) {
          multiCell.innerHTML = "X";
        } else if (i === 0) {
          currentColVal = clbound + j - 1;
          multiCell.innerHTML = currentColVal;
        } else if (j === 0) {
          currentRowVal = rlbound + i - 1;
          multiCell.innerHTML = currentRowVal;
        } else {
          currentRowVal = rlbound + i - 1;
          currentColVal = clbound + j - 1;
          multiCell.innerHTML = currentRowVal * currentColVal;
        }
        row.appendChild(multiCell);
      }
      table.appendChild(row);
    }
    multiTable.appendChild(table);
  }
  
  function rangeValidation(clbound, cubound, rlbound, rubound) {
    if (clbound < 1 || clbound > 50) {
      return "Column Lower Bound should be between 1 and 50.";
    }
  
    if (cubound < 1 || cubound > 50) {
      return "Column Upper Bound should be between 1 and 50.";
    }
  
    if (rlbound < 1 || rlbound > 50) {
      return "Row Lower Bound should be between 1 and 50.";
    }
  
    if (rubound < 1 || rubound > 50) {
      return "Row Upper Bound should be between 1 and 50.";
    }
  
    return true; /* If the code reaches here, there are no invalid ranges */
  }
  
  function lowerBoundLarger(clbound, cubound, rlbound, rubound) {
    if (clbound > cubound) {
      return "Column Lower Bound is larger than the Column Upper Bound.";
    }
  
    if (rlbound > rubound) {
      return "Row Lower Bound is larger than the Row Upper Bound.";
    }
  
    return true; /* If my code reaches here, that means no, I don't have any larger lower bounds */
  }