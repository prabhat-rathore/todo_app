import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj = new Task();
  taskArr : Task[]=[];
  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit():void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.taskArr=[]
    this.crudService.getAllTask().subscribe(res=>{
      Object.keys(res).forEach(key=>{
        this.taskArr.push({id:parseInt(key),task:res[key].task})
      })
    },err=>{
      alert("Unable to get all list of Task")
    })
  }

  addTask(){
    this.taskObj.id  = Math.floor(1000+Math.random()*9000)
    this.taskObj.task = this.addTaskValue
     this.crudService.addTask(this.taskObj).subscribe(res=>{
       this.addTaskValue = '';
       this.taskArr.push(res)
       
     },
     err=>{
       alert(err);
     })
  }

  editTask(){
    this.taskObj.task = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
    },
    err=>{
      alert("Failed to edit the task");
    })
  }

  deleteTask(taskId:number){
    this.crudService.deleteTask(taskId).subscribe(res=>{
      this.getAllTask()

      
    },err=>{
      alert("Failed to delete Task");
    })
  }

  call(etask: Task)
  {
    this.taskObj = etask;
    this.editTaskValue = etask.task;
  }

}
