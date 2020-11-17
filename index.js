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
              choices: ["Add", "view", "Update"]

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
            const emptId = await inquirer.prompt({ type: "input",name:"id", message:"What is the id of Employee? "})
            const empFirst= await inquirer.prompt({type: "input",name: "first", message:"What is the first name of employee?"})
            const empLast= await inquirer.prompt({type: "input",name: "last", message:"What is the last name of employee?"})
            const empRoleID= await inquirer.prompt({ type: "input", name: "roleid", message:"What is the role id of employee?"})
            const empManagerID= await inquirer.prompt({type: "input", name: "managerid", message:"What is the manager id of employee?"});

            await db.query("INSERT INTO employee(id,first_name,last_name,role_id, manager_id) VALUES (?,?,?,?,?)",
            [emptId.id,empFirst.first,empLast.last,empRoleID.roleid,empManagerID.managerid]);
            
            main();


        }
        else if(choiceAdd.addSelected== "Department")
        {
            const deptid = await inquirer.prompt({type: "input", name:"id", message:"What is the id of departent? "})
            const deptname= await inquirer.prompt({type: "input", name: "name", message:"What is the name of Department?"})
            
            await db.query("INSERT INTO department (id, name) VALUES (?,?)",[deptid.id, deptname.name]);
            main();
            
        }
        else
        {            

            const roletId = await inquirer.prompt({type: "input",name:"id", message:"What is the id of role? "})
            const roleTitle= await inquirer.prompt({type: "input", name: "title", message:"What is the title of role?"})
            const roleSalary= await inquirer.prompt({type: "input", name: "salary", message:"Enter salary for this role?"})
            const deptId= await inquirer.prompt({type: "input",name: "dept_id", message:"Enter department ID for this role?"})
            
            await db.query("INSERT INTO emp_role(id,title,salary, department_id) VALUES (?,?,?,?)",
            [roletId.id, roleTitle.title,roleSalary.salary,deptId.dept_id]);
            
            main();

        }


      }
      else if(answer.selected == "view")
      {
        const choiceview = await inquirer.prompt(
            [
                {
                    type:"list",
                    name:"viewSelected",
                    choices: ["View All Employees", "View all Department", "View role"]
                }
            ])
            if(choiceview.viewSelected == "View All Employees")
            { 
                
                const allEmp = await  db.query("Select * from employee")
                console.table(allEmp);
                main();
                
            }
            else if(choiceview.viewSelected == "View all Department")
            {

                const deptList = await db.query("select * from department");  
                console.table(deptList)           
                main();

            }
            else if(choiceview.viewSelected == "View role")
            {
                const roleList = await db.query("select * from emp_role");
                console.table(roleList);
                main();
                
                
            }

      }
      else
      {
        const choiceupdate = await inquirer.prompt(
            [
                {
                    type:"list",
                    name:"updateSelected",
                    choices: ["Update Employees", "Update roles"]
                }
            ])
            if(choiceupdate.updateSelected == "Update Employees")
            {
                // console.log("[update employee called]");
                // console.log('[We are in employee update]')
                const result = await db.query("select * from employee")
                // console.log(result.length);

                let emp= [];
                result.forEach(element => {emp.push(element.first_name)
                                 
                
                });
                console.log(emp);

                const emp_upd = await inquirer.prompt(
                    [
                        {
                            type: "list",
                            name:"emp_select",
                            choices:emp
                        },

                        {
                            type:"list",
                            name:"updateField",
                            message: "What you want to update for this employee",
                            choices: ["Manager ID","Role ID"]
                        }
                    ])
                    console.log(`[in update manager promt] ${emp_upd.updateField}`);
                    if(emp_upd.updateField == "Manager ID") 
                    {
                        
                        const updManager = await inquirer.prompt(
                            [
                                {
                                    type:"input",
                                    name:"updateMng",
                                    message: "Please enter new Manager ID",
                            

                                }
                            ])
                            console.log(updManager.updateMng)
                            console.log(`update employee set manager_id = "${updManager.updateMng}" where first_name = "${emp_upd.emp_select}"`);

                             const mangerQuery = await db.query(`update employee set manager_id = ${updManager.updateMng} where first_name = "${emp_upd.emp_select}"`);
                            console.log("successfully changed Manager ID");
                            main();
                    }
                    else
                    {
                        const updRoleid = await inquirer.prompt(
                            [
                                {
                                    type:"input",
                                    name:"updateroleId",
                                    message: "Please enter new Role ID",
                            

                                }
                            ])
                            // console.log(updRoleid.updateroleId)
                            // console.log(`update employee set role_id = "${updRoleid.updateroleId}" where first_name = "${emp_upd.emp_select}"`);

                             const mangerQuery = await db.query(`update employee set role_id = ${updRoleid.updateroleId} where first_name = "${emp_upd.emp_select}"`);
                            console.log("successfully changed Role ID");
                            main();

                    }

                

                
            }
            else
            {
                // console.log("[update employee called]");
                //  console.log('[We are in role update]')
                const result = await db.query("select * from emp_role")
                // console.log(result);

                let role= [];
                result.forEach(element => {role.push(element.title)
                                 
                
                });
               

                const role_upd = await inquirer.prompt(
                    [
                        {
                            type: "list",
                            name:"role_select",
                            choices:role
                        },

                        {
                            type:"list",
                            name:"roletitle",
                            message: "What you want to update for this role",
                            choices: ["Role Title","Role salary"]
                        }
                    ])
                    // console.log(`[in update role prompt] ${role_upd.roletitle}`);


                    if(role_upd.roletitle == "Role Title") 
                    {
                        
                        const updtitle = await inquirer.prompt(
                            [
                                {
                                    type:"input",
                                    name:"updatetitle",
                                    message: "Please enter new title",
                            

                                }
                            ])
                            // console.log(`updtitle.updatetitle`)
                            // console.log(`update employee set manager_id = "${updManager.updateMng}" where first_name = "${emp_upd.emp_select}"`);

                             const roleQuery = await db.query(`update emp_role set title = ? where title = ?`, [updtitle.updatetitle, role_upd.role_select])
                            console.log("successfully changed Role title");
                            main();
                    }
                    else
                    {
                        const updsalary = await inquirer.prompt(
                            [
                                {
                                    type:"input",
                                    name:"updatesalary",
                                    message: "Please enter new salary",
                            

                                }
                            ])
                            // console.log(`updsalary.updatesalary`)
                            // console.log(`update employee set manager_id = "${updManager.updateMng}" where first_name = "${emp_upd.emp_select}"`);

                             const roleQuery = await db.query(`update emp_role set salary = ? where title = ?`, [updsalary.updatesalary, role_upd.role_select])
                            
                             console.log("successfully changed Role Salary");
                            main();
                    }

                

                
             }

            }

      }

main()