import { Pipe, PipeTransform } from '@angular/core';
import { FilterListItem } from 'igniteui-angular/lib/grids/filtering/excel-style/grid.excel-style-filtering.component';

@Pipe({
    name: 'searchPipe',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.field.toLowerCase().includes(searchText);
    });
   }
}