import { Pipe, PipeTransform } from "@angular/core";
import { formatDate, DatePipe } from "@angular/common";

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(date: number, locale: string = "en-US", dateFormat: string = "short") {
        const datePipe: DatePipe = new DatePipe(locale);
        return datePipe.transform(date, dateFormat);
    }
}