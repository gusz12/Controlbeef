function redirectDash(){
    let email = ipt_email.value
    let senha = ipt_senha.value

    email=="Controlbeef" && senha=="123" ? window.location.href = "dashboard.html" : alert("ERRO: Email não cadastrado")
}