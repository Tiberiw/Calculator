function Operand() {
    this.value = null;
    this.state = "mod";
    this.setValue = function(newValue) {
        
        if(this.state === "mod") {
            this.value = newValue;
            this.state = "add";
        } else {
            this.value = 10*this.value + newValue;
        }
            
    };
    this.getValue = function() {
        return this.value;
    };
    this.setState = function(newState) {
        this.state = newState;
    };
    this.getState = function(newState) {
        return this.state;
    }
}

function Calculator() {

    this.first = new Operand();
    this.second = new Operand();

    this.operator = {
        value: null,
        set: function(newOperator) {
            this.value = newOperator;
        },
        get: function() {
            return this.value;
        }
    }

    this.operations = {
        "+": () => {
            return this.first.getValue() + this.second.getValue();
        },

        "-": () => {
            return this.first.getValue() - this.second.getValue();
        },

        "*": () => {
            return this.first.getValue() * this.second.getValue();
        },

        "/": () => {
            return +((this.first.getValue() / this.second.getValue()).toFixed(10));
        },

        "sqrt": () => {
            /* MAY MODIFY THIS */
            return +(Math.sqrt(this.first.getValue()).toFixed(10));
        },

        "**": () => {
            return Math.pow(this.first.getValue(), this.second.getValue());
        },
    };

    this.reset = function() {
        this.first.value = null;
        this.second.value = null;
        this.first.setState("mod");
        this.second.setState("mod");
        this.operator.set(null);
        console.log("CACAT");
    }

  

    this.validate = function() {
        let error = "ok";

        switch(this.operator.get()) {

            case "+": 
            case "-":
            case "*":
            case "**":
                if(this.first.getValue() === null || this.second.getValue() === null)
                    error = "Malformed expression";
    
                break;

            case "/":
                if(this.first.getValue() === null || this.second.getValue() === null)
                    error = "Malformed expression";
                
                if(this.second.getValue() === 0)
                    error = "Division by 0 is undefined";
                
                break;

            case "sqrt":
                if(this.first.getValue() === null)
                    error = "Malformed expression";
                
                break;

            case "%":
                /* UPDATE */

                break;
            default:
                error = "Malformed expression";

        }


        return error;
    }

    
}


