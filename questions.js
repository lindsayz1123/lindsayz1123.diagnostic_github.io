const questionBank = [
    // =========================
    // UNIT 1: JAVA BASICS
    // =========================
    {
        id: 1,
        unit: "Java Basics",
        concept: "Printing",
        difficulty: "easy",
        question: 'Which statement prints "Hello" to the console?',
        choices: [
            'print("Hello");',
            'System.out.println("Hello");',
            'console.log("Hello");',
            'println("Hello");'
        ],
        correctAnswer: 1
    },

    {
        id: 2,
        unit: "Java Basics",
        concept: "Main Method",
        difficulty: "medium",
        question: "What is the purpose of the main method in a basic Java program?",
        choices: [
            "It stores variables",
            "It creates a class",
            "It is the starting point for program execution",
            "It imports libraries"
        ],
        correctAnswer: 2
    },

    {
        id: 3,
        unit: "Java Basics",
        concept: "Output",
        difficulty: "difficult",
        question: `What happens when this runs?

public static void main(String[] args) {
    System.out.print("A");
    System.out.println("B");
    System.out.print("C");
}`,
        choices: [
            "A, B, and C are all on separate lines",
            "AB is on the first line and C is on the second",
            "A is on the first line and BC is on the second",
            "Compilation error"
        ],
        correctAnswer: 1
    },


    // =========================
    // UNIT 2: VARIABLES & DATA TYPES
    // =========================
    {
        id: 4,
        unit: "Variables & Data Types",
        concept: "Data Types",
        difficulty: "easy",
        question: "Which data type stores a whole number?",
        choices: [
            "String",
            "boolean",
            "int",
            "double"
        ],
        correctAnswer: 2
    },

    {
        id: 5,
        unit: "Variables & Data Types",
        concept: "Division",
        difficulty: "medium",
        question: `What is stored in result?

double result = 5 / 2.0;`,
        choices: [
            "2",
            "2.0",
            "2.5",
            "Error"
        ],
        correctAnswer: 2
    },

    {
        id: 6,
        unit: "Variables & Data Types",
        concept: "Type Compatibility",
        difficulty: "difficult",
        question: `What happens here?

int number = 10;
number = number + 2.5;`,
        choices: [
            "number becomes 12",
            "number becomes 12.5",
            "Compilation error",
            "Runtime error"
        ],
        correctAnswer: 2
    },


    // =========================
    // UNIT 3: OPERATORS & EXPRESSIONS
    // =========================
    {
        id: 7,
        unit: "Operators & Expressions",
        concept: "Modulus",
        difficulty: "easy",
        question: "What does the % operator calculate in Java?",
        choices: [
            "Division",
            "Remainder",
            "Percentage",
            "Multiplication"
        ],
        correctAnswer: 1
    },

    {
        id: 8,
        unit: "Operators & Expressions",
        concept: "Order of Operations",
        difficulty: "medium",
        question: `What is the value of result?

int result = 5 + 3 * 2;`,
        choices: [
            "16",
            "11",
            "13",
            "10"
        ],
        correctAnswer: 1
    },

    {
        id: 9,
        unit: "Operators & Expressions",
        concept: "Boolean Operators",
        difficulty: "difficult",
        question: `What is the value of this expression?

boolean result = (5 > 3 && 2 < 4) || false;`,
        choices: [
            "true",
            "false",
            "5",
            "Compilation error"
        ],
        correctAnswer: 0
    },


    // =========================
    // UNIT 4: CONDITIONALS
    // =========================
    {
        id: 10,
        unit: "Conditionals",
        concept: "If Statements",
        difficulty: "easy",
        question: "Which keyword begins a conditional statement?",
        choices: [
            "for",
            "if",
            "while",
            "method"
        ],
        correctAnswer: 1
    },

    {
        id: 11,
        unit: "Conditionals",
        concept: "Else If",
        difficulty: "medium",
        question: `What gets printed?

int score = 85;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}`,
        choices: [
            "A",
            "B",
            "C",
            "Nothing"
        ],
        correctAnswer: 1
    },

    {
        id: 12,
        unit: "Conditionals",
        concept: "Nested Conditionals",
        difficulty: "difficult",
        question: `What gets printed?

int x = 10;

if (x > 5) {
    if (x < 15) {
        System.out.println("A");
    } else {
        System.out.println("B");
    }
}`,
        choices: [
            "A",
            "B",
            "Nothing",
            "Compilation error"
        ],
        correctAnswer: 0
    },


    // =========================
    // UNIT 5: LOOPS
    // =========================
    {
        id: 13,
        unit: "Loops",
        concept: "For Loops",
        difficulty: "easy",
        question: "Which loop is commonly used when you know how many times you want to repeat something?",
        choices: [
            "if",
            "for",
            "switch",
            "class"
        ],
        correctAnswer: 1
    },

    {
        id: 14,
        unit: "Loops",
        concept: "Loop Counting",
        difficulty: "medium",
        question: `How many times does this loop execute?

for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`,
        choices: [
            "4",
            "5",
            "6",
            "Infinite"
        ],
        correctAnswer: 1
    },

    {
        id: 15,
        unit: "Loops",
        concept: "Loops and Conditionals",
        difficulty: "difficult",
        question: `What is printed?

int total = 0;

for (int i = 1; i <= 4; i++) {
    if (i % 2 == 0) {
        total += i;
    }
}

System.out.println(total);`,
        choices: [
            "4",
            "6",
            "10",
            "2"
        ],
        correctAnswer: 1
    },


    // =========================
    // UNIT 6: METHODS
    // =========================
    {
        id: 16,
        unit: "Methods",
        concept: "Return Values",
        difficulty: "easy",
        question: "What keyword sends a value back from a method?",
        choices: [
            "send",
            "output",
            "return",
            "print"
        ],
        correctAnswer: 2
    },

    {
        id: 17,
        unit: "Methods",
        concept: "Parameters",
        difficulty: "medium",
        question: `What does this print?

public static int multiply(int a, int b) {
    return a * b;
}

System.out.println(multiply(3, 4));`,
        choices: [
            "3",
            "4",
            "7",
            "12"
        ],
        correctAnswer: 3
    },

    {
        id: 18,
        unit: "Methods",
        concept: "Parameter Scope",
        difficulty: "difficult",
        question: `What is printed?

public static int calculate(int x) {
    x = x * 2;
    return x + 1;
}

int number = 5;
System.out.println(calculate(number));
System.out.println(number);`,
        choices: [
            "11 then 5",
            "11 then 11",
            "10 then 5",
            "6 then 5"
        ],
        correctAnswer: 0
    },


    // =========================
    // UNIT 7: ARRAYS & COLLECTIONS
    // =========================
    {
        id: 19,
        unit: "Arrays & Collections",
        concept: "Array Indexes",
        difficulty: "easy",
        question: "What is the first index of a Java array?",
        choices: [
            "-1",
            "0",
            "1",
            "Depends on the array"
        ],
        correctAnswer: 1
    },

    {
        id: 20,
        unit: "Arrays & Collections",
        concept: "Accessing Arrays",
        difficulty: "medium",
        question: `What does this print?

int[] numbers = {10, 20, 30};

System.out.println(numbers[1]);`,
        choices: [
            "10",
            "20",
            "30",
            "Error"
        ],
        correctAnswer: 1
    },

    {
        id: 21,
        unit: "Arrays & Collections",
        concept: "Enhanced For Loop",
        difficulty: "difficult",
        question: `What is printed?

int[] numbers = {2, 4, 6, 8};
int total = 0;

for (int number : numbers) {
    total += number;
}

System.out.println(total);`,
        choices: [
            "8",
            "12",
            "20",
            "24"
        ],
        correctAnswer: 2
    },


    // =========================
    // UNIT 8: CLASSES & OBJECTS
    // =========================
    {
        id: 22,
        unit: "Classes & Objects",
        concept: "Classes",
        difficulty: "easy",
        question: "What is a class?",
        choices: [
            "A loop",
            "A blueprint for creating objects",
            "A variable",
            "An array"
        ],
        correctAnswer: 1
    },

    {
        id: 23,
        unit: "Classes & Objects",
        concept: "Object Creation",
        difficulty: "medium",
        question: `What does this statement do?

Car myCar = new Car();`,
        choices: [
            "Creates an int",
            "Creates a method",
            "Creates a new Car object and stores its reference in myCar",
            "Deletes a Car"
        ],
        correctAnswer: 2
    },

    {
        id: 24,
        unit: "Classes & Objects",
        concept: "Object References",
        difficulty: "difficult",
        question: `What does this print?

class Dog {
    String name;

    Dog(String name) {
        this.name = name;
    }
}

Dog dog1 = new Dog("Max");
Dog dog2 = dog1;

dog2.name = "Charlie";

System.out.println(dog1.name);`,
        choices: [
            "Max",
            "Charlie",
            "dog1",
            "Compilation error"
        ],
        correctAnswer: 1
    },


    // =========================
    // UNIT 9: OBJECT-ORIENTED PROGRAMMING
    // =========================
    {
        id: 25,
        unit: "Object-Oriented Programming",
        concept: "Inheritance",
        difficulty: "easy",
        question: "What does inheritance allow?",
        choices: [
            "One class to inherit fields and methods from another class",
            "A loop to run repeatedly",
            "An array to grow",
            "A variable to change type"
        ],
        correctAnswer: 0
    },

    {
        id: 26,
        unit: "Object-Oriented Programming",
        concept: "Inheritance Syntax",
        difficulty: "medium",
        question: "Which keyword is used for class inheritance?",
        choices: [
            "inherits",
            "implements",
            "extends",
            "superclass"
        ],
        correctAnswer: 2
    },

    {
        id: 27,
        unit: "Object-Oriented Programming",
        concept: "Polymorphism",
        difficulty: "difficult",
        question: `What object-oriented concept is demonstrated here?

class Animal {
    void speak() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("Dog");
    }
}

Animal animal = new Dog();
animal.speak();`,
        choices: [
            "Encapsulation",
            "Polymorphism",
            "Array indexing",
            "Exception handling"
        ],
        correctAnswer: 1
    },


    // =========================
    // UNIT 10: EXCEPTIONS & FILES
    // =========================
    {
        id: 28,
        unit: "Exceptions & Files",
        concept: "Exception Handling",
        difficulty: "easy",
        question: "What is try-catch primarily used for?",
        choices: [
            "Creating loops",
            "Handling exceptions",
            "Creating classes",
            "Declaring variables"
        ],
        correctAnswer: 1
    },

    {
        id: 29,
        unit: "Exceptions & Files",
        concept: "Catch Blocks",
        difficulty: "medium",
        question: "Which block executes when an appropriate exception occurs inside the try block?",
        choices: [
            "if",
            "else",
            "catch",
            "while"
        ],
        correctAnswer: 2
    },

    {
        id: 30,
        unit: "Exceptions & Files",
        concept: "Array Exceptions",
        difficulty: "difficult",
        question: `What happens when this code runs?

try {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Invalid index");
}`,
        choices: [
            "It prints 3",
            "The program crashes without output",
            'It prints "Invalid index"',
            "It prints 5"
        ],
        correctAnswer: 2
    }
];