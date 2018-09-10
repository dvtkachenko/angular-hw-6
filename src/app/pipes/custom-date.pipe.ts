import { Pipe, PipeTransform } from "@angular/core";
import { formatDate, DatePipe } from "@angular/common";

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(date: number, locale: string = "en-US", dateFormat: string = "short"): string | null {

        // TODO there is should be my own format data implementation here
        // it will be implemented later
        const datePipe: DatePipe = new DatePipe(locale);
        return datePipe.transform(date, dateFormat);
    }
}