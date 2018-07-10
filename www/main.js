let results = [];

function hideItems() {
    $('.translated').hide();
}

function showItems() {
    $('.translated').show();
    $('#progressbar').show();
}

function endProcess() {
    $('.translated_words').show();
}

$(document).ready(() => {
    hideItems();
    $('#search_term').on('submit', (event) => {
        event.preventDefault();
        $('#output').empty();
        $('.translated_words').hide(); 
        showItems();

        let searchTerm = $('#query').val();
        $("#query").val(null);
        const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
        let params = {
            text: searchTerm,
            key: "trnsl.1.1.20160730T155025Z.35486f1860c46aaf.6ede9117db5ccc99a30842a40367944bc49196bc"

        };
        $('#output').append("<span>&nbsp;" + searchTerm + " </span>");
        const languageArray = ["fr", "es", "it", "pt", "ca", "ro", "de", "nl", "en", "no", "sv", "da", "be", "ru", "uk", "bg", "sr", "pl"]
        for (var i = 0; i < languageArray.length; i++) {

            params.lang = "en-" + languageArray[i];

            $.getJSON(url, params, (data) => {
                results.push({
                    lang: data.lang.replace("en-", ""),
                    text: data.text[0]
                });


            });
        }

        setTimeout(function() {
                results.forEach((res, index) => {
                        $('#' + res.lang).html(" " + res.text)
                        console.log(index);
                });
                endProcess();
        }, 5000);
    });
   
});
