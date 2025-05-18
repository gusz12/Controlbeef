function resultado() {
    var senha = ipt_senha.value;
    var senhaConfirm = ipt_senha_confirmation.value;

    if (senha == senhaConfirm && (senha != '' || senhaConfirm != '')) {
        div_resultado.innerHTML = 'Cadastro realizado com sucesso! Aguarde confirmação.'
    } else if (senha != senhaConfirm) {
        alert('Digite senhas iguais.')
        div_resultado.innerHTML = '';
    } else if (senha == '' || senhaConfirm == '') {
        alert('Campos obrigatórios nulos. Digite uma senha válida.')
    }
}