const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("historyList");
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.innerText;

        if (value === "C") {
            display.value = "";
        }
        else if (value === "DEL") {
            display.value = display.value.slice(0, -1);
        }
        else if (value === "=") {
            try {
            const expression = display.value;
            const result = eval(expression);

            display.value = result;

            const item = document.createElement("li");
            item.textContent = `${expression} = ${result}`;

           historyList.prepend(item);
            } catch {
                display.value = "Error";
            }
        }
        else {
            display.value += value;
        }

    });

});
document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers and operators
    if ("0123456789+-*/.%".includes(key)) {
        display.value += key;
    }

    // Enter key (=)
    else if (key === "Enter") {
        event.preventDefault();

        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    }

    // Backspace (DEL)
    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    // Escape (C)
    else if (key === "Escape") {
        display.value = "";
    }

});
const themeBtn = document.getElementById("themeBtn");

// Load saved theme
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme","light");
    }else{
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme","dark");
    }

});