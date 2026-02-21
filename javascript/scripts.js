let screen = document.getElementById("screen");
let keys = document.querySelectorAll(".key")

let caps = false;
let shift = false;

keys.forEach(key=> {
    key.addEventListener("click" , function() {

        let value = this.innerText;

        //Backsapce
        if(this.dataset.key === "backspace") {
            screen.innerText = screen.innerText.slice(0,-1);
            return;
        }

        //Space
        if(this.dataset.key === "space"){
            screen.innerText += " ";
            return;
        }

        //Enter
        if(this.dataset.key === "enter"){
            screen.innerText += "<br>";
            return;
        }

        //Caps
        if(this.dataset.key === "caps"){
            caps = !caps;
            this.classList.toggle("active");
            return;
        }

        //Shift
        if(this.dataset.key === "shift") {
            shift = !shift;
            this.classList.toggle("active");
            return;
        }

        // Ignore special keys
        if(["Ctrl" , "Fn" , "Win" , "Alt" , "Tab" , "Esc" , "F1" , "F2" , "F3" , "F4" , "F5" , "F6" , "F7" , "F8" , "F9" , "F10" , "F11" , "F12" , "Delete" , "<=" , "^" , "!" , "=>"].includes(value)){
            return;
        }

        // Normal Keys
        if(value.length === 1){

            if(!caps && !shift){
                screen.innerText += value.toLowerCase();
            } else{
                screen.innerText += value.toUpperCase();
            }
        }
    });
});