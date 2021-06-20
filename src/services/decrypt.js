const decrypt = async (value) => {
    const  ENCRYPT_KEY  = "P@ssW0rd";
    const rotateHere = (temp, rotTimes) => {
        const len = temp.length;
        let rT = (len-rotTimes) % len;
        let resultL = temp.slice(0, rT);
        resultL = resultL.split('').reverse().join('');
        let resultR = temp.slice(rT, len);
        resultR = resultR.split('').reverse().join('');
        let result = resultL + resultR;
        result = result.split('').reverse().join('');
        return result;

    }

    let rT = 0;
    let idx = 1;
    for(let i=0; i<ENCRYPT_KEY.length; i=i+1){
        rT = rT + (ENCRYPT_KEY.charCodeAt(i)*idx);
        idx = idx + 1;
    }

    let temp = 'abcdefghi0123456789jklmnopqrstuvwxyzABCDEFGHIJKL@#$%^&*()MNOPQRSTUVWXYZ!-_=+[]';
    temp = temp + "{";;
    temp = temp + '}/|:,.<>?~ ';

    let rotated = rotateHere(temp, rT);
    let tempArr = temp.split("");

    let rotified = "";
    let msg = value.split('').reverse().join('');
    for(let i = 0; i<msg.length; i=i+1){
        if(temp.includes(msg[i])){
            rotified = rotified + rotated[tempArr.indexOf(msg[i])];
        }else if(msg[i]==='`'){
            rotified = rotified + "\n";
        }else{
            rotified = rotified + msg[i];
        }
    }

    return await rotified;
}

module.exports = {
    decrypt
}