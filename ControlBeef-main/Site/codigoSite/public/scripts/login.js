function redirectDash() {
    let email = ipt_email.value;
    let senha = ipt_senha.value;
    let pass;
    if ((email == "lucas.previtero@controlbeef.com" || email == "vitorio.bearari@controlbeef.com" || email == "gustavo.menezes@controlbeef.com" || email == "gabriel.torres@controlbeef.com" || email == "arthur.ferreira@controlbeef.com" || email == "celina.benedito@controlbeef.com") && senha == "123") {

        alert("Login efetuado com sucesso✔")
        div_buttonDash.innerHTML = `
     <a href='dashboard.html'>Acessar dashboard</a> `
    } else {
        alert("ERRO: Email ou senha incorreta.")
    }
}


