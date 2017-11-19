import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customUpperCase'
})

export class CustomUpperCasePipe implements PipeTransform {
    transform(value: string): string {
        return value.toUpperCase().trim();
    }
}
