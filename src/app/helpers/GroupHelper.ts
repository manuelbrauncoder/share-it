import { AbstractControl } from '@angular/forms';
import { Group } from '../interfaces/Group';
import { v4 as uuidv4 } from 'uuid';

export class GroupHelper {
    
  static createGroup(group: AbstractControl): Group {
    return {
      id: uuidv4(),
      title: group.get('title')?.value ?? '',
      desc: group.get('desc')?.value ?? '',
      users: [],
      expenses: [],
    };
  }
}