function UI(service) {

    this.service = service;
    this.buttonAC = document.querySelector('button.clear');
    this.buttonRemove = document.querySelector('button.remove');
    this.buttonSqrt = document.querySelector('button.sqrt');
    this.buttonPow = document.querySelector('button.pow');
    this.buttonProcent = document.querySelector('button.procent');
    this.buttonDivision = document.querySelector('button.division');
    this.buttonSeven = document.querySelector('button.seven');
    this.buttonEight = document.querySelector('button.eight');
    this.buttonNine = document.querySelector('button.nine');
    this.buttonMultiply = document.querySelector('button.multiply');
    this.buttonFour = document.querySelector('button.four');
    this.buttonFive = document.querySelector('button.five');
    this.buttonSix = document.querySelector('button.six');
    this.buttonSubtract = document.querySelector('button.subtract');
    this.buttonOne = document.querySelector('button.one');
    this.buttonTwo = document.querySelector('button.two');
    this.buttonThree = document.querySelector('button.three');
    this.buttonAdd = document.querySelector('button.add');
    this.buttonSign = document.querySelector('button.sign');
    this.buttonZero = document.querySelector('button.zero');
    this.buttonFloat = document.querySelector('button.float');
    this.buttonEqual = document.querySelector('button.equal');

    this.showIntermediate = document.querySelector('div.intermediate');
    this.showResult = document.querySelector('div.result');

    this.currentResult = "0";
    this.currentIntermediate = "0";

    this.pointer = "first";

    this.pointerToggle = function() {
        if(this.pointer === "first") {
            this.service[this.pointer].setState("mod");
            this.pointer = "second";
            this.service[this.pointer].setState("mod");
        }
        else {
            this.service[this.pointer].setState("mod");
            this.pointer = "first";
            this.service[this.pointer].setState("mod");
        }
    }

    this.setUp = function() {

        /* A C */
        this.buttonAC.addEventListener('click', () => {
            console.log('AC');

            this.pointer = "first";
            this.service.reset();
            this.showScreen("");
            this.showScreenSecond("");
            console.clear();
        });

        /* REMOVE */
        this.buttonRemove.addEventListener('click', () => {
            console.log('Remove');
        });

        /* SQRT */
        this.buttonSqrt.addEventListener('click', () => {
            console.log('Sqrt');
            

            /* IF ANOTHER CALCULATION IS DONE */
            /* THEN CALCULATE */
        });

        /* POW */
        this.buttonPow.addEventListener('click', () => {
            console.log('Pow');
            
            let error = "ok";

            if(this.pointer === "second" && this.service[this.pointer].getState() === "add") {
                error = this.operate();
            }

                if(error !== "ok") {
                    this.service.reset();
                    this.pointer = "first";
                } else {
                    this.service.operator.set('**');

                    if(this.service.first.getValue() !== null) {
                        this.pointer = "second";
                        this.service[this.pointer].setState("mod"); 

                        let first = this.service.first.getValue().toString();
                        let operator = this.service.operator.get();
                        this.showScreenSecond(first+operator); 
                    }
                    
                }

            
        });

        /* Procent */
        this.buttonProcent.addEventListener('click', () => {
            console.log('Procent');
        });

        /* Division */
        this.buttonDivision.addEventListener('click', () => {
            console.log('/');

            let error = "ok";
            if(this.pointer === "second" && this.service[this.pointer].getState() === "add") {
                error = this.operate();
            }

            if(error !== "ok") {
                this.service.reset();
                this.pointer = "first";

            } else {
                this.service.operator.set('/');
                
                if(this.service.first.getValue() !== null) {
                    this.pointer = "second";
                    this.service[this.pointer].setState("mod"); 

                    let first = this.service.first.getValue().toString();
                    let operator = this.service.operator.get();
                    this.showScreenSecond(first+operator); 
                }
            }

            
        });

        /* Seven */
        this.buttonSeven.addEventListener('click', () => {
            console.log('7');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");
            
            this.service[this.pointer].setValue(7);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* Eight */
        this.buttonEight.addEventListener('click', () => {
            console.log('8');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(8);
            this.showScreen(this.service[this.pointer].getValue().toString());

        });

        /* Nine */
        this.buttonNine.addEventListener('click', () => {
            console.log('9');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(9);
            this.showScreen(this.service[this.pointer].getValue().toString());
        })

        /* Multiply */
        this.buttonMultiply.addEventListener('click', () => {
            console.log('*');

            let error = "ok";
            if(this.pointer === "second" && this.service[this.pointer].getState() === "add") {
                error = this.operate();
            }

            if(error !== "ok") {
                this.service.reset();
                this.pointer = "first";

            } else {
                this.service.operator.set('*');

                if(this.service.first.getValue() !== null) {
                    this.pointer = "second";
                    this.service[this.pointer].setState("mod");
                    
                    let first = this.service.first.getValue().toString();
                    let operator = this.service.operator.get();
                    this.showScreenSecond(first+operator); 
                }
                
            }
        });

        /* Four */
        this.buttonFour.addEventListener('click', () => {
            console.log('4');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(4);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* Five */
        this.buttonFive.addEventListener('click', () => {
            console.log('5');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(5);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* Six */
        this.buttonSix.addEventListener('click', () => {
            console.log('6');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(6);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* SUBTRACTION */
        this.buttonSubtract.addEventListener('click', () => {
            console.log('-');

            let error = "ok";
            if(this.pointer === "second" && this.service[this.pointer].getState() === "add") {
                error = this.operate();
            }

            if(error !== "ok") {
                this.service.reset();
                this.pointer = "first";
            } else {
                this.service.operator.set('-');

                //problem
                if(this.service.first.getValue() !== null) {
                    this.pointer = "second";
                    this.service[this.pointer].setState("mod");
                    
                    let first = this.service.first.getValue().toString();
                    let operator = this.service.operator.get();
                    this.showScreenSecond(first+operator); 
                }

            }
            
        });

        /* One */
        this.buttonOne.addEventListener('click', () => {
            console.log('1');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(1);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* Two */
        this.buttonTwo.addEventListener('click', () => {
            console.log('2');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(2);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* Three */
        this.buttonThree.addEventListener('click', () => {
            console.log('3');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(3);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* ADD */
        this.buttonAdd.addEventListener('click', () => {
            console.log('+');

            let error = "ok";
            if(this.pointer === "second" && this.service[this.pointer].getState() === "add") {
                error = this.operate();
            }

            if(error !== "ok") {
                this.service.reset();
                this.pointer = "first";

            } else {
                this.service.operator.set('+');
                if(this.service.first.getValue() !== null) {
                    this.pointer = "second";
                    this.service[this.pointer].setState("mod");

                    let first = this.service.first.getValue().toString();
                    let operator = this.service.operator.get();
                    this.showScreenSecond(first+operator); 
                }
            }
        });

        /* SIGN +/- */
        this.buttonSign.addEventListener('click', () => {
            console.log('+/-');
        });

        /* Zero */
        this.buttonZero.addEventListener('click', () => {
            console.log('0');

            if(this.pointer === "first" && this.service[this.pointer].getState() === "mod")
                this.showScreenSecond("");

            this.service[this.pointer].setValue(0);
            this.showScreen(this.service[this.pointer].getValue().toString());
        });

        /* FLOAT */
        this.buttonFloat.addEventListener('click', () => {
            console.log('.');
        });

        /* EQUAL */
        this.buttonEqual.addEventListener('click', () => {
            console.log('=');

            this.pointerToggle();
            let first = this.service.first.getValue().toString();
            let error = this.operate();
            if(error !== "ok") {
                this.service.reset();
                this.pointer = "first";
            } else {

                let operator = this.service.operator.get();
                let second = this.service.second.getValue().toString();
                this.showScreenSecond(first+operator+second+"=");
            }
            
            this.service.second.setValue(null);
            this.service.operator.set(null);
            
        });

    }


    this.showScreen = function(result) {
        this.currentResult = result;
        this.showResult.textContent = this.currentResult;
    }

    this.showScreenSecond = function(result) {
        this.currentIntermediate = result;
        this.showIntermediate.textContent = this.currentIntermediate;
    }

    this.operate = function() {

        const error = this.service.validate();
        if(error !== "ok") {
            this.showScreen(error);
            return error;
        }
            

        const result = +(this.service.operations[this.service.operator.get()]().toFixed(10));

        /* TOGGLE POINTER, SET STATE */
        this.showScreen(String(result));

        this.service.first.setState("mod");
        this.service.first.setValue(result);
        this.service.first.setState("mod");

        return error;
    }







}

let calculator = new Calculator();
let GUI = new UI(calculator);
GUI.setUp()
