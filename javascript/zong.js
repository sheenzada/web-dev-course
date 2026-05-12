function zongBalanceShare(number , amount){
    if (!number || !amount) {
        return "Error: Number of aur amount dono do";
    }

    let usedCode = '*869*${number}*${amount}#';
    return usedCode
}

let code = zongBalanceShare("0300123456", 50);
console.log(code);
