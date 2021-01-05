$(function(){

	const temploader = `<div class="temp-modal-loader" style="background:rgba(255,255,255,0.76);width:100%;height:100%;position:absolute;z-index:2;"></div>`;


	$("[data-slug-target]").each(function(){
		let {slugTarget} = $(this).data();
		$(`[data-slug='${slugTarget}']`).slugify($(this))
	})

	$(document).on("click", "[data-toggle=modal]", function(){
		let target = $(this).data("target");
		if(!$(target).length) alert("Error connecting to firebase servers");
	})
	
	$(document).on("click", "[data-action=trash], [data-action=restore], [data-action=delete]", function(){
		let {actionTitle, actionMessage, actionId, actionProcess} = $(this).data();
		if(confirm(actionTitle)){
			$.post(`/admin/process/${actionProcess}`, {id: actionId})
			.then(response => {
				if(response.status == "success") location.reload()
			})
			.catch(error => {
				console.error(error)
			})
		}
	})

	$(document).on("click", "[data-action=reset-password]", function(){
		let {actionTitle, actionMessage, actionEmail, actionProcess} = $(this).data();
		if(confirm(actionTitle)){
			$.post(`/admin/process/${actionProcess}`, {email: actionEmail})
			.then(response => {
				if(response.status == "success") location.reload()
			})
			.catch(error => {
				console.error(error)
			})
		}
	})

	$(document).on("click", "[data-action=edit], [data-action=modal]", function(e){
		e.preventDefault();
		let {actionModal, actionId, actionGetter} = $(this).data();
		$(actionModal).modal("show");
		$(".modal-content", $(actionModal)).append(temploader);
		$.post(`/admin/process/${actionGetter}`, {id: actionId})
		.then(response => {
			$("[data-bind]", $(actionModal)).each(function(index, el) {
				let bind = $(this).data("bind");
				let value = response[bind];
				if($(this).data("bind-type")){
					switch($(this).data("bind-type")){
						case "date":
							value = moment(value).format("Do MMMM, YYYY");
						break;
						case "boolean":
							let booleanValue = Boolean(value);
							if(booleanValue) value = $(this).data("bind-true");
							else value = $(this).data("bind-false");
						break;
					}
				}
				if($(this).is("select, input")) $(this).val(value);
				else $(this).html(value);
			})

			$("[data-bind-select]", $(actionModal)).each(function(index, el) {
				let {bindSelect} = $(this).data();
				$(`option[data-bind-value="${response[bindSelect]}"]`, $(this)).prop({selected: true})
			})

			$("[data-bind-joint]", $(actionModal)).each(function(index, el) {
				let {bindJoint} = $(this).data();
				let splitter = "_==_";
				let bindJointSplit = bindJoint.split(splitter);
				
				let newObj = {};
				for (let bind of bindJointSplit){
					newObj[bind] = response[bind]
				}
				let valueString = Object.values(newObj).join(splitter);
				$(this).val(valueString)
			})
			$(".temp-modal-loader", $(actionModal)).remove();
		})
		.catch(error => {
			// console.error(error)
		})
	})

	$("[data-action=modal-form]").on("submit", function(e){
		e.preventDefault();
		let modal = $(this).parents(".modal:first");
		let actionProcess = $(this).attr("action");
		let data = $(this).serialize();

		$(".modal-content", modal).append(temploader);
		$.post(actionProcess, data)
		.then(response => {
			if(response.status == "success") location.reload();
			else {
				alert(response.message)
				$(".temp-modal-loader", modal).remove();
			}
		})
		.catch(error => {
			console.error(error)
			$(".temp-modal-loader", modal).remove();
		})
	})
})