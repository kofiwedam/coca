var Login = {
    data: {
        form: $(".js-validation-signin"),
    },
    handleFormSubmit: (form, e) => {
        e.preventDefault();
        let data = $(form).serialize();
        $("[data-alert]").html("").hide();
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
                else if(res.status === "success-unapproved") location = "/admin/awaiting-approval?fs=0"; // fs: from signup            
            }
        }).catch(e => {
            console.error(e)
            $("[data-alert]").html(e.message).show()
        })
    }
};