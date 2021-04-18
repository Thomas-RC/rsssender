$(document).ready(function(){
    /**
     * Add Email Address
     */
    $("form#getEmail").on('submit', function(e){
        e.preventDefault();
        const data = $('input[name="name_email"]').val();
        $.ajax({
            type: 'post',
            url: '/ajax_email',
            data: {
                email: data
            },
            dataType: 'text'
        })
        .done(function(data){
            let date = JSON.parse(data);
            $('#email').removeClass('border-dark').addClass('is-valid');
            $("#email").attr("disabled", true);
            $('.toast-body').html('Your email '+ date.name_email +' has been added');
            $('.toast').toast('show')
        })
        .fail(function (){
            console.log('Error email');
        })
    });

    /**
     * Add RSS Feed
     */
    $("form#getFeed").on('submit', function(e){
        e.preventDefault();
        const data = $('input[name="url_rss"]').val();
        $.ajax({
            type: 'post',
            url: '/ajax_feed',
            data: {
                feed: data
            },
            dataType: 'text'
        })
        .done(function(){
            $('#feed').removeClass('border-dark').addClass('is-valid');
            $("#feed").attr("disabled", true);
            $('.toast-body').html('Your RSS feed has been added');
            $('.toast').toast('show')
        })
        .fail(function (){
            console.log('Error email');
        })
    });
    /**
     * Preview Feed
     */
    $("button#preview_rss").on('click', function(e){
        e.preventDefault();

        const urlFeed =  $('input[name="url_rss"]').val();

        $.ajax({
            type: 'post',
            url: '/ajax_preview_feed',
            data: {
                feed: urlFeed
            },
            dataType: 'text'
        })
        .done(function(data){
            const xml = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            $('#rss_preview_feed').html(xml);

        })
        .fail(function (){
            console.log('Error preview feed');
        })
    });
    /**
     * Parse Feed
     */
    $("button#create_msg").on('click', function(e){
        e.preventDefault();

        const urlFeed =  $('input[name="url_rss"]').val();

        $.ajax({
            type: 'post',
            url: '/ajax_parse_feed',
            data: {
                feed: urlFeed
            },
            dataType: 'text'
        })
        .done(function(data){
            $('#msg_create_add').html(data);
        })
        .fail(function (){
            console.log('Error preview feed');
        })
    });

    /**
     * Save to DB
     */
    $("button#save_msg").on('click', function(e){
        e.preventDefault();
        const ch = {};
        ch.checkId=[];

        $("input:checkbox").each(function(){
            const id = $(this);
            if(id.is(":checked"))
            {
                ch.checkId.push(id.closest('tr').children('td').eq(1).html());
            }
        });

        $.ajax({
            type: 'post',
            url: '/ajax_save_msg',
            data: {
                ids: ch.checkId
            },
            dataType: 'text'
        })
        .done(function(data){
            let msg = 'Your RSS feed has been saved to DB';
            $('#feed').removeClass('border-dark').addClass('is-valid');
            $("#feed").attr("disabled", true);
            $('.toast-body').html(msg);
            $('.toast').toast('show');
            $('#exampleModalMsgCreate').modal('hide');
            $('#id_to_get').html(data);
        })
        .fail(function (){
            console.log('Error saved message');
        })

    });

    /**
     * Show message To Send
     */
    $("button#preview_msg").on('click', function(e){
        e.preventDefault();

        const id = $('#id_to_get').text();

        $.ajax({
            type: 'post',
            url: '/ajax_get_message',
            data: {
                id: id
            },
            dataType: 'text'
        })
            .done(function(data){
                $('#msg_to_send').html(data);
            })
            .fail(function (){
                console.log('Error preview feed');
            })
    });
    /**
     * Send
     */
    $("button#send").on('click', function(e){
        e.preventDefault();

        const email = $('input#email').val();
        const msg = $('#msg_to_send').html();

        $.ajax({
            type: 'post',
            url: '/ajax_send_message',
            data: {
                email: email,
                message: msg
            },
            dataType: 'text'
        })
        .done(function(data){
            console.log(data)
            let msg = 'Your message has ben send';
            $('#feed').removeClass('border-dark').addClass('is-valid');
            $("#feed").attr("disabled", true);
            $('.toast-body').html(msg);
            $('.toast').toast('show');
        })
        .fail(function (){
            console.log('Error send msg');
        })
    });
});