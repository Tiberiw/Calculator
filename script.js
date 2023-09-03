/* Operand class */
function Operand() {

    this.value = "0";

    /* Returns the operand in string format */
    this.getString = function(){
        return this.value;
    }

    /* Return the operand in number format*/
    this.getNumber = function() {
        return parseFloat(this.value);
    }

    /* Add a digit at the back of the number 
        RESTRICTIONS:
            - CANNOT have more than one '.'
            - CANNOT have '000' or '099'
            - CANNOT have more than 20 digits
    */
    this.addBack = function(newValue) {

        if(newValue === ".") {
            if(!this.value.includes('.'))
                this.value += newValue;
        } else {
            if(this.value ==="0") {
                if(newValue !== "0")
                    this.value = newValue;
            } else {
                let digitNumber = this.value.replace(/[^0-9]/g,'').length;
                if(digitNumber < 20)
                    this.value += newValue;
            }
        }
          
    }

    /* Remove the last digit from the number 
        RESTRICTIONS:
            - CANNOT have "-0" or "" or "-"
    */
    this.removeBack = function() {
        if(this.value !== "0")
            this.value = this.value.slice(0,-1);

        if(this.value === "-0" || this.value === "" || this.value === "-")
            this.value = "0"; 
    }

    /* Set the number value to newValue */
    this.setValue = function(newValue) {
        this.value = newValue;
    }

    /* Toggle the sign of the number 
        RESTRICTIONS:
            - CANNOT have "-0"
    */
    this.toggleSign = function() {
        if(this.value[0] === "-")
            this.value = this.value.slice(1);
        else {
            if(this.value !== "0")
                this.value = "-" + this.value; 
        }
                   
    }

    /* Returns if there is an '.' in the number */
    this.isFloat = function() {
        return this.value.includes('.');
    }

    /* Returns if the number is "0" */
    this.isZero = function() {
        return this.value === "0";
    }
}

function Operator() {

    this.operator = "";
    this.operatorText = ""
    this.operatorDictionary = {
        "+": "add",
        "-": "subtract",
        "*": "multiply",
        "/": "division",
        "^": "pow",
        "%": "procent",
        "sqrt": "sqrt",
    }

    /* Get the operator */
    this.getOperator = function() {
        return this.operator;
    }

    /* Get the operator in text format */
    this.getOperatorText = function() {
        return this.operatorDictionary[this.operator];
    }

    /* Set the operator to newOperator */
    this.setOperator = function(newOperator) {
        this.operator = newOperator;
    }
}


function Expression(op1,op2,oper) {

    this.operandOne = op1;
    this.operandTwo = op2;
    this.operator = oper;
    
    this.getOperandOne = function() {
        return this.operandOne;
    }

    this.getOperandTwo = function() {
        return this.operandTwo;
    }

    this.getOperator = function() {
        return this.operator;
    }

    this.operatorList = {
        "+": () => {
            return this.operandOne.getNumber() + this.operandTwo.getNumber();
        },

        "-": () => {
            return this.operandOne.getNumber() - this.operandTwo.getNumber();
        },

        "*": () => {
            return this.operandOne.getNumber() * this.operandTwo.getNumber();
        },

        "/": () => {
            return this.operandOne.getNumber() / this.operandTwo.getNumber();
        },

        "^": () => {
            return this.operandOne.getNumber() ** this.operandTwo.getNumber();
        },

        "%": (operand) => {
            return operand.getNumber() / 100;
        },

        "sqrt": (operand) => {
            return Math.sqrt(operand.getNumber());
        },
    }

    this.calc = function() {
        if(this.getOperator().getOperator() === "/" && this.getOperandTwo().getNumber() === 0)
            return "error";
        return this.operatorList[this.operator.getOperator()]();
    }

    this.calcSpecific = function(operator,operand) {
        return this.operatorList[operator](operand);
    }

}

