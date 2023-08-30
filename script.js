function Calculator() {

    this.first = null;
    this.second = null;
    this.operator = null;

    this.getFirst = function() {
        return this.first;
    }

    this.getOperator = function() {
        return this.operator;
    }

    this.getSecond = function() {
        return this.second;
    }

    this.setFirst = function(newFirst) {
        this.first = newFirst;
    }

    this.setOperator = function(newOperator) {
        this.operator = newOperator;
    }

    this.setSecond = function(newSecond) {
        this.second = newSecond; 
    }

    this.operations = {
        "+": () => {
            return this.first + this.second;
        },

        "-": () => {
            return this.first - this.second;
        },

        "*": () => {
            return this.first * this.second;
        },

        "/": () => {
            return +((this.first / this.second).toFixed(10));
        },

        "sqrt": () => {
            return +(Math.sqrt(this.first).toFixed(10));
        },

        "**": () => {
            return Math.pow(this.first, this.second);
        },
    };

    this.showScreen = function(result) {
        console.log(result)
    }

    this.validate = function() {
        let error = "ok";

        switch(this.getOperator()) {

            case "+": 
            case "-":
            case "*":
            case "**":
                if(this.getFirst() === null || this.getSecond() === null)
                    error = "Malformed expression";
    
                break;

            case "/":
                if(this.getFirst() === null || this.getSecond() === null)
                    error = "Malformed expression";
                
                if(this.getSecond() === 0)
                    error = "Division by 0 is undefined";
                
                break;

            case "sqrt":
                if(this.getFirst() === null)
                    error = "Malformed expression";
                
                break;

            case "%":
                /* UPDATE */

                break;
        }


        return error;
    }

    this.operate = function() {

        const error = this.validate();
        if(error !== "ok")
            this.showScreen(error);

        const result = this.operations[this.getOperator()]();

        this.showScreen(String(result));

        this.setFirst(result);
    }
}

let calculator = new Calculator();