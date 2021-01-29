var reg_number = document.getElementById('reg_number');
var issue_date = document.getElementById('issue_date');
var cost = document.getElementById('applicant_cost');

var submitPass = document.getElementById('submitPass');

submitPass.addEventListener("click", function() {

	if(reg_number.value == '' || issue_date.value == ''|| cost.value == '')
	{
		$.confirm({
	      title: 'Fields ?',
	      content: "Field is Empty !! ",
	      draggable: true,
	      buttons: {
	        OK: {
	            btnClass: 'btn-success any-other-class',
	             action: function () {      
	          }
	          },
	          }
	    });
	 	return;
	}

	var obj = new Object();
	obj.vehicleNumber = reg_number.value;
	obj.entryDate = issue_date.value;
	obj.cost = cost.value;
	var success = function (response) {
		showSuccessToast('New pass is created');
		$('#showPassUsageModal').modal('hide');
		renderPassUsageDataTable();
    };

    var error = function (msg) {
		showErrorToast('Ooops');
		$('#showPassUsageModal').modal('hide');
    };

    return window.apiServices.receiptService.addNewPass(JSON.stringify(obj), success, error);
})
