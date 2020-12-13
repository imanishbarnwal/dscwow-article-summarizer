$('#sum').submit(function(event){
    event.preventDefault();
    console.log('submit clicked12');
    let inputText = $('#sum').serialize();
    // let f = 'Text area:-' + $('#inputText').val();
    // console.log($('#sum').serialize());
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/summarize-text', // the url where we want to POST
        data: inputText, // our data object
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        async: true,
        success: function(data) {
               if(data.status == "success") {
                   $('#outputText').val(data.result);

               } else {
                   alert("Error");
               }
        },
        error: function(data) {
            alert("Error in parsing JSON.");
        }
    });
});


$('#play-audio').on('click',function(event){
    event.preventDefault();
    // let outputText = JSON.stringify($('#outputText').val())
    let audioHtml = document.getElementById('audio1');
    if(audioHtml==null)
    {
        let outputText = $('#outputText').val();
    $.ajax({
        type:'POST',
        url:'/text-to-speech',
        data: JSON.stringify({text:outputText}), // our data object
        dataType: 'json', // what type of data do we expect back from the server
        contentType:'application/json',
        encode: true,
        async: true,
        success: function(data) {
               if(data.status == "success") {
                   console.log('File path:- '+data.path);
                   let audio = document.createElement('audio')
                   audio.src = data.path;
                   audio.id = 'audio1'
                   $('#audioContainer').append(audio);
                   audio.play();

               } else {
                   alert("Error");
               }
        },
        error: function(data) {
            alert("Error in parsing JSON.");
        }
    })
    }else{
        audioHtml.play();
    }
});