function Calculator(expression) {

    this.expression = expression;
    this.pointer = this.expression.getOperandOne();


    this.overrideMode = true;
    this.modified = false;

    this.reset = function() {

        this.pointer = this.expression.getOperandOne();
        this.overrideMode = true;
        this.modified = false;
        this.expression.getOperandOne().setValue('0');
        this.expression.getOperandTwo().setValue('0');
        this.expression.getOperator().setOperator('');
    }
    

    this.dictionary = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "float": ".",
        "add": {
            operator: "+",
            operatorShow: "+",
        },
        "subtract": {
            operator: "-",
            operatorShow: "-",
        },
        "multiply": {
            operator: "*",
            operatorShow: "×",
        },
        "division": {
            operator: "/",
            operatorShow: "÷",
        },
        "pow": {
            operator: "^",
            operatorShow: "^",
        },
        "procent": {
            operator: "%",
            operatorShow: "%",
        },
        "sqrt": {
            operator: "sqrt",
            operatorShow: "√"
        },

    }

    /* IMPLEMENT LOGIC : mode, pointer */
    this.manageOperand = function(operand) {

        let result = ["ok",""];

          switch(operand) {

            /* Remove the last digit */
            case "remove":
                this.pointer.removeBack();

                /* If the intermediate screen is not relevant, delete it */
                if(this.pointer === this.expression.getOperandOne())
                    result[0] = "";
                break;

            case "sign":
                this.pointer.toggleSign();
                break;

            default:

                /* Reset the number */
                if(this.overrideMode) {
                    this.overrideMode = false;
                    this.pointer.setValue("0");
                }

                /* The intermediat screen not relevant */
                if(this.pointer === this.expression.getOperandOne())
                    result[0] = "";

                /* Add back the digit */
                this.pointer.addBack(this.dictionary[operand]);

                /* Set modified to true */
                if(this.pointer === this.expression.getOperandTwo())
                    this.modified = true;
        }

        /* Return the current operator*/
        result[1] = this.pointer.getString();
        return result;
    }



    this.manageOperation = function(operation) {
        let result = ["",""];

        if(operation === "equal") {

            /* Set the pointer to first operand */
            this.pointer = this.expression.getOperandOne();

            if(this.expression.getOperator().getOperator() !== "") {

                /* Create the intermediate result */
                result[0] = this.expression.getOperandOne().getNumber().toString() +
                            this.dictionary[this.expression.getOperator().getOperatorText()].operatorShow + 
                            this.expression.getOperandTwo().getNumber().toString() +
                            "=";

                /* SET THE RESULT */
                let partialResult = this.expression.calc()
                if(partialResult === "error") {
                    result[0] = null;
                    result[1] = "0";
                    return result;
                    
                } 
                this.expression.getOperandOne().setValue((+(partialResult.toFixed(10))).toString());

                //Error when no operator is selected first
            } else {
                result[0] = this.expression.getOperandOne().getNumber().toString() + "="
            }
            
        } else if(operation === "sqrt" || operation === "procent") {

            let op = this.dictionary[operation].operator;

            if(this.pointer === this.expression.getOperandOne()) {
                result[0] = this.dictionary[operation].operatorShow + "(" + this.pointer.getString() + ")";
                            
            }

            if(this.pointer === this.expression.getOperandTwo()) {
                result[0] = this.expression.getOperandOne().getString() + 
                            this.dictionary[this.expression.getOperator().getOperatorText()].operatorShow + 
                            this.dictionary[operation].operatorShow + "(" + this.pointer.getString() + ")"
            }

            let newValue = this.expression.calcSpecific(op,this.pointer);
            newValue = +(newValue.toFixed(10));
            this.pointer.setValue(newValue);

            

            // this.modified = true;
            // this.overrideMode = false;
            
            result[1] = this.pointer.getString();
            return result;
        }
        else {

            //If an operation can be done already calculate the new first operand
            if(this.modified === true) {
                let partialResult = this.expression.calc();
                if(partialResult === "error") {
                    result[0] = null;
                    result[1] = "0";
                    return result;
                } 
                this.expression.getOperandOne().setValue((+(partialResult.toFixed(10))).toString());    
            }
            
            //Set the new operator and set pointer to operandTwo
            this.expression.getOperator().setOperator(this.dictionary[operation].operator);
            this.pointer = this.expression.getOperandTwo();

            //Calculate the intermediate screen result
            result[0] = this.expression.getOperandOne().getNumber().toString() + 
                        this.dictionary[operation].operatorShow;


            //Set the second operator to the same value as first operator
            this.expression.getOperandTwo().setValue(this.expression.getOperandOne().getNumber().toString());
        }

        //Set modes
        this.overrideMode = true;
        this.modified = false;

        //Return the current operator
        result[1] = this.pointer.getString();
        return result;
    }
}


function UI(service) {
    this.service = service;


    /* GET OPERATOR BUTTONS (backspace included)*/
    this.operandButtons = [...document.querySelectorAll('.operand')];

    /* GET OPERATIONS (equal included, reset included)*/
    this.operationButtons = [...document.querySelectorAll('.operation')];

    this.clearButton = document.querySelector('#clear');

    /* GET DISPLAY SCREENS */
    this.intermediate = document.querySelector('div.intermediate');
    this.final = document.querySelector('div.result');


    this.setUp = function() {

        /* OPERAND BUTTON EVENTS */
        for(let op of this.operandButtons) {

            op.addEventListener('click', (e) => {
                /* MODIFICA SA FIE CE TREBUIE SA FIE IN DICTIONAR */
                let result = this.service.manageOperand(e.target.id);
                if(result[0] === "")
                    this.show(result[0],this.intermediate);
                this.show(result[1],this.final);
                
            });

        }

        /* OPERATOR BUTTON EVENT 
            service - return an array of 2 element
            the first element is the result for intermediate screen
            the second element is the result for final screen
                if the first element is equal to "" => error(don't show anything)
                if the first element is equal to null => division by 0 (alert, set 0 as the first element)
        */
        for(let op of this.operationButtons) {

            op.addEventListener('click', (e) => {

                /* MODIFY E.TARGET.ID */
                console.log(e.target);
                let result = this.service.manageOperation(e.target.closest('.operation').id);
                
                if(result[0] === null) {
                    alert('Cannot divide by zero!');
                    this.service.reset();
                    this.show('',this.intermediate);
                }
                else 
                    this.show(result[0],this.intermediate);

                this.show(result[1],this.final);
            });
        }

        /* Set clear button */
        this.clearButton.addEventListener('click', () => {
            this.service.reset();
            this.show('0',this.final);
            this.show('',this.intermediate);
        })


        this.service.reset();
        this.show('0',this.final);
        this.show('',this.intermediate);

    }


    /* Function that displays the 'newValue' on the specified 'screen'
        newValue - int
        screen = this.intermediate / this.final (nodes) 
    */
    this.show = function(newValue,screen) {
        screen.textContent = newValue.toString();
    }


}


let operandOne = new Operand();
let operandTwo = new Operand();
let operator = new Operator();
let expression = new Expression(operandOne,operandTwo,operator);
let service = new Calculator(expression);
let GUI = new UI(service);
GUI.setUp();