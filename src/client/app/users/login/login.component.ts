import { Component, Input } from '@angular/core';

declare let moment:any;

@Component({
    moduleId: module.id,
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    @Input() locale: string;
    @Input() timezone: string;
    actualDatetime: string;
    listOfTimezones:String[];
    constructor() {
        this.listOfTimezones = moment.tz.names();
        this.locale = localStorage.getItem('locale') || 'en-US';
        this.timezone = localStorage.getItem('timezone') || 'America/Santiago';
        let now = new Date();
        this.actualDatetime = this.calculateTimezone(now);
        setInterval(() => {
            now = new Date();
            this.actualDatetime = this.calculateTimezone(now);
        }, 1000);
    }
    public calculateTimezone = (date: Date):string => {
        let tz = moment.tz(date, this.timezone).format('DD/MM/YYYY HH:mm:ss');
        return tz;
    }
    public selectLocale = (locale: string) => {
        localStorage.setItem('locale', locale);
        window.location.href = "/";
    }
    public setTimezone = (timezone: string) => {
        localStorage.setItem('timezone', timezone);
        window.location.href = "/";
    }
}