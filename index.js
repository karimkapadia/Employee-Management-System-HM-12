const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');
// const connection = require('./connection.js');
const db = require('./connection.js')

async function main()
{
  const answer = await inquirer.prompt(
      [
          {
              type:"list",
              name:"selected",
              message: "Please enter your choice? ",
              choice: ["Add", "view", "Update"]

          }

      ])
      if(answer.selected == "Add")
      {
          const choiceAdd = await inquirer.prompt(
        [
            {
                type:"list",
                name:"addSelected",
                choices: ["Employees", "Department", "Role"]
            }
        ])
        if(choiceAdd.addSelected== "Employees")
        {            
            const emptId = await inquirer.prompt({name:"id", message:"What is the id of Employee? "})
            const empFirst= await inquirer.prompt({name: "first", message:"What is the first name of employee?"})
            const empLast= await inquirer.prompt({name: "last", message:"What is the last name of employee?"})
            const empRoleID= await inquirer.prompt({name: "roleid", message:"What is the role id of employee?"})
            const empManagerID= await inquirer.prompt({name: "managerid", message:"What is the manager id of employee?"});

            await db.query("INSERT INTO employee(id,first_name,last_name,role, manager_id) VALUES (?,?,?,?,?)",
            [empID.id,empFirst.first,empLast.last,empRoleID.roleid,empManagerID.managerid]);
 


        }
        else if(choiceAdd.addSelected== "Department")
        {
            const deptid = await inquirer.prompt({name:"id", message:"What is the id of departent? "})
            const deptname= await inquirer.prompt({name: "name", message:"What is the name of Department?"})
            
            await db.query("INSERT INTO department (id, name) VALUES (?,?)",[deptid.id, deptname.name]);
            
        }
        else
        {            

            const roletId = await inquirer.prompt({name:"id", message:"What is the id of role? "})
            const roleTitle= await inquirer.prompt({name: "title", message:"What is the title of role?"})
            const roleSalary= await inquirer.prompt({name: "salary", message:"What is the name of ?"})
            const deptId= await inquirer.prompt({name: "dept_id", message:"What is the name of Department?"})
            
            await db.query("INSERT INTO emp_role(id,title,salary, department_id) VALUES (?,?,?,?)",
            [roletId.id, roleTitle.title,roleSalary.salary,deptId.dept_id]);
            

        }


      }
      else if(answer.selected == "view")
      {
        const choiceview = await inquirer.prompt(
            [
                {
                    type:"list",
                    name:"viewSelected",
                    choices: ["View All Employees", "View Employees by Department", "View Employees by role"]
                }
            ])
            if(choiceview.viewSelected == "View All Employees")
            { 
                
                const allEmp = await  db.query("Select * from employee")
                console.table(allEmp);
                
            }
            else if(choiceview.viewSelected == "View Employees by Department")
            {

                const deptList = await db.query("select * from department");
                
                async function check()
                {
                    for(const i=0; i<deptList;i++)
                    {             
                        
                           const ans=  await inquirer.prompt(
                                [
                                    {
                                        type:"list",
                                        name:"deptSelected",
                                       choices: [`${deptList.id}`]

                                    }
                                ])
                            console.log(ans);

                    }
                }

                

               
                
                // select employee.id,employee.first_name,employee.last_name,employee.role_id,emp_role.id, emp_role.title,emp_role.salary,emp_role.department_id from employee left join emp_role on employee.role_id=emp_role.id where emp_role.department_id = 1;
            }
            else if(choiceview.viewSelected == "View Employees by role")
            {

                
            }

      }
}
main()