document.addEventListener("DOMContentLoaded", () => {
    const htmlElements = {
        password: document.getElementById("password_text"),
        copyIcon: document.getElementById("copy_icon"),
        rangeText: document.getElementById("range_text"),
        range: document.getElementById("character_length"),
        form: document.getElementById("settings"),
        passCopied: document.getElementById("copyText"),

        upperCheckbox: document.getElementById("uppercase_letters"),
        lowerCheckBox: document.getElementById("lowercase_letters"),
        numbersCheckBox: document.getElementById("numbers"),
        symbolsCheckBox: document.getElementById("symbols"),
        generateBtn: document.getElementById('generate'),
        checkBoxes: document.querySelectorAll(".checkboxx"),

        boxContainer: document.getElementById("strength_box"),
        strengthBox: document.querySelectorAll(".boxes"),
        strengthText: document.getElementById("strength_text"),
        errMsg: document.getElementById("error-message")
    };

    const chars = {
        upperLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowerLetters: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0987654321",
        symbols: "!@#$%^&*()_+-{}|[]<>?/",
    };

    const texts = {
        passCopied: "COPIED",
        errorToShort: "The password cannot be zero",
        errorNoCheckbox: "Please select one or more set of Characters"
    }


    htmlElements.range.addEventListener("input", () => {
        htmlElements.rangeText.innerHTML = htmlElements.range.value;
        let value= (htmlElements.range.value/htmlElements.range.max)*100;
        let color= "linear-gradient(to right, var(--neon) 0%, var(--neon) "+value+ "%, var(--background-gray) " +value+"%, var(--background-gray) 100%)";
        htmlElements.range.style.background = color;
    });

    let selectedCharSet = "";
    let password = "";

    function generatePassword(passLength) {
        selectedCharSet = "";

        selectedCharSet += htmlElements.upperCheckbox.checked ? chars.upperLetters : "";
        selectedCharSet += htmlElements.lowerCheckBox.checked ? chars.lowerLetters : "";
        selectedCharSet += htmlElements.numbersCheckBox.checked ? chars.numbers : "";
        selectedCharSet += htmlElements.symbolsCheckBox.checked ? chars.symbols : "";

        password = "";
        for (let i = 0; i < passLength; i++) {
            let index = Math.floor((Math.random() * selectedCharSet.length - 1));
            password += selectedCharSet.charAt(index);

        }
        htmlElements.password.value = password;
    }

    function validate(passLength, checkedBoxes) {
        htmlElements.errMsg.innerHTML = "";
        htmlElements.passCopied.innerHTML = "";

        if (checkedBoxes < 1) {
            htmlElements.errMsg.innerHTML = texts.errorNoCheckbox;
            return false;
        }
        else if (passLength < 1) {
            htmlElements.errMsg.innerHTML = texts.errorToShort;
            return false;
        }
        return true;

    };

    function weaknessCheck(passLength, checkedBoxes) {

        let score = 0;
        score += (Math.floor(checkedBoxes / 2));
        if(passLength <8){
            score =+ 1;
        }
        else if (passLength >= 8) {
            score += 2;
        }
        let scoreName = "";
        let scoreClass="";
        
        switch (score) {
            case 1:
                scoreName = "Too weak!";
                scoreClass="tooweak"
                break;
            case 2:
                scoreName = "Weak";
                scoreClass="weak";
                break;
            case 3:
                scoreName = "Medium";
                scoreClass="medium"
                break;
            case 4:
                scoreName = "Strong";
                scoreClass="strong";
                break;

        }
        
        htmlElements.strengthText.innerHTML = scoreName;
        htmlElements.boxContainer.className = scoreClass;

        htmlElements.strengthBox.forEach((bar) => {
            if(bar.classList.contains('full')){
                bar.classList.remove('full')
            }
        })

        for(let i=0; i<score; i++){
            htmlElements.strengthBox[i].classList.add('full');
        }
    };

    htmlElements.form.addEventListener("input", (e) => {
        htmlElements.password.value = "";
        let passlength = htmlElements.range.value;
        let checkedBoxes = (document.querySelectorAll(`input[type="checkbox"]:checked`)).length;

        validate(passlength, checkedBoxes);
        weaknessCheck(passlength, checkedBoxes);
    });

    htmlElements.form.addEventListener("submit", (e) => {
        e.preventDefault();
        let passlength = htmlElements.range.value;
        let checkedBoxes = (document.querySelectorAll(`input[type="checkbox"]:checked`)).length;
        if (validate(passlength, checkedBoxes)) {
            generatePassword(passlength);
        }

    });

    htmlElements.copyIcon.addEventListener("click",()=>{
        let pass=htmlElements.password.innerHTML;
        navigator.clipboard.writeText(pass);
        htmlElements.passCopied.innerHTML= texts.passCopied;
    })



});