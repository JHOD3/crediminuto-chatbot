$(document).ready(function() {
    $('#btn-send').on('click',function (e) {
        e.preventDefault();
        send();
    });
    $('#input-send').on('keyup',function (e) {
        if(e.which == 13) {
            send();
        }
    });
    hiddenAvatar();
    /*##########################################################################################################################*/
    //   A partir de aqui estas funciones NOO son esenciales y puede borrarlas se relaizaron para demostrar el funcionamiento   //
    /*#########################################################################################################################*/
    function send() {
        let d = new Date();
        let texto = $('#input-send').val();
        if(texto != '') {
            let html = "<div class=\"d-flex justify-content-end chatbot-item\" data-id='p'>" +
                "<div class=\"card bg-white rounded w-75 z-depth-0 mb-2 border-0\">" +
                "<div class=\"card-body px-2 pt-2 pb-4\">" +
                "<p class=\"card-text black-text font11-px chatbot-color-text mb-0\">" + texto + "</p>" +
                "<div class=\"text-right chatbot-hora\">" +
                "<small class=\"font8-px\">" + d.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }) + "</small>" +
                "<small class=\"ml-2\"><i class=\"fas fa-check font8-px text-success\"></i></small>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class=\"profile-photo message-photo\">" +
                "<img class=\"avatar rounded-circle mr-0 ml-2\" src=\"https://ui-avatars.com/api/?name=C&amp;rounded=true&amp;background=FFB200&amp;color=ffffff\" alt=\"avatar\">" +
                "</div>" +
                "</div>";
            $('.chat-message').append(html);
            scroll_to();
            $('#input-send').val('');
            setTimeout(function () {
                respuesta()
            }, 3000);
        }
    }
    function respuesta() {
        let d = new Date();
        let html =  '<div class="d-flex justify-content-start chatbot-item" data-id="r">' +
            '<div class="profile-photo message-photo"><img class="avatar rounded-circle mr-2 ml-0" src="https://ui-avatars.com/api/?name=M&amp;rounded=true&amp;background=ff0000&amp;color=ffffff" alt="avatar"></div>' +
            '<div class="card bg-white rounded w-75 z-depth-0 mb-2 border-0">' +
            '<div class="card-body px-2 pt-2 pb-4">' +
            '<p class="card-text black-text font11-px chatbot-color-text mb-0">Aun no tengo respuestas programadas para darte. Vuelve pronto y comunicate con nosotros. Gracias!</p>' +
            '<div class="text-right chatbot-hora"><small class="font8-px">'+ d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })+'</small><small class="ml-2"><i class="fas fa-check font8-px text-success"></i></small></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('.chat-message').append(html);
        scroll_to();
    }




    /*#################################################################################################################*/
    //   A partir de aqui estas funciones son esenciales para el funcionamiento debe estar a la hora de implementar    //
    /*#################################################################################################################*/
    $('#btn-upload-file').on('click',function (e) {
        e.preventDefault();
        $("#message").find('#upload-iconos').remove();
        let html_input =    '<div class="text-center bg-white py-3 mb-3 d-flex justify-content-center" id="upload-iconos">'+
        '<label for="input-imagen"><img class="iconos-upload-chatbot" src="img/foto.svg"></label>'+
        '<input class="d-none" id="input-imagen" type="file" accept="image/*">'+
        '<label for="input-documento"><img class="iconos-upload-chatbot mx-3" src="img/documento.svg"></label>'+
        '<input class="d-none" id="input-documento" type="file">'+
        '<label for="input-camara"><img class="iconos-upload-chatbot" src="img/camara.svg"></label>'+
        '<input class="d-none" id="input-camara" type="file" accept="image/*" capture="">'+
        '</div>';
        $('.chat-message').append(html_input);
        scroll_to();
    });

    function scroll_to(){
        $("#message").animate({ scrollTop: $('#message').prop("scrollHeight")}, 1000);
        hiddenAvatar();
    }
    function hiddenAvatar() {
        let id = '';
        $('.chatbot-item').each(function( index, element ) {

            if($(element).data('id') == id){
                $(element).find('.avatar').addClass('d-none');
            }
            id =  $(element).data('id');
        });
    }
    $("#closed , .deploy-chatbot").on('click', function (e) {
        e.preventDefault();
        $('#chatbot-card').toggle();
        $('#chatbot-card').toggleClass("conditionalOpen conditionalClose");
        let width = $(window).width();
        if (width < 768){
            $('.globo-flotante').toggleClass("d-none d-block");;
        }
    });

})

$(document).on("click",function(e) {
    let width = $(window).width();
    let container = $(".chatbot");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('#chatbot-card').css('display','none');
        if (width < 768 && $('#chatbot-card').hasClass("conditionalOpen") == true){
            $('.globo-flotante').toggleClass("d-none d-block");
            $('#chatbot-card').toggleClass("conditionalOpen conditionalClose");
        }
    }
});

$('#input-send').on("click",function(e) {
    let container = $("#message");
    container.find('#upload-iconos').remove();
});
$(document).on('change', 'input[type="file"]',function () {
    filePreview(this);
});
function filePreview(input) {
    let d = new Date();
    if (input.files && input.files[0]) {
        let image='';
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(input.files[0]);
            if(input.files[0].type == 'image/jpeg' || input.files[0].type == 'image/png'){
                image = e.target.result;
            }else{
                image = 'image';
            }
            let html =  '<div class="d-flex justify-content-end chatbot-item" data-id="r">' +
                            '<div class="card bg-white rounded w-75 z-depth-0 mb-2">' +
                                '<div class="card-body px-2 pt-2 pb-4">' +
                                    '<p class="card-text black-text font11-px chatbot-color-text mb-0"><img src="'+image+'" class="rounded" style="width: 100%;" width="150" height="150"/></p>' +
                                    '<div class="text-right chatbot-hora">' +
                                        '<small class="font8-px">'+ d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })+
                                        '</small>' +
                                        '<small class="ml-2">' +
                                            '<i class="fas fa-check font8-px text-success"></i>' +
                                        '</small>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="profile-photo message-photo">' +
                                '<img class="avatar rounded-circle mr-0 ml-2" src="https://ui-avatars.com/api/?name=C&amp;rounded=true&amp;background=FFB200&amp;color=ffffff" alt="avatar">' +
                            '</div>' +
                        '</div>';
            $('.chat-message').append(html);
            $("#message").find('#upload-iconos').remove();
        }
        reader.readAsDataURL(input.files[0]);
    }
}