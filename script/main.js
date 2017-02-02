let results = [];

function hideItems() {
    $('.translated').hide();
    //$('#progressbar').hide();
    // $('#loadbar').hide();
}

function showItems() {
    $('.translated').show();
    $('#progressbar').show();
    // $('#loadbar').show();
}

function endProcess() {
    $('.translated_words').show();
    //$('#progressbar').hide();
    // $('#loadbar').hide();
}

$(document).ready(() => {
    hideItems();
    $('#search_term').on('submit', (event) => {
        event.preventDefault();
        $('#output').empty();
        $('.translated_words').hide(); //<-- perfect 
        showItems();

        let searchTerm = $('#query').val();
        $("#query").val(null);
        const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
        let params = {
            text: searchTerm,
            key: "trnsl.1.1.20160730T155025Z.35486f1860c46aaf.6ede9117db5ccc99a30842a40367944bc49196bc"

        };
        $('#output').append("<span>&nbsp;" + searchTerm + " </span>"); //can't figure out how to create a space
        const languageArray = ["fr", "es", "it", "pt", "ca", "ro", "de", "nl", "en", "no", "sv", "da", "be", "ru", "uk", "bg", "sr", "pl"] //"is", "fi", "hu", "tr", "ga", "gd", "cy", "cs"
        for (var i = 0; i < languageArray.length; i++) {

            params.lang = "en-" + languageArray[i];

            $.getJSON(url, params, (data) => {
                // console.log(languageArray[i], 'lang', data);
                results.push({
                    lang: data.lang.replace("en-", ""),
                    text: data.text[0]
                });


            });
        }

        setTimeout(function() {
            // console.log(results);
           // if (results.length > 0) {

                results.forEach((res, index) => {
                   // console.log(res);
                     //setTimeout(function() {
                        //$('progress').attr('value', index + 1);
                        $('#' + res.lang).html(" " + res.text)
                        console.log(index);
                     //}, 3000);
                    // console.log('#' + res.lang);

                    

                });
                endProcess();
            //}

        }, 5000);
    });




    //testing
    function move() {
        var progress = document.getElementById("progressbar");
        var width = 1;
        var id = setInterval(frame, 10);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                progress.value = width
            }
        }
    }
    //end test

});