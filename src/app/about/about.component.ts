import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { locale } from 'src/language/locale';
import { environment } from '../../environments/environment';


export interface ListElement {
  number: string;
  length: string;
  complexity: string;
  predictability: string;
  class: string;
}

const ELEMENT_DATA_EN: ListElement[] = [
  { number: '1 - 3', length: 'very long', complexity: 'very complex, complex, medium', predictability: 'hard', class: 'very strong' },
  { number: '4 - 5', length: 'very long', complexity: 'simple, very simple', predictability: 'hard', class: 'strong' },
  { number: '6 - 8', length: 'very long', complexity: 'very complex, complex, medium', predictability: 'medium', class: 'strong' },
  { number: '9 - 10', length: 'very long', complexity: 'simple, very simple', predictability: 'medium', class: 'medium' },
  { number: '11 - 13', length: 'very long', complexity: 'very complex, complex, medium', predictability: 'easy', class: 'medium' },
  { number: '14 - 15', length: 'very long', complexity: 'simple, very simple', predictability: 'easy', class: 'weak' },
  { number: '16 - 18', length: 'long', complexity: 'very complex, complex, medium', predictability: 'hard', class: 'very strong' },
  { number: '19', length: 'long', complexity: 'simple', predictability: 'hard', class: 'strong' },
  { number: '20', length: 'long', complexity: 'very simple', predictability: 'hard', class: 'medium' },
  { number: '21 - 23', length: 'long', complexity: 'very complex, complex, medium', predictability: 'medium', class: 'strong' },
  { number: '24 - 25', length: 'long', complexity: 'simple, very simple', predictability: 'medium', class: 'weak' },
  { number: '26', length: 'long', complexity: '-', predictability: 'easy', class: 'weak' },
  { number: '27 - 29', length: 'medium', complexity: 'very complex, complex, medium', predictability: 'hard', class: 'strong' },
  { number: '30', length: 'medium', complexity: 'simple', predictability: 'hard', class: 'medium' },
  { number: '31', length: 'medium', complexity: 'very simple', predictability: 'hard', class: 'weak' },
  { number: '32 - 33', length: 'medium', complexity: 'very complex, complex', predictability: 'medium', class: 'medium' },
  { number: '34', length: 'medium', complexity: 'medium', predictability: 'medium', class: 'weak' },
  { number: '35 - 36', length: 'medium', complexity: 'simple, very simple', predictability: 'medium', class: 'weak' },
  { number: '37', length: 'medium', complexity: '-', predictability: 'easy', class: 'weak' },
  { number: '38 - 40', length: 'short', complexity: 'very complex, complex, medium', predictability: 'hard', class: 'medium' },
  { number: '41', length: 'short', complexity: 'simple', predictability: 'hard', class: 'weak' },
  { number: '42', length: 'short', complexity: 'very simple', predictability: 'hard', class: 'very weak' },
  { number: '43 - 45', length: 'short', complexity: 'very complex, complex, medium', predictability: 'medium', class: 'weak' },
  { number: '46 - 47', length: 'short', complexity: 'simple, very simple', predictability: 'medium', class: 'very weak' },
  { number: '48', length: 'short', complexity: '-', predictability: 'easy', class: 'very weak' },
  { number: '49', length: 'very short', complexity: '-', predictability: '-', class: 'very weak' },
];

const ELEMENT_DATA_DE: ListElement[] = [
  { number: '1 - 3', length: 'sehr lang', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'schwierig',
  class: 'sehr stark' },
  { number: '4 - 5', length: 'sehr lang', complexity: 'einfach, sehr einfach', predictability: 'schwierig', class: 'stark' },
  { number: '6 - 8', length: 'sehr lang', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'mittelmäßig', class: 'stark' },
  { number: '9 - 10', length: 'sehr lang',  complexity: 'einfach, sehr einfach', predictability: 'mittelmäßig', class: 'mittelmäßig'},
  { number: '11 - 13', length: 'sehr lang', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'einfach',
  class: 'mittelmäßig'},
  { number: '14 - 15', length: 'sehr lang', complexity: 'einfach, sehr einfach', predictability: 'einfach', class: 'schwach'},
  { number: '16 - 18', length: 'lang', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'schwierig', class: 'sehr stark'},
  { number: '19', length: 'lang', complexity: 'einfach', predictability: 'schwierig', class: 'stark'},
  { number: '20', length: 'lang', complexity: 'sehr einfach', predictability: 'schwierig', class: 'mittelmäßig'},
  { number: '21 - 23', length: 'lang', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'mittelmäßig', class: 'stark'},
  { number: '24 - 25', length: 'lang', complexity: 'einfach, sehr einfach', predictability: 'mittelmäßig', class: 'schwach'},
  { number: '26', length: 'lang', complexity: '-', predictability: 'einfach', class: 'schwach'},
  { number: '27 - 29', length: 'mittelmäßig', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'schwierig',
  class: 'stark'},
  { number: '30', length: 'mittelmäßig', complexity: 'einfach', predictability: 'schwierig', class: 'mittelmäßig'},
  { number: '31', length: 'mittelmäßig', complexity: 'sehr einfach', predictability: 'schwierig', class: 'schwach'},
  { number: '32 - 33', length: 'mittelmäßig', complexity: 'sehr komplex, complex', predictability: 'mittelmäßig', class: 'mittelmäßig'},
  { number: '34', length: 'mittelmäßig', complexity: 'mittelmäßig', predictability: 'mittelmäßig', class: 'schwach'},
  { number: '35 - 36', length: 'mittelmäßig', complexity: 'einfach, sehr einfach', predictability: 'mittelmäßig', class: 'schwach'},
  { number: '37', length: 'mittelmäßig', complexity: '-', predictability: 'einfach', class: 'schwach'},
  { number: '38 - 40', length: 'kurz', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'schwierig', class: 'mittelmäßig'},
  { number: '41', length: 'kurz', complexity: 'einfach', predictability: 'schwierig', class: 'schwach'},
  { number: '42', length: 'kurz', complexity: 'sehr einfach', predictability: 'schwierig', class: 'sehr schwach'},
  { number: '43 - 45', length: 'kurz', complexity: 'sehr komplex, komplex, mittelmäßig', predictability: 'mittelmäßig', class: 'schwach'},
  { number: '46 - 47', length: 'kurz', complexity: 'einfach, sehr einfach', predictability: 'mittelmäßig', class: 'sehr schwach'},
  { number: '48', length: 'kurz', complexity: '-', predictability: 'einfach', class: 'sehr schwach'},
  { number: '49', length: 'sehr kurz', complexity: '-', predictability: '-', class: 'sehr schwach'},
];

const language: string = locale;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  displayedColumns: string[] = ['length', 'complexity', 'predictability', 'class'];
  public dataSource = new MatTableDataSource<ListElement>(ELEMENT_DATA_EN);
  public bundling = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.bundling = environment.bundling;
    this.setRuleTable();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  setRuleTable() {
    if (this.getLanguage() === 'en') {
      this.dataSource = new MatTableDataSource<ListElement>(ELEMENT_DATA_EN);
    } else {
      this.dataSource = new MatTableDataSource<ListElement>(ELEMENT_DATA_DE);
    }
  }

  getLanguage(): string {
    return language;
  }
}
