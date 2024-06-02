#! /usr/bin/env node

abstract class LibraryItem{
    title: string;

    constructor(title: string){
        this.title = title;
    }

    abstract getDetails(): void;
}

class Book extends LibraryItem{
    author: string;

    constructor(title: string, author: string){
        super(title);
        this.author = author;
    }

    // implement abstract class
    getDetails(){
        console.log(`The book "${chalk.blueBright(this.title)}" is written by "${chalk.greenBright(this.author)}."`);
    }
}

class Magazine extends LibraryItem{
    publisherName: string;

    constructor(title: string, publisherName: string){
        super(title);
        this.publisherName = publisherName;
    }

    // implement abstract class
    getDetails(): void {
        console.log(`The Magazine "${chalk.blueBright(this.title)}" is published by "${chalk.greenBright(this.publisherName)}".`);
    }
}

class User {
    // Private property to encapsulate accessCard
    private accessCard: boolean = true;
    userName: string;

    // Public property, can be accessed directly
    constructor(userName: string){
        this.userName = userName;
    }

    // Getter for accessCard
    get access(): boolean{
        return this.accessCard;
    }

    // Setter for accessCard
    set access(value: boolean){
        if(value !== this.accessCard){
            this.accessCard = value;
            if (!value){
                console.log("Sorry you do not have access of books reading.");
            }
        }
    }

    // Protected method to be used within the class and subclasses
    protected reading(){
        console.log(`${this.userName} is reading a book.`);
   }  
}

class Librarian extends User{
    collectorName: string = "Charlie Doe";
    constructor(userName: string){
        super(userName)

    }

    feesCollection(amount: number): void{
        console.log(`${this.collectorName} as a librarian has collected ${amount} for card payment from user ${this.userName}.`);
    }

    organizeBook(): void{
        console.log(`${this.collectorName} is organizing the books.`);
    }

    // Overridden method to demonstrate inheritance
    reading(): void {
        console.log(this.userName.charAt(0).toUpperCase() + this.userName.slice(1).toLowerCase(), "is reading a librarian-specific book.");
    }
}

// Global arrays to store library items
const books: Book[] = [];
const magazines: Magazine[] = [];
const readers: Librarian[] = [];

import inquirer from "inquirer"
import chalk from "chalk"

// Function to display menu and get user choice
console.log(chalk.italic.underline.magentaBright("\n\t\t---WELCOME TO THE LIBRARY MANAGEMENT SYSYTEM---\n"));

function displayMenu(){
    inquirer.prompt([
        {
        message: "What do you want to do? ",
        type: "list",
        name: "choice",
        choices: ["Add Book", "Add Magazine", "Reading Books", "Display Library Item", "Exit"]
    }
])
.then((answer: any) => {
    handleUser(answer.choice);
});
}

// Function to handle user choice
function handleUser(choice: string){
    switch(choice){
        case "Add Book":
            addBook();
            break;

        case "Add Magazine":
            addMagazine();
            break;

        case "Reading Books":
            reading();
            break;

        case "Display Library Item":
            displayLibraryItem();
            break;

        case "Exit":
            console.log("Exiting...");
            break;

        default:
            console.log("Invalid choice, please try again");
            displayMenu();
            break;
    }
}

function addBook(){
    inquirer.prompt([
        {
            message: "Enter the title of the book: ",
            type: "input",
            name: "title",
            validate: (input: string) => input !== "" || "title can't be empty"
        },
        {
            message: "Enter the author of the book: ",
            type: "input",
            name: "author",
            validate: (input: string) => input !== "" || "author can't be empty"

        }
    ])
    .then((answer: any) => {
        const book = new Book(answer.title, answer.author);
        books.push(book);
        console.log(chalk.greenBright("\nBook added successfully!\n"), book, '\n');
        displayMenu();
    });
}

function addMagazine(){
    inquirer.prompt([
        {
            message: "Enter the Magazine title: ",
            type: "input",
            name: "title",
            validate: (input: string) => input !== "" || "title can't be empty"

        },
        {
            message: "Enter the publisher of the magazine: ",
            type: "input",
            name: "publisher",
            validate: (input: string) => input !== "" || "publisher can't be empty"

        }
    ])
    .then((answer: any) => {
        const magazine = new Magazine(answer.title, answer.publisher);
        magazines.push(magazine);
        console.log(chalk.greenBright("\nMagazine added successfully!\n"), magazine, '\n');
        displayMenu();
    });
}

function reading(){
    inquirer.prompt([
        {
            message: "Enter Your Name: ",
            type: "string",
            name: "reader",
            validate: (input: string) => input !== "" || "Name can't be empty"

        }
    ])
    .then((answer: any) => {
        const reader = new Librarian((answer.reader));
        readers.push(reader);
        chalk.greenBright(reader.reading());
        displayMenu();  
    });
}

function displayLibraryItem(){
    console.log(chalk.underline.magentaBright("\n\tDisplaying Library Items"));

    console.log(chalk.yellowBright("\nBooks:"));
    if (books.length === 0){
        console.log(chalk.redBright("No books available"));
    } else {
    books.forEach((book) => book.getDetails());
    }

    console.log(chalk.yellowBright("\nMagazines:"));
    if (magazines.length === 0){
        console.log(chalk.redBright("No magazines available"));
    } else{
    magazines.forEach((magazine) => magazine.getDetails());
    }

    console.log(chalk.yellowBright("\nReading books:"));
    if (readers.length === 0){
        console.log(chalk.redBright("No readers available"));
    } else{
    readers.forEach((reader) => reader.reading());
    }
    console.log('\n');
    
    displayMenu();
}

displayMenu();
