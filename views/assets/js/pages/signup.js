var Signup = {
    data: {
        form: $(".js-validation-signup"),
    },
    handleFormSubmit: (form, e) => {
        e.preventDefault();
        let data = $(form).serialize();
        $.ajax(form.action, {
            data,
            method: "POST",
            dataType: "JSON"
        })
        .then(res => {
            if(res.status === "error") $("[data-alert]").html(res.reason).show();
            else{
                $("[data-alert]")
                .removeClass("alert-danger")
                .addClass("alert-success")
                .html("Login successful. Redirecting...").show();    
                if(res.status === "success") location = "/";
                if(res.status === "success-unapproved") location = "/admin/awaiting-approval?fs=1";
            }
        }).catch(e => {
            console.error(e)
            $("[data-alert]").html(e.message).show()
        })

    }
};