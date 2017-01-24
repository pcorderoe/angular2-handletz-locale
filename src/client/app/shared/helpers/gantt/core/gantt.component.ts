import { Component } from '@angular/core';

declare let moment:any;

@Component({
    moduleId: module.id,
    selector: 'gantt-dit',
    templateUrl: './gantt.component.html',
    styleUrls: ['./gantt.component.css']
})

export class GanttComponent {
    startDate:Date;
    endDate:Date;
    headers:any = {};
    totalWidth:number = 0;
    totalDays:number = 0;
    totalMonths:number = 0;
    scale:string = 'daily';
    constructor (){
        this.startDate = moment();
        this.endDate = moment().add(3, 'months');
        this.headers = { months:[], days:[], hours:[] };
        this.calculateHeaders();
    }
    calculateHeaders(){
        switch(this.scale){
            case 'daily': default:
                this.DailyVisualization();
            break;
            case '3 hours':
                this.HourlyVisualization(3);
        }
    }
    HourlyVisualization = (periodicity:number = 1) => {
        let start = moment(this.startDate);
        let end = moment(this.endDate);

        while (start < end){
            start.add(periodicity, 'hours')
        }
    }
    DailyVisualization = () => {
        let start = moment(this.startDate);
        let end = moment(this.endDate);
        //calculate only months and days
        while (start < end){
            if(!this.hasMonth(start.format('MMMM'))){
                this.headers.months.push({name:start.format('MMMM'), quantityOfDays:1, originalDate:moment(start), width:0});
            }else{
                this.UpdateDaysQuantity(start.format('MMMM'));
            }
            this.headers.days.push({name:start.format('DD'), quantityOfHours:0, originalDate:moment(start), width:0});
            start.add(1, 'day');
        }
        this.totalDays = this.headers.days.length;
        this.totalMonths = this.headers.months.length;
        this.totalWidth = this.headers.days.length * 50;
        for (let i = 0; i < this.headers.months.length; i++){
            var month = this.headers.months[i];
            month.width = (month.quantityOfDays/this.totalDays) * this.totalWidth;
        }
        for (let i = 0; i < this.totalDays; i++){
            var day = this.headers.days[i];
            day.width = 50;
        }
    }
    UpdateHoursQuantity = (month:string, day:string) => {
        if(this.headers.days.length >0){
            for(let i = 0; i < this.headers.days.length; i++){
                if(this.headers.days[i].month == month && this.headers.days[i].name == day){
                    this.headers.days[i].quantity = this.headers.days[i].quantity + 1; 
                }
            }
        }
    }
    UpdateDaysQuantity = (month:string) => {
        // debugger;
        if(this.headers.months.length > 0){
            for(let i = 0; i < this.headers.months.length; i++){
                if(this.headers.months[i].name == month){
                    this.headers.months[i].quantityOfDays = this.headers.months[i].quantityOfDays + 1; 
                }
            }
        }
    }
    hasDay(day:string, month:string){
        let hasDay = false;       
        if(this.headers.months.length > 0){
            this.headers.months.forEach((e:any) => {
                if(month == e.name){
                    this.headers.days.forEach((f:any) => {
                        if(day == f.name){
                            hasDay = true;
                        }
                    });
                }
            });
        } 
        return hasDay;
    }
    hasMonth(month:string){
        let hasMonth = false;       
        if(this.headers.months.length > 0 && typeof this.headers.months !=undefined){
            this.headers.months.forEach((e:any) => {
                if(month == e.name) hasMonth = true;
            });
        } 
        return hasMonth;
    }

}