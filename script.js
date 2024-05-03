$(document).ready(function(){
    // Função para carregar o arquivo JSON de uma URL
    function loadConversionTableFromURL(url, callback) {
        $.getJSON(url, function(data) {
            callback(data);
        }).fail(function() {
            $("#error-message").text("Erro ao carregar o arquivo JSON.");
        });
    }

    $("#login-form").submit(function(event){
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        // Aqui você pode adicionar a lógica de validação do usuário e senha
        if (username === "osterne" && password === "osterne123") {
            $("#login-container").hide();
            $("#conversion-form-container").show();
        } else {
            $("#error-message").text("Usuário ou senha incorretos.");
        }
    });

    $("#conversion-form").submit(function(event){
        event.preventDefault();
        var value1 = parseFloat($("#value1").val());
        var value2 = parseFloat($("#value2").val());

        // URL do seu arquivo JSON
        var jsonURL = "URL_DO_SEU_ARQUIVO_JSON";

        // Carregar a tabela de conversão a partir da URL
        loadConversionTableFromURL(jsonURL, function(tabela_conversao) {
            var key = value1 + "-" + value2;
            if (key in tabela_conversao) {
                var convertedValue = tabela_conversao[key];
                $("#converted-value").text("Resultado da conversão: " + convertedValue.toFixed(2) + " litros");
                $("#conversion-form-container").hide();
                $("#result").show();
                $("#back-button").show();
            } else {
                $("#error-message").text("Valores de conversão não encontrados na tabela.");
            }
        });
    });

    $("#back-button").click(function(){
        $("#conversion-form-container").show();
        $("#result").hide();
        $("#back-button").hide();
    });
});
