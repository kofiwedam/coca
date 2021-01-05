var Product = {
    handleFormSubmit: (form, e) => {
        e.preventDefault();
        let data = $(form).serialize();
        // console.log("form submitted", data)
        $.ajax(form.action, {
            data,
            method: "POST",
            dataType: "JSON"
        })
        .then(res => {
            if(res.status === "success") location = "/";
            if(res.status === "unverified") location = "/verify-email?fs=0"; // fs: from signup
        }).catch(e => {
            console.error(e)
        })
    },
    processSlug(){
        // let slugAppend = $("#product-id").data("id");
        $("#product-slug").slugify("#product-name", {
            // postSlug: slug => slug+'_'+slugAppend,
            truncate: 75,
            separator: '-' // If you want to change separator from hyphen (-) to underscore (_).
        });
    },
    init(){
        Dropzone.autoDiscover = false;
        const options = Dropzone.prototype.defaultOptions;
        var myDropzone = new Dropzone(".custom-dropzone", Object.assign(options, {

        }));
        myDropzone.on("success", (data, response) => {
            if(response.status == Dropzone.SUCCESS){
                $("#dropzone-images").append(`<input type='hidden' name='images[]' value='${response.tempFile}'>`)
            }            
        })
        // this.processSlug();
        Codebase.helpers(["select2", "simplemde"])
    }
};

Product.init();