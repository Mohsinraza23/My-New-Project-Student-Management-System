#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class student {
    id : string;
    name : string;
    coursesEnrolled : string[];
    feesAmount : number;

    constructor( id : string ,name : string , coursesEnrolled : string[] , feesAmount : number ) {
        this.id = id
        this.name = name
        this.coursesEnrolled = coursesEnrolled
        this.feesAmount = feesAmount
    }
}

let baseId = 10000;
let studentId : string = "";
let continueEnrollment = true;

let students : student[] = []

do{
    let action = await inquirer.prompt(
        {
            name : "ans",
            message : chalk.bold.italic.underline.greenBright("Student Management System ,\n\tPlease select an option:\n"),
            type : "list",
            choices : ["Enroll a student" ,"Show student status"],
        }
    )
    if(action.ans === "Enroll a student" ){
        let studentName = await inquirer.prompt(
            {
                name : "ans",
                type : 'input',
                message :chalk.bold.italic.blueBright("Please Enter your name :")
            }
        )
        let trimedStudentName = (studentName.ans).trim().toLowerCase()
        let studentNameCheck = students.map(obj => obj.name)

        if(studentNameCheck.includes(trimedStudentName) === false){
            if(trimedStudentName !== ""){
                baseId++
                studentId = "STID" + baseId
    
                console.log(chalk.bold.italic.underline.yellowBright("\n\tYour account has been created"));
                console.log(chalk.bold.italic.underline.greenBright(`<<<<  WELLCOME  >>>  ${trimedStudentName}!`));

                let course = await inquirer.prompt(
                    {
                        type : "list",
                        name : "ans",
                        message :chalk.bold.italic.underline.redBright("Please select a course"),
                        choices : ["IT" , "HTML" ,"CSS"]
                    }
                )
                let courseFees = 0
                switch(course.ans) {
                    case "IT" :
                    courseFees = 5000 ;
                    break;

                        case "HTML" :
                        courseFees = 500;
                        break;

                            case "CSS" :
                            courseFees = 300;
                            break;
                }

                let  courseConfirm =await inquirer.prompt(
                    {
                        type : "confirm",
                        name : "ans",
                        message :chalk.bold.italic.green("Do you want to enroll in this course"),
                    }
                )

                if(courseConfirm.ans === true){
                    let Student = new student(studentId , trimedStudentName , [course.ans] , courseFees)
                    students.push(Student)

                    console.log(chalk.bold.italic.redBright("You have enrole this course"));
                    
                }
            }
            else{
                console.log(chalk.bold.italic.red("invalid name"));
                
            }
        }else{
            console.log(chalk.bold.italic.bgBlackBright("this name is already exists"));
            
        }
    }
    else if(action.ans === "Show student status"){
        if(students.length !==0){
            let studentNamecheck = students.map(e => e.name)

            let selectedStudent = await inquirer.prompt(
                {
                    type : "list",
                    name : "ans",
                    message :chalk.bold.italic.red("Please select name"),
                    choices : studentNamecheck
                }
            )
            
            let foundStudent =students.find(Student => Student.name === selectedStudent.ans)

            console.log("Student information");
            console.log(foundStudent);
            console.log("\n");
            
            
            
        } else{
            console.log(chalk.bold.italic.bgYellowBright("Record is empty"));
            
        }
    }
    let userConfirm = await inquirer.prompt(
        {
            type : "confirm",
            name : "ans",
            message :chalk.bold.italic.blueBright("Do you want to continue ?")
        }
    )

    if(userConfirm.ans === false){
        continueEnrollment = false
    }


}while(continueEnrollment)
