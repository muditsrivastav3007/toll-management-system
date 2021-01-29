function renderPassUsageDataTable() {
	
	var success = function (response) {
		var html = '<thead><tr><th>#</th><th>Vehicle Number</th><th>Entry Date</th><th>Cost</th><th>Action</th></tr></thead><tbody>';
		response.docs.forEach(function (obj, idx) {
			html += '<tr>';
			html += `<td data-id=${obj._id}>` + (idx+1) + '</td>';
			html += '<td>' + obj.vehicleNumber + '</td>';
			html += '<td>' + moment(obj.entryDate).format('MMMM Do YYYY HH:mm:ss') + '</td>';
			html += '<td>' + obj.cost + '</td>';
			html += `<td><button type="button" class="btn btn-primary validate" data-id="${obj._id}">Validate</button></td>`;
			html += '</tr>';
		});
		html += '</tbody>';
		$('.passUsageDataTable').html(html);
	};
	
	var error = function (msg) {
		showErrorToast(msg);
		return false;
	};
	
	return window.apiServices.receiptService.showReceipts({}, success, error);
}
  
$(document).on('click', '.validate', function (event) {
	var success = function (response) {
		if(response && response.isValid) {
			window.alert("Valid two way trip");
		} else {
			window.alert("Invalid");
		}
	};
	
	var error = function (msg) {
		showErrorToast(msg);
	};
	var id = $(this).attr('data-id');
	return window.apiServices.receiptService.validateReceipt(id, success, error);
});

$(document).ready(function () {
	renderPassUsageDataTable();
});

function showErrorToast(
	message = 'Oops! something went wrong. Please try again after some time', 
	time = 3000
) {
	if (message) {
		$('.snackbar.error').text(message)
		$('.snackbar.error').addClass('show').css('animation', 'fadein 0.5s, fadeout 0.5s '+ (time/1000)-1 +'s');
		sleep(time).then(function () {
			$('.snackbar.error').removeClass('show');
		});
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function showSuccessToast(message = "", time=3000) {
	if (message) {
		$('.snackbar.success').text(message)
		$('.snackbar.success').addClass('show').css('animation', 'fadein 0.5s, fadeout 0.5s '+ (time/1000)-1 +'s');
		sleep(time).then(function () {
			$('.snackbar.success').removeClass('show');
		});
	}
}
$(document).on('click', '.passUsage', function () {
	$('#showPassUsageModal').modal('show');
});