function redirectDash(){
    let email = ipt_email.value;
    let senha = ipt_senha.value;
    let pass;
    // email=="Controlbeef" && senha=="123" ? window.location.href = "index.html" : alert("ERRO: Email não cadastrado");

// --------------------------------------------------------------------------------------------------------
    // Validacao de cliente


    if(email=="Controlbeef" && senha=="123" ){
        window.location.href = "index.html";
        pass = true;
    }else{
        alert("ERRO: Email não cadastrado");
        pass = false;
    }

    // Após validacao, usuário tem a disponibilidade de ver dashboard
    if(pass == true){
        alert('Acesso a dashboard desbloqueado');
    }else{
        alert('Falha na execucão da Dashboard, tente novamente');
    }
}